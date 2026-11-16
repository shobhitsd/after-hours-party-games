-- Apply after 001–003. Privileged writes go through server-only RPCs.
UPDATE public.games SET is_active=false WHERE slug IN ('lone','seat');
INSERT INTO public.games(slug,name,tagline,category,color,min_players,max_players)
VALUES('packed','Packed House','We built the rooms together. Who dares enter?','Collective bluffing','green',5,10)
ON CONFLICT(slug) DO UPDATE SET name=excluded.name,is_active=true,min_players=5,max_players=10;

CREATE TABLE public.packed_questions(
 id uuid PRIMARY KEY, question text NOT NULL CHECK(length(question) BETWEEN 1 AND 240),
 category text NOT NULL DEFAULT 'general',is_vip boolean NOT NULL DEFAULT false,is_active boolean NOT NULL DEFAULT true
);
CREATE TABLE public.packed_options(
 id uuid PRIMARY KEY,question_id uuid NOT NULL REFERENCES public.packed_questions ON DELETE CASCADE,
 text text NOT NULL CHECK(length(text) BETWEEN 1 AND 160),image_url text CHECK(image_url IS NULL OR image_url LIKE 'https://%'),
 order_index integer NOT NULL CHECK(order_index BETWEEN 0 AND 5),UNIQUE(question_id,order_index)
);
CREATE TABLE public.custom_packs(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),host_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
 title text NOT NULL CHECK(length(title) BETWEEN 1 AND 80),questions jsonb NOT NULL CHECK(jsonb_typeof(questions)='array' AND jsonb_array_length(questions) BETWEEN 5 AND 30),
 is_public boolean NOT NULL DEFAULT false,created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.custom_packs(host_id);
