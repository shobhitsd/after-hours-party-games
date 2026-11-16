# Backend integration and account connection guide

Prepared on 16 November 2026. Supabase, Upstash and Razorpay accounts are **not connected**. No cloud resources, real subscriptions, payments or deployments were created. Local tests use a real embedded Postgres engine and simulated provider APIs; they do not certify a cloud deployment.

## What works

| Area | Implementation |
| --- | --- |
| Packed House question changes | Host can change the question three times per round, during ranking. Group-wide budget, confirmation, cleared rankings, new timer/commitment, unchanged scores, persisted across reloads. |
| Supabase content | `packed_questions` and `packed_options`; 60 questions and 360 options in the seed. Separate free/VIP caches for one hour. Invalid, incomplete or unavailable cloud content falls back to the bundled free collection. |
| Host accounts | Email/password signup, confirmed-email sign-in, token refresh and sign-out through Supabase Auth. Guest players still need no account. Browser tokens stay in tab session storage; server keys never reach the browser. |
| Saved packs | Account UI saves current custom questions, lists private packs, loads them into settings and deletes them. Free limit: three saved packs; active Host Pass removes that limit. An owner-only database RPC serializes quota checks. The schema also supports owner-authorized public packs; the current UI saves privately. |
| Membership | Server-verified user identity and subscription expiry. Five-minute entitlement cache, capped by actual expiry; refresh membership bypasses it. `profiles.is_vip` is not trusted for access. |
| Shared rooms | Upstash REST, two-hour activity TTL, conditional atomic writes with conflict retries, shared rate limiting and no memory fallback during a configured storage outage. |
| Live updates | Local single-process play uses SSE. Shared/serverless play polls private player state every 1.5 seconds, with reconnect handling. Every read loads authoritative storage; one process's cache cannot become a separate game. |
| History | Sessions and revealed Packed House proof/point receipts are archived idempotently. Private tokens and unrevealed draws are excluded. Only the account that hosted a session can read its history. |
| Billing | Real Razorpay subscription creation, INR 99 monthly plan validation, checkout binding to verified accounts, original-byte HMAC verification, transactional duplicate receipts and stale-event protection, provider-state lookup, cancellation of future renewals. |

## 1. Supabase

1. Create a project. Choose a region close to the game backend and Redis. Enable Email/password authentication. Set the Auth Site URL to your staging site and configure email confirmation and production email delivery.
2. Apply the files in `supabase/migrations/` in order: `001_initial_schema.sql`, `002_row_level_security.sql`, `003_storage_buckets.sql`, then `004_backend_integration.sql`. Apply each migration once; use the dashboard SQL editor or Supabase CLI migration tracking. Existing projects that already applied 001–003 need only 004. Take a backup before migrating an existing production database.
3. Run `npm run seed:sql`, then execute `supabase/seed-packed.sql` in the SQL editor. It is transactional and safe to rerun: stable IDs update existing content instead of duplicating it. Alternatively, after setting environment variables, run `node --env-file=.env scripts/seed-supabase.js --apply`. REST seeding uses idempotent upserts, but the SQL option provides one transaction.
4. Set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_SECRET_KEY` on the backend. Legacy anon/service-role keys are also supported. Put secrets in deployment environment settings, never in frontend code, screenshots or Git.
5. Verify the seed count is 60 questions and 360 options. All supplied questions remain free. Mark future authored questions `is_vip=true` only when you actually offer a premium collection.

Migration 004 closes the earlier public session-write policies, restricts profile updates to ordinary profile fields, and adds private pack/history policies. Pack image storage is scoped to the uploader's user-ID folder. SQL functions pin their search path and expose privileged billing/archive functions only to the service role. See [Supabase RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 2. Upstash shared rooms

Create a Redis database and copy its REST URL and token into `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Both are required. Room state contains private seat tokens and hidden draws: the Redis token must remain server-side.

