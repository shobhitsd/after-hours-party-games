// Supabase client and repository layer for After Hours & Trust Issues.
// Zero-dependency native fetch implementation that also works seamlessly with @supabase/supabase-js if installed.
// Gracefully falls back to local in-memory storage if SUPABASE_URL is not set.

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => Boolean(SUPABASE_URL && SUPABASE_KEY);

/**
 * Executes a query against Supabase PostgREST REST API.
 */
async function supabaseFetch(endpoint, options = {}) {
  if (!isSupabaseConfigured()) return null;

  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${endpoint}`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': options.prefer || 'return=representation',
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[Supabase API Error ${res.status}] ${endpoint}:`, errText);
      return null;
    }

    if (res.status === 204) return true;
    return await res.json();
  } catch (err) {
    console.warn(`[Supabase Network Error] ${endpoint}:`, err.message);
    return null;
  }
}

/**
 * Fetch scenarios for a game from Supabase (or fallback to local).
 * @param {string} game 'lone' | 'crowd' | etc.
 * @param {object} filter { isVip: false, category: 'all', limit: 20 }
 */
export async function getScenarios(game = 'lone', filter = {}) {
  if (!isSupabaseConfigured()) {
    return null; // Signals caller to use local in-memory scenarios
  }

  const queryParts = [
    `game_slug=eq.${encodeURIComponent(game)}`,
    'select=id,prompt,category,is_vip,scenario_options(id,text,image_url,order_index)',
    'order=scenario_options(order_index.asc)'
  ];

  if (filter.isVip !== undefined) {
    queryParts.push(`is_vip=eq.${Boolean(filter.isVip)}`);
  }
  if (filter.category && filter.category !== 'all') {
    queryParts.push(`category=eq.${encodeURIComponent(filter.category)}`);
  }
  if (filter.limit) {
    queryParts.push(`limit=${parseInt(filter.limit, 10)}`);
  }

  const data = await supabaseFetch(`scenarios?${queryParts.join('&')}`);
  if (!data || !Array.isArray(data)) return null;

  // Transform into runtime [prompt, options] tuple format
  return data.map(item => [
    item.prompt,
    (item.scenario_options || []).map(opt => ({
      text: opt.text,
      image: opt.image_url
    }))
  ]);
}

/**
 * Check if a host has an active VIP Host Pass (₹99/mo subscription).
 * @param {string} userId Supabase Auth user ID or host identifier
 * @returns {Promise<boolean>}
 */
export async function checkHostSubscription(userId) {
  if (!isSupabaseConfigured() || !userId) return false;

  const now = new Date().toISOString();
  const query = `user_id=eq.${encodeURIComponent(userId)}&status=eq.active&valid_until=gt.${encodeURIComponent(now)}&select=id,tier,valid_until&limit=1`;
  const subs = await supabaseFetch(`subscriptions?${query}`);

  return Array.isArray(subs) && subs.length > 0;
}

/**
 * Save completed room summary for leaderboards, telemetry and player match history.
 * @param {object} roomData
 */
export async function recordRoomSession(roomData) {
  if (!isSupabaseConfigured() || !roomData) return null;

  const payload = {
    room_code: roomData.code,
    game_slug: roomData.game,
    host_id: roomData.hostId || null,
    player_count: roomData.players?.length || 0,
    rounds_played: roomData.round || 0,
    winner_name: roomData.winner?.name || null,
    winner_score: roomData.winner?.score || 0,
    created_at: new Date(roomData.createdAt || Date.now()).toISOString(),
    completed_at: new Date().toISOString()
  };

  const saved = await supabaseFetch('rooms', {
    method: 'POST',
    body: payload,
    prefer: 'return=representation'
  });

  return saved;
}

/**
 * Save anonymous gameplay telemetry (collisions, solo mavericks, bluff success rate).
 */
export async function recordTelemetry(event) {
  if (!isSupabaseConfigured() || !event) return null;

  return await supabaseFetch('telemetry_events', {
    method: 'POST',
    body: {
      event_type: event.type,
      game_slug: event.game,
      metadata: event.metadata || {},
      created_at: new Date().toISOString()
    },
    prefer: 'return=minimal'
  });
}

/**
 * Upload an image to Supabase Storage bucket.
 * @param {string} bucket 'game-assets' | 'scenario-images'
 * @param {string} filePath e.g. 'custom-packs/pack-1/option-1.jpg'
 * @param {Buffer|Uint8Array} fileData
 * @param {string} contentType 'image/jpeg' | 'image/png' | 'image/webp'
 */
export async function uploadAsset(bucket, filePath, fileData, contentType = 'image/jpeg') {
  if (!isSupabaseConfigured()) return null;

  const url = `${SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/${bucket}/${filePath}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': contentType,
        'x-upsert': 'true'
      },
      body: fileData
    });

    if (!res.ok) {
      console.warn('[Supabase Storage Upload Error]:', await res.text());
      return null;
    }

    // Return public URL
    return `${SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${filePath}`;
  } catch (err) {
    console.warn('[Supabase Storage Network Error]:', err.message);
    return null;
  }
}

