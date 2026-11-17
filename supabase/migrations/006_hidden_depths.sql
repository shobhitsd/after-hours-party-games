-- Hidden Depths prototype: one transactional aggregate per identity.
-- Service key ONLY. Clients never read puzzle snapshots or write scores directly.
CREATE TABLE IF NOT EXISTS public.hidden_depths_players (
 identity_key text PRIMARY KEY CHECK (identity_key ~ '^(g:[a-f0-9]{64}|a:[a-f0-9-]{36})$'),
 revision bigint NOT NULL DEFAULT 0,
 state jsonb NOT NULL DEFAULT '{"seen":[],"runs":{},"history":[],"daily":{},"reports":[],"claim":null}',
 updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.hidden_depths_players ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.hidden_depths_players FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.hidden_depths_players TO service_role;

CREATE OR REPLACE FUNCTION public.hd_read(p_key text) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE result jsonb;
BEGIN
 INSERT INTO hidden_depths_players(identity_key) VALUES(p_key) ON CONFLICT DO NOTHING;
 SELECT jsonb_build_object('revision',revision,'state',state) INTO result FROM hidden_depths_players WHERE identity_key=p_key;
 RETURN result;
END $$;

CREATE OR REPLACE FUNCTION public.hd_cas(p_key text,p_revision bigint,p_state jsonb) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 UPDATE hidden_depths_players SET state=p_state,revision=revision+1,updated_at=now() WHERE identity_key=p_key AND revision=p_revision AND state->>'claim' IS NULL;
 RETURN FOUND;
END $$;

CREATE OR REPLACE FUNCTION public.hd_claim(p_guest text,p_account text,p_guest_revision bigint,p_account_revision bigint,p_state jsonb) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF p_guest NOT LIKE 'g:%' OR p_account NOT LIKE 'a:%' THEN RAISE EXCEPTION 'Invalid identity'; END IF;
 -- Consistent lock ordering, including concurrent claims from multiple devices.
 PERFORM 1 FROM hidden_depths_players WHERE identity_key IN(p_guest,p_account) ORDER BY identity_key FOR UPDATE;
 IF NOT EXISTS(SELECT 1 FROM hidden_depths_players WHERE identity_key=p_guest AND revision=p_guest_revision AND state->>'claim' IS NULL)
 OR NOT EXISTS(SELECT 1 FROM hidden_depths_players WHERE identity_key=p_account AND revision=p_account_revision) THEN RETURN false; END IF;
 UPDATE hidden_depths_players SET state=p_state,revision=revision+1,updated_at=now() WHERE identity_key=p_account;
 UPDATE hidden_depths_players SET state=jsonb_build_object('seen','[]'::jsonb,'runs','{}'::jsonb,'history','[]'::jsonb,'daily','{}'::jsonb,'reports','[]'::jsonb,'claim',p_account),revision=revision+1,updated_at=now() WHERE identity_key=p_guest;
 RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.hd_read(text),public.hd_cas(text,bigint,jsonb),public.hd_claim(text,text,bigint,bigint,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.hd_read(text),public.hd_cas(text,bigint,jsonb),public.hd_claim(text,text,bigint,bigint,jsonb) TO service_role;
