import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_PLANS,
  isGameAllowed,
  evaluateGameAccess,
  resolveEntitlements
} from '../lib/permissions.js';

test('Permissions: wildcard allows all games', () => {
  const vipPerms = { allowed_games: ['*'], max_players: 20 };
  assert.equal(isGameAllowed(vipPerms, 'packed'), true);
  assert.equal(isGameAllowed(vipPerms, 'signals'), true);
  assert.equal(isGameAllowed(vipPerms, 'future_new_game'), true);
});

test('Permissions: restricted games plan blocks unlisted games', () => {
  const limitedPerms = { allowed_games: ['packed', 'signals'], max_players: 8 };
  assert.equal(isGameAllowed(limitedPerms, 'packed'), true);
  assert.equal(isGameAllowed(limitedPerms, 'signals'), true);
  assert.equal(isGameAllowed(limitedPerms, 'borrowed'), false);
  assert.equal(isGameAllowed(limitedPerms, 'decoy'), false);

  const check = evaluateGameAccess(limitedPerms, { gameSlug: 'borrowed' });
  assert.equal(check.allowed, false);
  assert.equal(check.code, 'GAME_LOCKED');
});

test('Permissions: room capacity is strictly enforced', () => {
  const perms = { allowed_games: ['*'], max_players: 10 };
  assert.equal(evaluateGameAccess(perms, { gameSlug: 'packed', playerCount: 10 }).allowed, true);
  const overflow = evaluateGameAccess(perms, { gameSlug: 'packed', playerCount: 11 });
  assert.equal(overflow.allowed, false);
  assert.equal(overflow.code, 'ROOM_CAPACITY_EXCEEDED');
});

test('Permissions: resolveEntitlements falls back to free when inactive or expired', () => {
  const inactive = resolveEntitlements({
    planId: 'host_pass',
    subscription: { status: 'canceled', valid_until: '2020-01-01T00:00:00Z' }
  });
  assert.equal(inactive.plan_id, 'free');
  assert.equal(inactive.is_active, false);
  assert.equal(inactive.vip_questions, false);
});

test('Permissions: active subscription resolves target plan privileges', () => {
  const active = resolveEntitlements({
    planId: 'host_pass',
    subscription: { status: 'active', valid_until: new Date(Date.now() + 86400000).toISOString() }
  });
  assert.equal(active.plan_id, 'host_pass');
  assert.equal(active.is_active, true);
  assert.equal(active.max_players, 20);
  assert.equal(active.custom_packs_limit, 30);
  assert.equal(active.vip_questions, true);
  assert.equal(isGameAllowed(active, 'any_future_game'), true);
});

test('Permissions: user-specific granular overrides apply cleanly', () => {
  const customized = resolveEntitlements({
    planId: 'free',
    subscription: null,
    overrides: {
      allowed_games: ['exclusive_beta_game'],
      max_players: 35,
      custom_packs_limit: 50,
      vip_questions: true
    }
  });
  assert.equal(customized.plan_id, 'free');
  assert.equal(customized.max_players, 35);
  assert.equal(customized.custom_packs_limit, 50);
  assert.equal(customized.vip_questions, true);
  assert.equal(isGameAllowed(customized, 'exclusive_beta_game'), true);
});

