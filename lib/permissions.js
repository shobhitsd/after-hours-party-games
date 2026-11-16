// Modular permissions and entitlements engine for subscription tiers.
// Governs game access, room capacity, custom pack allowances, and VIP perks.

export const DEFAULT_PLANS = {
  free: {
    id: 'free',
    name: 'Free Explorer',
    description: 'Play and host standard party games with your friends.',
    price_paise: 0,
    currency: 'INR',
    billing_interval: 'lifetime',
    allowed_games: ['packed', 'signals', 'decoy', 'crowd', 'twins', 'borrowed'],
    max_players: 10,
    custom_packs_limit: 3,
    vip_questions: false,
    question_changes_per_round: 1,
    features: {
      custom_room_code: false,
      export_history: false,
      priority_support: false
    }
  },
  starter: {
    id: 'starter',
    name: 'Game Night Starter',
    description: 'Perfect for small social gatherings and game nights.',
    price_paise: 4900, // ₹49.00
    currency: 'INR',
    billing_interval: 'month',
    allowed_games: ['packed', 'signals', 'decoy', 'crowd', 'twins', 'borrowed'],
    max_players: 12,
    custom_packs_limit: 10,
    vip_questions: false,
    question_changes_per_round: 2,
    features: {
      custom_room_code: false,
      export_history: true,
      priority_support: false
    }
  },
  host_pass: {
    id: 'host_pass',
    name: 'Host Pass',
    description: 'Full unmetered access to every game, VIP scenarios, and expanded rooms.',
    price_paise: 9900, // ₹99.00
    currency: 'INR',
    billing_interval: 'month',
    allowed_games: ['*'],
    max_players: 20,
    custom_packs_limit: 30,
    vip_questions: true,
    question_changes_per_round: 3,
    features: {
      custom_room_code: true,
      export_history: true,
      priority_support: true
    }
  },
  pro_party: {
    id: 'pro_party',
    name: 'Pro Party Master',
    description: 'Built for large events, streamers, and community organizers.',
    price_paise: 24900, // ₹249.00
    currency: 'INR',
    billing_interval: 'month',
    allowed_games: ['*'],
    max_players: 50,
    custom_packs_limit: 100,
    vip_questions: true,
    question_changes_per_round: 5,
    features: {
      custom_room_code: true,
      export_history: true,
      custom_branding: true,
      streamer_mode: true,
      priority_support: true
    }
  }
};

/**
 * Checks if a specific game slug is permitted by the given entitlements.
 * Supports '*' wildcard for all games.
 */
export function isGameAllowed(entitlements, gameSlug) {
  if (!gameSlug) return true;
  if (!entitlements) return true;
  const list = Array.isArray(entitlements.allowed_games)
    ? entitlements.allowed_games
    : ['*'];
  return list.includes('*') || list.includes(gameSlug.toLowerCase().trim());
}

/**
 * Validates whether the host has permission to host a specific game and player count.
 * Returns { allowed: boolean, reason?: string, code?: string }
 */
export function evaluateGameAccess(entitlements, { gameSlug, playerCount = 1 } = {}) {
  const effective = entitlements || DEFAULT_PLANS.free;
  if (gameSlug && !isGameAllowed(effective, gameSlug)) {
    return {
      allowed: false,
      code: 'GAME_LOCKED',
      reason: `Your ${effective.plan_name || effective.name || 'current'} plan does not include access to "${gameSlug}". Upgrade your subscription to unlock this game.`
    };
  }
  const max = effective.max_players || 10;
  if (playerCount > max) {
    return {
      allowed: false,
      code: 'ROOM_CAPACITY_EXCEEDED',
      reason: `This room has ${playerCount} players, but your plan allows up to ${max} players. Upgrade your subscription to host larger parties.`
    };
  }
  return { allowed: true };
}

/**
 * Resolves effective entitlements from a plan, subscription, and optional per-user overrides.
 */
export function resolveEntitlements({ planId = 'free', subscription = null, overrides = null, customPlans = {} } = {}) {
  const plans = { ...DEFAULT_PLANS, ...customPlans };
  const basePlan = plans[planId] || plans.free;

  const isActive = Boolean(
    subscription?.status === 'active' &&
    (!subscription.valid_until || new Date(subscription.valid_until).getTime() > Date.now())
  );

  const selectedPlan = isActive ? basePlan : plans.free;

  // Build merged entitlements
  const result = {
    plan_id: selectedPlan.id,
    plan_name: selectedPlan.name,
    is_active: isActive,
    valid_until: subscription?.valid_until || null,
    allowed_games: [...(selectedPlan.allowed_games || ['*'])],
    max_players: selectedPlan.max_players || 10,
    custom_packs_limit: selectedPlan.custom_packs_limit || 3,
    vip_questions: Boolean(selectedPlan.vip_questions),
    question_changes_per_round: selectedPlan.question_changes_per_round || 1,
    features: { ...(selectedPlan.features || {}) }
  };

  // Apply user-specific granular overrides if present and active
  if (overrides) {
    const overrideActive = !overrides.valid_until || new Date(overrides.valid_until).getTime() > Date.now();
    if (overrideActive) {
      if (Array.isArray(overrides.allowed_games)) {
        // Merge or replace allowed games
        if (overrides.allowed_games.includes('*')) {
          result.allowed_games = ['*'];
        } else {
          result.allowed_games = Array.from(new Set([...result.allowed_games, ...overrides.allowed_games]));
        }
      }
      if (typeof overrides.max_players === 'number' && overrides.max_players > 0) {
        result.max_players = Math.max(result.max_players, overrides.max_players);
      }
      if (typeof overrides.custom_packs_limit === 'number' && overrides.custom_packs_limit >= 0) {
        result.custom_packs_limit = Math.max(result.custom_packs_limit, overrides.custom_packs_limit);
      }
      if (overrides.vip_questions !== undefined) {
        result.vip_questions = Boolean(overrides.vip_questions);
      }
      if (overrides.features && typeof overrides.features === 'object') {
        result.features = { ...result.features, ...overrides.features };
      }
    }
  }

  return result;
}

