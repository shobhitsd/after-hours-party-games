-- =============================================================================
-- AFTER HOURS & PACKED HOUSE: Complete Database Setup Script
-- Paste this script into your Supabase Dashboard -> SQL Editor and click "RUN".
-- =============================================================================

-- 1. Create Enums
DO $$ BEGIN
  CREATE TYPE subscription_tier AS ENUM ('free', 'host_pass', 'annual_pass');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'trialing');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. User Profiles Table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Player',
  avatar_url TEXT,
  is_vip BOOLEAN NOT NULL DEFAULT FALSE,
  total_games_played INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Subscription Plans Catalog (Modular feature & game access tiers)
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

-- Seed Default Subscription Plans
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

-- 4. Subscriptions Table (Razorpay / Stripe Host Passes)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT REFERENCES public.subscription_plans(id) DEFAULT 'host_pass',
  provider TEXT NOT NULL DEFAULT 'razorpay',
  provider_sub_id TEXT UNIQUE,
  provider_customer_id TEXT,
  tier subscription_tier NOT NULL DEFAULT 'host_pass',
  status subscription_status NOT NULL DEFAULT 'active',
  amount_paise INTEGER NOT NULL DEFAULT 9900, -- ₹99.00
  currency TEXT NOT NULL DEFAULT 'INR',
  valid_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_subs_user_status ON public.subscriptions(user_id, status, valid_until);

-- 5. User Entitlements (Per-user granular overrides for VIPs, beta testers, or custom deals)
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

-- 6. Games Registry Table
CREATE TABLE IF NOT EXISTS public.games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'purple',
  min_players INTEGER NOT NULL DEFAULT 4,
  max_players INTEGER NOT NULL DEFAULT 8,
  duration_minutes TEXT NOT NULL DEFAULT '10–15 min',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- Populate Games Catalog
INSERT INTO public.games (slug, name, tagline, category, color, min_players, max_players, duration_minutes)
VALUES
  ('packed', 'Packed House', 'We built the rooms together. Who dares enter?', 'Collective bluffing', 'green', 5, 10, '12–20 min'),
  ('signals', 'Signal Bridge', 'Send one word across the room. Can everyone find their own connection?', 'Word association', 'purple', 4, 8, '8–12 min'),
  ('decoy', 'Decoy Department', 'Slip in a convincing decoy and lead your friends delightfully astray.', 'Creative sabotage', 'orange', 5, 8, '10–15 min'),
  ('crowd', 'Crowd Control', 'Craft a dilemma that splits the room exactly the way you want.', 'Social prediction', 'pink', 4, 8, '8–12 min'),
  ('twins', 'Almost Twins', 'Someone has the other half of your secret pair. Follow the clues.', 'Friendly deduction', 'blue', 6, 8, '8–12 min'),
  ('borrowed', 'Borrowed Words', 'Your rivals take away your best words. Make the leftovers count.', 'Team wordplay', 'yellow', 4, 8, '10–15 min')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  min_players = EXCLUDED.min_players,
  max_players = EXCLUDED.max_players;

-- 5. Packed House Questions Table
CREATE TABLE IF NOT EXISTS public.packed_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  is_vip BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 6. Packed House Question Options Table
CREATE TABLE IF NOT EXISTS public.packed_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.packed_questions(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_packed_options_qid ON public.packed_options(question_id, order_index);

-- 7. Custom Packs Table (User-authored community question packs)
CREATE TABLE IF NOT EXISTS public.custom_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  game_slug TEXT NOT NULL REFERENCES public.games(slug),
  title TEXT NOT NULL,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_custom_packs_host ON public.custom_packs(host_id, game_slug);

-- 8. Game Sessions Telemetry & Verification Audit Table
CREATE TABLE IF NOT EXISTS public.game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code VARCHAR(10) NOT NULL,
  game_slug TEXT NOT NULL REFERENCES public.games(slug),
  seated_count INTEGER NOT NULL,
  total_rounds INTEGER NOT NULL,
  host_id TEXT,
  commitment_hash TEXT NOT NULL,
  final_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 9. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packed_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packed_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;

-- 10. Define RLS Policies

-- Subscription Plans: Public read
CREATE POLICY "Public read subscription plans" ON public.subscription_plans
  FOR SELECT TO anon, authenticated USING (is_active = true);

-- User Entitlements: Authenticated read own
CREATE POLICY "Users read own entitlements" ON public.user_entitlements
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Games Catalog: Readable by anyone
CREATE POLICY "Public read access for games" ON public.games
  FOR SELECT USING (is_active = true);

-- Packed House Questions: Public read for non-VIP, VIP check for VIP questions
CREATE POLICY "Public read for active packed questions" ON public.packed_questions
  FOR SELECT USING (
    is_active = true AND (
      is_vip = false OR
      EXISTS (
        SELECT 1 FROM public.subscriptions
        WHERE user_id = auth.uid() AND status = 'active' AND valid_until > NOW()
      )
    )
  );

-- Packed House Options: Public read
CREATE POLICY "Public read for packed options" ON public.packed_options
  FOR SELECT USING (true);

-- Custom Packs: Read public packs or user's own packs
CREATE POLICY "Read custom packs" ON public.custom_packs
  FOR SELECT USING (is_public = true OR host_id = auth.uid());

CREATE POLICY "Manage own custom packs" ON public.custom_packs
  FOR ALL USING (host_id = auth.uid());

-- Profiles: Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

-- Subscriptions: Users view their own, backend service role manages all
CREATE POLICY "Users view own subscriptions" ON public.subscriptions
  FOR SELECT USING (user_id = auth.uid());

-- 11. Stored Procedure: Calculate User Entitlements Dynamically
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

GRANT SELECT ON public.subscription_plans TO anon, authenticated;
GRANT SELECT ON public.user_entitlements TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_entitlements(UUID) TO anon, authenticated, service_role;


