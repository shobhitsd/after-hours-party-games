-- Migration 001: Initial Core Schema for After Hours & Trust Issues
-- Designed for high scalability, flexible game expansion, and host subscriptions.

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
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  is_vip BOOLEAN NOT NULL DEFAULT FALSE,
  total_games_played INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Subscriptions Table (Razorpay / Stripe Host Passes)
CREATE TABLE IF NOT EXISTS subscriptions (
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

CREATE INDEX IF NOT EXISTS idx_subs_user_status ON subscriptions(user_id, status, valid_until);

-- 4. Games Registry Table (Easily add future games)
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- e.g. 'lone', 'signals', 'decoy', 'crowd', 'seat', 'twins', 'borrowed'
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'purple',
  min_players INTEGER NOT NULL DEFAULT 4,
  max_players INTEGER NOT NULL DEFAULT 8,
  duration_minutes TEXT NOT NULL DEFAULT '15–25 min',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- Pre-populate existing 7 games
INSERT INTO games (slug, name, tagline, category, color, min_players, max_players)
VALUES
  ('lone', 'Trust Issues', 'Pick what nobody else picks. Trust the Ranker, or don’t.', 'Trust & bluff', 'purple', 4, 8),
  ('signals', 'Signal Bridge', 'Send one-word radio codes to connect your teammates.', 'Clues & deduction', 'blue', 4, 8),
  ('decoy', 'Decoy Desk', 'Spot the true connection before the saboteur tricks the room.', 'Bluff & hidden role', 'orange', 4, 8),
  ('crowd', 'Crowd Control', 'Read the room. Predict the consensus on spicy dilemmas.', 'Social prediction', 'pink', 4, 8),
  ('seat', 'Hot Seat', 'Bid for private destination perks without crashing.', 'Social deduction', 'green', 4, 8),
  ('twins', 'Twin Minds', 'Connect with your secret partner using parallel clues.', 'Word association', 'yellow', 6, 8),
  ('borrowed', 'Borrowed Words', 'Build clues using only your teammates’ restricted cards.', 'Team co-op', 'purple', 4, 8)
ON CONFLICT (slug) DO NOTHING;

-- 5. Scenarios Bank (Questions, Prompts & Dilemmas)
CREATE TABLE IF NOT EXISTS scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_slug TEXT NOT NULL REFERENCES games(slug) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  is_vip BOOLEAN NOT NULL DEFAULT FALSE, -- Requires ₹99 Host Pass
  is_nsfw BOOLEAN NOT NULL DEFAULT FALSE, -- After Dark 18+ pack
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Community created packs
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_scenarios_game ON scenarios(game_slug, is_vip, is_nsfw);

-- 6. Scenario Options Table (Options with images)
CREATE TABLE IF NOT EXISTS scenario_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_scenario_options_scenario ON scenario_options(scenario_id, order_index);

-- 7. Game Room Sessions (History, Telemetry, and Results)
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT NOT NULL,
  game_slug TEXT NOT NULL REFERENCES games(slug) ON DELETE CASCADE,
  host_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  player_count INTEGER NOT NULL DEFAULT 0,
  rounds_played INTEGER NOT NULL DEFAULT 0,
  winner_name TEXT,
  winner_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_rooms_code ON rooms(room_code);
CREATE INDEX IF NOT EXISTS idx_rooms_host ON rooms(host_id);

-- 8. Anonymous Telemetry Events Table
CREATE TABLE IF NOT EXISTS telemetry_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- e.g. 'collision', 'maverick_pick', 'spy_used', 'reverse_round'
  game_slug TEXT NOT NULL REFERENCES games(slug) ON DELETE CASCADE,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_telemetry_type ON telemetry_events(event_type, created_at);

