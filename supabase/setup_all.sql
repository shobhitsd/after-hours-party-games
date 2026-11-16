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

-- 3. Subscriptions Table (Razorpay / Stripe Host Passes)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- 4. Games Registry Table
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
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packed_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packed_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;

-- 10. Define RLS Policies

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