CREATE TABLE public.game_sessions(
 id uuid PRIMARY KEY,room_code text NOT NULL,game_slug text NOT NULL REFERENCES public.games(slug),host_id uuid REFERENCES auth.users ON DELETE SET NULL,
 seated_count integer NOT NULL,total_rounds integer NOT NULL DEFAULT 0,finished boolean NOT NULL DEFAULT false,final_scores jsonb NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.round_receipts(
 session_id uuid NOT NULL REFERENCES public.game_sessions ON DELETE CASCADE,round_number integer NOT NULL,round_id uuid NOT NULL UNIQUE,
 commitment text NOT NULL CHECK(length(commitment)=64),proof jsonb NOT NULL,points jsonb NOT NULL,PRIMARY KEY(session_id,round_number)
);
CREATE TABLE public.billing_checkouts(
 user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 provider_sub_id text UNIQUE,short_url text,closed boolean NOT NULL DEFAULT false,created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX one_open_checkout_per_host ON public.billing_checkouts(user_id) WHERE NOT closed;
CREATE TABLE public.billing_events(
 id text PRIMARY KEY,provider_sub_id text NOT NULL,event_time bigint NOT NULL,created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.subscriptions ADD COLUMN last_event_time bigint NOT NULL DEFAULT 0;
ALTER TABLE public.subscriptions ADD COLUMN cancel_at_cycle_end boolean NOT NULL DEFAULT false;

ALTER TABLE public.packed_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packed_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.round_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_checkouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY question_read ON public.packed_questions FOR SELECT TO anon,authenticated USING(is_active AND (NOT is_vip OR EXISTS(SELECT 1 FROM public.subscriptions s WHERE s.user_id=auth.uid() AND s.status='active' AND s.valid_until>now())));
CREATE POLICY option_read ON public.packed_options FOR SELECT TO anon,authenticated USING(EXISTS(SELECT 1 FROM public.packed_questions q WHERE q.id=question_id));
CREATE POLICY pack_read ON public.custom_packs FOR SELECT TO anon,authenticated USING(is_public OR host_id=auth.uid());
CREATE POLICY pack_delete ON public.custom_packs FOR DELETE TO authenticated USING(host_id=auth.uid());
CREATE POLICY session_read ON public.game_sessions FOR SELECT TO authenticated USING(host_id=auth.uid());
CREATE POLICY receipt_read ON public.round_receipts FOR SELECT TO authenticated USING(EXISTS(SELECT 1 FROM public.game_sessions s WHERE s.id=session_id AND s.host_id=auth.uid()));

-- Remove old public history writes/reads and prevent users granting themselves VIP.
DROP POLICY "Anyone can view room by code" ON public.rooms;
DROP POLICY "Anyone can record a room session" ON public.rooms;
DROP POLICY "Anyone can insert anonymous telemetry" ON public.telemetry_events;
DROP POLICY "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY profile_read ON public.profiles FOR SELECT TO authenticated USING(id=auth.uid());
REVOKE ALL ON public.profiles,public.subscriptions,public.rooms,public.telemetry_events,public.custom_packs,public.billing_checkouts,public.billing_events,public.game_sessions,public.round_receipts,public.packed_questions,public.packed_options FROM anon,authenticated;
GRANT SELECT ON public.profiles,public.subscriptions,public.game_sessions,public.round_receipts TO authenticated;
GRANT SELECT ON public.subscriptions TO anon; -- RLS returns no rows to guests; permits policy subqueries.
GRANT INSERT(id,display_name,avatar_url),UPDATE(display_name,avatar_url) ON public.profiles TO authenticated;
GRANT SELECT ON public.packed_questions,public.packed_options,public.custom_packs TO anon,authenticated;
GRANT DELETE ON public.custom_packs TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
DROP POLICY "Subscribers can upload custom pack images" ON storage.objects;
CREATE POLICY own_pack_images ON storage.objects FOR ALL TO authenticated
 USING(bucket_id='custom-packs' AND split_part(name,'/',1)=auth.uid()::text)
 WITH CHECK(bucket_id='custom-packs' AND split_part(name,'/',1)=auth.uid()::text AND EXISTS(SELECT 1 FROM public.subscriptions s WHERE s.user_id=auth.uid() AND s.status='active' AND s.valid_until>now()));

CREATE FUNCTION public.save_custom_pack(p_id uuid,p_title text,p_questions jsonb,p_public boolean DEFAULT false) RETURNS jsonb
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE uid uuid:=auth.uid(); pid uuid; q jsonb; opt jsonb;
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'Sign in first'; END IF;
 PERFORM pg_advisory_xact_lock(hashtextextended(uid::text,0));
 IF length(trim(p_title)) NOT BETWEEN 1 AND 80 OR jsonb_typeof(p_questions)<>'array' OR jsonb_array_length(p_questions) NOT BETWEEN 5 AND 30 THEN RAISE EXCEPTION 'Invalid pack'; END IF;
 FOR q IN SELECT value FROM jsonb_array_elements(p_questions) LOOP
  IF jsonb_typeof(q->'question') IS DISTINCT FROM 'string' OR length(trim(q->>'question')) NOT BETWEEN 1 AND 120 OR jsonb_typeof(q->'options') IS DISTINCT FROM 'array' THEN RAISE EXCEPTION 'Invalid question'; END IF;
  IF jsonb_array_length(q->'options') NOT BETWEEN 5 AND 6 OR (SELECT count(DISTINCT lower(trim(value))) FROM jsonb_array_elements_text(q->'options'))<>jsonb_array_length(q->'options') THEN RAISE EXCEPTION 'Invalid options'; END IF;
  FOR opt IN SELECT value FROM jsonb_array_elements(q->'options') LOOP
   IF jsonb_typeof(opt)<>'string' OR length(trim(opt#>>'{}')) NOT BETWEEN 1 AND 40 THEN RAISE EXCEPTION 'Invalid option'; END IF;
  END LOOP;
 END LOOP;
 IF (SELECT count(DISTINCT lower(trim(value->>'question'))) FROM jsonb_array_elements(p_questions))<>jsonb_array_length(p_questions) THEN RAISE EXCEPTION 'Duplicate questions'; END IF;
 IF p_id IS NOT NULL THEN
  UPDATE public.custom_packs SET title=trim(p_title),questions=p_questions,is_public=p_public,updated_at=now() WHERE id=p_id AND host_id=uid RETURNING id INTO pid;
  IF pid IS NULL THEN RAISE EXCEPTION 'Pack not found'; END IF;
 ELSE
  IF (SELECT count(*) FROM public.custom_packs WHERE host_id=uid)>=3 AND NOT EXISTS(SELECT 1 FROM public.subscriptions WHERE user_id=uid AND status='active' AND valid_until>now()) THEN RAISE EXCEPTION 'Free pack limit'; END IF;
  INSERT INTO public.custom_packs(host_id,title,questions,is_public) VALUES(uid,trim(p_title),p_questions,p_public) RETURNING id INTO pid;
 END IF;
 RETURN jsonb_build_object('id',pid);
END $$;
REVOKE ALL ON FUNCTION public.save_custom_pack(uuid,text,jsonb,boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.save_custom_pack(uuid,text,jsonb,boolean) TO authenticated;

CREATE FUNCTION public.archive_game(p_session jsonb,p_rounds jsonb) RETURNS void
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE sid uuid:=(p_session->>'id')::uuid; r jsonb;
BEGIN
 INSERT INTO public.game_sessions(id,room_code,game_slug,host_id,seated_count,total_rounds,finished,final_scores)
 VALUES(sid,p_session->>'room_code',p_session->>'game_slug',(p_session->>'host_id')::uuid,(p_session->>'seated_count')::int,(p_session->>'total_rounds')::int,(p_session->>'finished')::boolean,p_session->'final_scores')
 ON CONFLICT(id) DO UPDATE SET total_rounds=excluded.total_rounds,finished=excluded.finished,final_scores=excluded.final_scores,updated_at=now()
 WHERE excluded.total_rounds>=game_sessions.total_rounds AND (NOT game_sessions.finished OR excluded.finished);
 FOR r IN SELECT value FROM jsonb_array_elements(p_rounds) LOOP
  INSERT INTO public.round_receipts VALUES(sid,(r->>'round_number')::int,(r->>'round_id')::uuid,r->>'commitment',r->'proof',r->'points') ON CONFLICT DO NOTHING;
 END LOOP;
END $$;
REVOKE ALL ON FUNCTION public.archive_game(jsonb,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.archive_game(jsonb,jsonb) TO service_role;

CREATE FUNCTION public.reserve_checkout(p_user uuid) RETURNS jsonb
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE c public.billing_checkouts; created boolean:=false;
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(p_user::text,1));
 SELECT * INTO c FROM public.billing_checkouts WHERE user_id=p_user AND NOT closed;
 IF NOT FOUND THEN INSERT INTO public.billing_checkouts(user_id) VALUES(p_user) RETURNING * INTO c;created:=true; END IF;
 RETURN to_jsonb(c)||jsonb_build_object('created',created);
END $$;
REVOKE ALL ON FUNCTION public.reserve_checkout(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.reserve_checkout(uuid) TO service_role;

CREATE FUNCTION public.apply_billing_event(p_event text,p_time bigint,p_user uuid,p_sub text,p_status text,p_until timestamptz,p_cancel boolean) RETURNS boolean
 LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(p_sub,2));
 INSERT INTO public.billing_events(id,provider_sub_id,event_time) VALUES(p_event,p_sub,p_time) ON CONFLICT DO NOTHING;
 IF NOT FOUND THEN RETURN false; END IF;
 IF NOT EXISTS(SELECT 1 FROM public.billing_checkouts WHERE user_id=p_user AND provider_sub_id=p_sub) THEN RAISE EXCEPTION 'Unknown checkout'; END IF;
 INSERT INTO public.subscriptions(user_id,provider_sub_id,status,valid_until,last_event_time,cancel_at_cycle_end)
 VALUES(p_user,p_sub,p_status::public.subscription_status,p_until,p_time,p_cancel)
 ON CONFLICT(provider_sub_id) DO UPDATE SET status=excluded.status,valid_until=excluded.valid_until,last_event_time=excluded.last_event_time,cancel_at_cycle_end=excluded.cancel_at_cycle_end,updated_at=now()
 WHERE excluded.last_event_time>=subscriptions.last_event_time AND subscriptions.user_id=excluded.user_id
 AND NOT (subscriptions.status='canceled' AND excluded.status<>'canceled');
 RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.apply_billing_event(text,bigint,uuid,text,text,timestamptz,boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.apply_billing_event(text,bigint,uuid,text,text,timestamptz,boolean) TO service_role;

CREATE FUNCTION public.create_host_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
BEGIN INSERT INTO public.profiles(id,display_name) VALUES(NEW.id,'Host') ON CONFLICT(id) DO NOTHING;RETURN NEW;END $$;
REVOKE ALL ON FUNCTION public.create_host_profile() FROM PUBLIC;
CREATE TRIGGER create_host_profile AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_host_profile();
INSERT INTO public.profiles(id,display_name) SELECT id,'Host' FROM auth.users ON CONFLICT(id) DO NOTHING;
