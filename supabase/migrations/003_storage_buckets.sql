-- Migration 003: Supabase Storage Buckets & Policies
-- Storage for scenario thumbnails, custom pack assets, and game art.

-- 1. Create Storage Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('game-assets', 'game-assets', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']),
  ('scenario-images', 'scenario-images', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('custom-packs', 'custom-packs', false, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 2. Storage Policies

-- Public read for game assets and scenario images
CREATE POLICY "Public can view game assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'game-assets');

CREATE POLICY "Public can view scenario images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'scenario-images');

-- Only subscribers or service role can upload custom scenario pack images
CREATE POLICY "Subscribers can upload custom pack images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'custom-packs'
    AND EXISTS (
      SELECT 1 FROM subscriptions
      WHERE subscriptions.user_id = auth.uid()
        AND subscriptions.status = 'active'
        AND subscriptions.valid_until > NOW()
    )
  );

-- Service role full control over storage
CREATE POLICY "Service role full control on storage"
  ON storage.objects FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

