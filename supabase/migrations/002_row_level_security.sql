-- Migration 002: Row Level Security (RLS) Policies
-- Protects user data, prevents scraping of paid VIP scenario packs, and secures payment webhooks.

-- 1. Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry_events ENABLE ROW LEVEL SECURITY;

-- 2. Games Policies
CREATE POLICY "Public can view active games"
  ON games FOR SELECT
  USING (is_active = true);

-- 3. Scenarios Policies
-- Free scenarios are readable by any client (players and guests)
CREATE POLICY "Public can view free scenarios"
  ON scenarios FOR SELECT
  USING (is_vip = false);

-- VIP scenarios are only accessible if the user has an active subscription
CREATE POLICY "Subscribers can view VIP scenarios"
  ON scenarios FOR SELECT
  TO authenticated
  USING (
    is_vip = true AND EXISTS (
      SELECT 1 FROM subscriptions
      WHERE subscriptions.user_id = auth.uid()
        AND subscriptions.status = 'active'
        AND subscriptions.valid_until > NOW()
    )
  );

-- Service role has full access
CREATE POLICY "Service role full access to scenarios"
  ON scenarios FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Scenario Options Policies
CREATE POLICY "Public can view options of accessible scenarios"
  ON scenario_options FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM scenarios
      WHERE scenarios.id = scenario_options.scenario_id
        AND (
          scenarios.is_vip = false
          OR (
            auth.role() = 'authenticated' AND EXISTS (
              SELECT 1 FROM subscriptions
              WHERE subscriptions.user_id = auth.uid()
                AND subscriptions.status = 'active'
                AND subscriptions.valid_until > NOW()
            )
          )
        )
    )
  );

CREATE POLICY "Service role full access to scenario options"
  ON scenario_options FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 6. Subscriptions Policies
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role manages subscriptions"
  ON subscriptions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 7. Rooms Policies
CREATE POLICY "Anyone can view room by code"
  ON rooms FOR SELECT
  USING (true);

CREATE POLICY "Anyone can record a room session"
  ON rooms FOR INSERT
  WITH CHECK (true);

-- 8. Telemetry Policies
CREATE POLICY "Anyone can insert anonymous telemetry"
  ON telemetry_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only service role can read telemetry"
  ON telemetry_events FOR SELECT
  TO service_role
  USING (true);