Writes compare the complete version read against the current value inside one Lua operation. A conflict recomputes the action from fresh state; retries never overwrite someone else's newer submission. There is no automatic switch to local memory after an outage. The server returns 503 and clients retry. This corrects the plan's proposed last-writer-wins SETEX approach. [Upstash REST supports Lua scripting](https://upstash.com/docs/redis/features/restapi).

Activity renews the two-hour room TTL. A game abandoned longer than that expires; the private seat link cannot recover an expired room. Redis must be backed up/configured according to your retention needs. Supabase history is an audit archive, not an active-game reconstruction service.

The question bank is serialized once per room; the draw bag stores indices. A fresh practice room measured about 61 KB locally. Ten players polling every 1.5 seconds generate roughly 400 state requests/minute, plus heartbeats/actions. Budget for Redis bandwidth and commands as well as hosting requests. Real internet latency, regional distance, concurrency and service-plan limits require staging measurements; this implementation makes no sub-millisecond or free-at-scale promise. A future push transport can reduce polling volume after measuring actual usage.

## 3. Razorpay test subscriptions

1. Use Razorpay **test mode**. Create a plan with `period=monthly`, `interval=1`, `amount=9900` paise and `currency=INR`.
2. Set the four `RAZORPAY_*` settings in `.env.example`. Leave `PAYMENTS_MODE=test`.
3. Add webhook URL `https://YOUR-STAGING-DOMAIN/api/webhooks/razorpay` and a signing secret. Subscribe to the supported subscription lifecycle events: authenticated, activated, charged, pending, halted, cancelled, completed, paused, resumed and updated. Enable only event types available in your dashboard.
4. Sign in through **Host account**, choose **Open secure checkout**, then **Continue to Razorpay**. The hosted checkout opens in a new tab. Membership comes from the verified webhook and provider record; returning from checkout cannot grant access.
5. After the test charge, return and choose **Refresh membership**. Verify custom-pack limits and cancellation of future renewals. Replay the notification and verify it does not create duplicate membership rows.

The initial subscription contract is up to **12 monthly payments of ₹99**, shown in the UI. Cancellation is requested at the end of the paid cycle. After a terminal subscription ends and paid access expires, a new checkout can be created. There are no fake order IDs or placeholder success responses when payments are unconfigured. Live keys are rejected unless you deliberately set `PAYMENTS_MODE=live`. Live operation also needs your merchant account activation, customer-facing terms/privacy/cancellation information and production testing; none of these external account steps was performed here.

Webhook signatures use the original bytes with constant-time comparison. The server fetches the subscription from Razorpay, checks the plan, binds it to a server-created checkout, and grants access only for a paid active period. Event hashes deduplicate processing in the same SQL transaction as membership updates; older events cannot overwrite newer ones. See [Razorpay subscription APIs](https://github.com/razorpay/markdown-docs/blob/master/api/payments/subscriptions.md).

**Ambiguous checkout timeout:** if the provider creates a subscription but the response is lost, the reservation deliberately blocks creating another chargeable subscription. In the Razorpay dashboard/API, locate the subscription by its `notes.checkout_id`, then bind its ID and checkout URL to that reservation. A subsequent valid lifecycle webhook can also repair an unbound reservation using those provider-confirmed notes. Only clear a reservation after checking that no subscription was created. This requires an operator; the app never blindly retries an ambiguous creation.

## 4. Environment and hosting

Copy `.env.example` to `.env` for local integration testing; fill it privately. The launcher loads `.env` when present. Stop and restart the server after changing environment settings.

```powershell
npm install
node --env-file=.env scripts/check-backend.mjs --require-all
node --env-file=.env server.js
```

The settings check prints names/status only, never values. It does not verify credentials. Without cloud settings, `npm start` and **START GAMES.cmd** still run the local games; account/payment controls stay hidden.

For **Vercel**, import the repository, select Other / Node 24, build with `npm run build`, and use `public` as output. The existing rewrites route API requests through `api/index.js`. Add cloud settings and set `PUBLIC_ORIGIN` to the actual staging origin. Upstash is mandatory for serverless rooms; the app refuses to create in-memory serverless games. The Web-standard handler preserves original request bodies instead of relying on an automatically parsed JSON helper. [Vercel documents this handler format](https://vercel.com/docs/functions/runtimes/node-js).

For a **persistent Node service** on Render, a VM or Docker, run `npm start` behind HTTPS and set `PUBLIC_ORIGIN`. Without Redis, use exactly one process and accept that restarting loses active rooms. With Redis, multiple processes use the same authoritative store and polling transport. Put secrets in the host's environment settings. The frontend and API should share one origin.

Use a separate staging database, Redis database and Razorpay test keys. Do not mix a preview deployment with production room storage or live merchant keys. Choose a backend region near both data services. Add a custom domain and HTTPS through your host after staging checks pass. No publishing command has been run on your behalf.

## 5. Tests and staging acceptance

```powershell
npm run build
npm test
npm run test:ui
npm run test:load
```

Node tests cover the game engines, malformed requests, question changes, Redis compare-and-swap conflicts/outages, cross-process room synchronization and cold starts, content caching/fallback, auth identity, payment signatures and replay handling. The database test applies all four migrations to PGlite (a Postgres engine) with Supabase-like roles, then checks actual privileges and row visibility. Browser tests include phones, tablets, desktop, Chrome, Firefox and WebKit; account screens use mocked cloud responses.

After accounts are connected, perform these checks against the actual **staging** deployment:

- Create/confirm two host accounts. Verify each sees only its own private packs; a fourth free pack fails, while an active test subscriber can save it. Expired membership restores the free limit without deleting saved packs.
- Start a room on one device; join from another on mobile data. Submit simultaneously, refresh, and reconnect after a backend restart. Rankings and the remaining question changes must match.
- During ranking, use all three question changes and retry a previous request. Only three distinct changes should succeed. Picks, points and hidden draws must never leak in another player's response.
- Complete a round and game. Check one session and one receipt per revealed round. Compare committed hashes and point totals. Verify another account cannot read those rows.
- Complete a Razorpay test charge, replay its webhook, send an invalid signature and test delayed/cancellation notifications. Inspect the signed webhook delivery and server response on Vercel itself; local adapter tests cannot prove dashboard routing or production credentials.
- Temporarily make Redis inaccessible in staging: actions must return an unavailable error, then reconnect to the same state after recovery. Temporarily block Supabase: gameplay content should fall back, paid authorization must fail closed, and pending history should retry.
- Measure request latency, Redis bandwidth, function usage and mobile reconnect behavior with your expected group count before choosing hosting capacity or enabling live payments.

Archive retries are retained inside active room state and retried on room activity, with a 30-second per-process cooldown. If Supabase remains down until the room expires, unsaved receipts can be lost. For a strict no-loss history requirement, add a durable queue/worker before launch. There is no unattended retry worker, customer-support dashboard, password-recovery UI, public-pack marketplace or built-in voice chat in this integration.
