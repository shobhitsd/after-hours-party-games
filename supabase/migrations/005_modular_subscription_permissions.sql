-- Migration 005: Modular Subscription Plans & Granular Permissions
-- Enables dynamic, per-plan and per-user game access control, room limits, and pack quotas.

-- 1. Subscription Plans Catalog
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price_paise INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR',
  billing_interval TEXT NOT NULL DEFAULT 'month',
  allowed_games TEXT[] NOT NULL DEFAULT '{"*"}',
  max_players INTEGER NOT NULL DEFAULT 10,
  custom_packs_limit INTEGER NOT NULL DEFAULT 3,
  vip_questions BOOLEAN NOT NULL DEFAULT FALSE,
  question_changes_per_round INTEGER NOT NULL DEFAULT 1,
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Seed Default Plans
INSERT INTO public.subscription_plans (id, name, description, price_paise, currency, billing_interval, allowed_games, max_players, custom_packs_limit, vip_questions, question_changes_per_round, features)
VALUES
  ('free', 'Free Explorer', 'Host standard party games with your friends.', 0, 'INR', 'lifetime', ARRAY['packed', 'signals', 'decoy', 'crowd', 'twins', 'borrowed'], 10, 3, false, 1, '{"custom_room_code": false, "export_history": false}'::jsonb),
  ('starter', 'Game Night Starter', 'For small social circles and dinner parties.', 4900, 'INR', 'month', ARRAY['packed', 'signals', 'decoy', 'crowd', 'twins', 'borrowed'], 12, 10, false, 2, '{"custom_room_code": false, "export_history": true}'::jsonb),
  ('host_pass', 'Host Pass', 'Full unmetered access to every game, VIP decks, and 20-player rooms.', 9900, 'INR', 'month', ARRAY['*'], 20, 30, true, 3, '{"custom_room_code": true, "export_history": true, "priority_room": true}'::jsonb),
  ('pro_party', 'Pro Party Master', 'For large community hosts, events, and streamers.', 24900, 'INR', 'month', ARRAY['*'], 50, 100, true, 5, '{"custom_room_code": true, "export_history": true, "custom_branding": true, "streamer_mode": true}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_paise = EXCLUDED.price_paise,
  allowed_games = EXCLUDED.allowed_games,
  max_players = EXCLUDED.max_players,
  custom_packs_limit = EXCLUDED.custom_packs_limit,
  vip_questions = EXCLUDED.vip_questions,
  question_changes_per_round = EXCLUDED.question_changes_per_round,
  features = EXCLUDED.features;

-- 3. Link Subscriptions to Plan ID
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS plan_id TEXT REFERENCES public.subscription_plans(id) DEFAULT 'host_pass';

-- 4. User Entitlements (Per-user granular overrides for VIPs, beta testers, or custom deals)
CREATE TABLE IF NOT EXISTS public.user_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  allowed_games TEXT[],
  max_players INTEGER,
  custom_packs_limit INTEGER,
  vip_questions BOOLEAN,
  notes TEXT DEFAULT '',
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  CONSTRAINT uq_user_entitlements_user UNIQUE(user_id)
);

-- 5. Stored Procedure: Calculate User Entitlements Dynamically
CREATE OR REPLACE FUNCTION public.get_user_entitlements(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE
  v_sub RECORD;
  v_plan RECORD;
  v_override RECORD;
  v_plan_id TEXT := 'free';
  v_is_active BOOLEAN := FALSE;
  v_valid_until TIMESTAMPTZ := NULL;
  v_games TEXT[];
  v_max_players INTEGER;
  v_pack_limit INTEGER;
  v_vip_q BOOLEAN;
  v_q_changes INTEGER;
  v_features JSONB;
BEGIN
  -- Check for active subscription
  IF p_user_id IS NOT NULL THEN
    SELECT * INTO v_sub
    FROM public.subscriptions
    WHERE user_id = p_user_id AND status = 'active' AND valid_until > NOW()
    ORDER BY valid_until DESC LIMIT 1;

    IF FOUND THEN
      v_plan_id := COALESCE(v_sub.plan_id, 'host_pass');
      v_is_active := TRUE;
      v_valid_until := v_sub.valid_until;
    END IF;
  END IF;

  -- Load target plan details
  SELECT * INTO v_plan FROM public.subscription_plans WHERE id = v_plan_id;
  IF NOT FOUND THEN
    SELECT * INTO v_plan FROM public.subscription_plans WHERE id = 'free';
  END IF;

  v_games := COALESCE(v_plan.allowed_games, ARRAY['*']);
  v_max_players := COALESCE(v_plan.max_players, 10);
  v_pack_limit := COALESCE(v_plan.custom_packs_limit, 3);
  v_vip_q := COALESCE(v_plan.vip_questions, FALSE);
  v_q_changes := COALESCE(v_plan.question_changes_per_round, 1);
  v_features := COALESCE(v_plan.features, '{}'::jsonb);

  -- Apply user-specific entitlement overrides if configured
  IF p_user_id IS NOT NULL THEN
    SELECT * INTO v_override
    FROM public.user_entitlements
    WHERE user_id = p_user_id AND (valid_until IS NULL OR valid_until > NOW());

    IF FOUND THEN
      IF v_override.allowed_games IS NOT NULL THEN
        IF '*' = ANY(v_override.allowed_games) THEN
          v_games := ARRAY['*'];
        ELSE
          v_games := ARRAY(SELECT DISTINCT unnest(v_games || v_override.allowed_games));
        END IF;
      END IF;
      IF v_override.max_players IS NOT NULL THEN
        v_max_players := GREATEST(v_max_players, v_override.max_players);
      END IF;
      IF v_override.custom_packs_limit IS NOT NULL THEN
        v_pack_limit := GREATEST(v_pack_limit, v_override.custom_packs_limit);
      END IF;
      IF v_override.vip_questions IS NOT NULL THEN
        v_vip_q := v_override.vip_questions;
      END IF;
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'plan_id', v_plan_id,
    'plan_name', COALESCE(v_plan.name, 'Free Account'),
    'is_active', v_is_active,
    'valid_until', v_valid_until,
    'allowed_games', to_jsonb(v_games),
    'max_players', v_max_players,
    'custom_packs_limit', v_pack_limit,
    'vip_questions', v_vip_q,
    'question_changes_per_round', v_q_changes,
    'features', v_features
  );
END $$;

-- 6. Enable RLS and Permissions
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read subscription plans" ON public.subscription_plans
  FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Users read own entitlements" ON public.user_entitlements
  FOR SELECT TO authenticated USING (user_id = auth.uid());

GRANT SELECT ON public.subscription_plans TO anon, authenticated;
GRANT SELECT ON public.user_entitlements TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_entitlements(UUID) TO anon, authenticated, service_role;

