# Updraft - rules and implementation

Implemented 17 November 2026. Route: `/updraft`.

This is a solo game alongside the six existing party games. It does not create a multiplayer room. The homepage has a separate solo entry.

## Rules in this version

- Five rounds, each offering two trivia prompts. Choose one and submit an answer.
- An accepted answer banks 5 / 10 / 20 / 40 points. The tiers are editorial launch values, **not measured player frequencies**.
- Test one unused letter from that answer. Every occurrence is revealed. A miss costs 1 Fuel. Start with 6 Fuel.
- An answer cannot be reused, including supported aliases. An echo banks points without a probe. Skipping an answer gives no points; skipping a probe keeps the banked points. Neither skip costs Fuel.
- Between rounds, try to solve the hidden answer. A wrong guess costs 2 Fuel. At most three wrong guesses. No solve before the first round.
- A solve earns `100 + 20 × remaining Fuel + 50 × unused rounds`. Maximum score: 460. Early solving is preferable to delaying just to collect another 40-point answer.
- At zero Fuel, the run ends and retains trivia points. After round five, solve, use the remaining guesses, or finish and reveal. Explicitly abandoning also counts as seeing that puzzle.
- No countdown in this prototype. An attempt can resume for 24 hours from creation. A server timestamp controls expiry.
- Normalization ignores case, spaces, punctuation and accents. Full solves ignore a leading “the”, accept listed aliases and a single typo for targets of at least eight letters. Trivia accepts exact entries/aliases; one-edit corrections require at least five submitted letters and exactly one matching dictionary entry. Short words require exact spelling.
- No automatic solve merely from revealing every letter. There is no public leaderboard or paid scoring advantage.

Worked example: Papaya/P, Chile/E, Hornbill/H, Cucumber/C against Machu Picchu gives 45 trivia points, 5 Fuel, 1 unused round, a 250-point solve bonus, and **295 total**.

## Free guests and account progress

Guests receive a cryptographically random HttpOnly, SameSite cookie (Secure on hosted HTTPS). The server stores only its SHA-256 identity. A browser reset or another device loses guest continuity; we do not claim to prevent that.

Signed-in identity comes only from Supabase token verification, never a client-supplied user ID. Sign-in atomically claims guest progress once. Seen answers merge; an account's existing active practice run takes priority. Existing daily assignments cannot be overwritten by claiming a guest run. A signed-out browser receives a fresh guest identity instead of reading the former account's state.

Practice is free. Signed-in users also get one personal daily assignment per UTC date (reset at 05:30 India time; UI displays the next reset locally). This is a random unseen puzzle for that account, not a shared global daily answer. An active flight must be completed/abandoned/expired before another of the same mode starts. Finishing a daily does not grant another daily that day. Practice and daily share canonical-answer history. Assignment marks an answer as seen immediately, including abandoned attempts.

At starter-library exhaustion, the game explains that there is no unseen puzzle left. It does not silently repeat an answer. The last 20 result summaries are displayed; storage retains 100 summaries and full current practice/daily runs. Old complete solutions are not an archive feature in this first version.

## Content

`lib/hidden-content.js` contains **30 distinct hidden answers and 3,391 accepted trivia entries**, plus aliases, across 30 categories. Each category contains approximately 100-120 curated options classified by rarity (Common: 5 pts, Uncommon: 10 pts, Rare: 20 pts, Deep cut: 40 pts). Each puzzle has five pairs using ten distinct categories; versions rotate the pairing/order. Hidden answers have 8–12 letters and 6–9 distinct letters. Coverage checks require every hidden letter to appear in at least three distinct accepted answers and in at least two prompts without relying exclusively on deep cuts.

The bank has been authored and checked for these structural constraints; it has **not** been validated by a human familiarity panel. Prompts share curated category dictionaries. These are 30 complete assignments, not 300 independent unique trivia categories. A limited dictionary can reject a valid answer; the UI explains that and lets players submit feedback. Reports are stored privately, up to three per flight, with no automatic points or dictionary updates.

The original document's target of revealing 75% of distinct letters in five probes cannot hold for answers with 8–9 distinct letters. This prototype does not claim to meet that criterion. Human playtesting should evaluate inference from partially revealed letters, recognition, completion rate and enjoyment before expanding to 1,000+ puzzles.

Published puzzle snapshots live inside each attempt, so a later content release cannot change an in-progress target, accepted answers, points or explanation. New published editions should get new version IDs. Canonical answer identity remains stable to prevent repeats across editions.

## Persistence and concurrency

- Hosted: Postgres is the sole source of truth. Apply `supabase/migrations/006_hidden_depths.sql`.
- Local: a single Node server uses `.local/hidden-depths.json`, an ignored file replaced atomically. Local Windows file-lock retries preserve the old complete save. This adapter is not for multiple processes or production.
- Set `HIDDEN_DEPTHS_STORE=supabase` when testing the cloud adapter locally. On Vercel, Postgres is always required regardless of that setting. Database failures return an error; there is no volatile hosted fallback.
- The prototype stores one aggregate per identity in `hidden_depths_players`. Compare-and-swap RPCs update it atomically. Guest claims lock both identities in a consistent order. Table access and all RPC execution are restricted to the service role. Neither anonymous nor signed-in browser roles can read snapshots or write scores directly.
- Mutations check the run ID, revision, phase and request ID. Retrying a move cannot award points twice. Conflicting updates reload server progress. Start request receipts prevent a late retry from consuming another puzzle.
- The existing API's JSON/origin checks, payload limit and Upstash rate limits also cover this game. No accepted-answer dictionary, unrevealed target, aliases, explanation, nonce or storage identity is included in public run views. The build packages server modules into the function and excludes them from static assets.
- The browser stores only UI navigation and the existing account session. It never calculates an authoritative score. Two browser tabs share the same guest cookie and run.

The source repository contains authored solutions. Keep the content repository private if future competitive modes require stronger answer secrecy. Randomization is not proof against someone who already knows a solution or uses outside help. This version makes no competitive anti-cheat promise and does not punish quick solves or shared IPs.

## Connect and run

1. Apply migration 006 in the existing Supabase SQL Editor. It can be rerun safely.
2. Configure `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` (or legacy anon key), and `SUPABASE_SECRET_KEY` (or legacy service-role key) on the **server** in Vercel. Never put secret keys under `public/`.
3. Keep the existing Upstash environment settings for API rate limits and multiplayer rooms.
4. Deploy the normal build: `npm run build`. The Build Output API maps `/updraft` to its static HTML and `/api/hidden/*` to the existing Node function.
5. For local disk persistence: `npm start`, then open `http://localhost:3000/updraft`. To use account credentials locally, launch with `node --env-file=.env server.js`, or the existing Windows launcher.

API, all same-origin JSON POSTs: `/api/hidden/state`, `/start`, `/move`, `/report`. Daily requests include `mode: "daily"`; practice is the default. Account authentication uses the existing `X-Account-Token` header.

## Verification

- `npm test`: existing game/backend regression suites plus Updraft rule, persistence, privacy and real Postgres tests.
- `npm run test:hidden`: worked score, aliases and ambiguous typos, duplicate inputs and requests, stale revisions, five misses, Fuel floor, echo/skips, expiry, exhausted library, UTC rollover, protected daily assignment, guest claims, database permissions, concurrency and **3,000 deterministic stress flights**.
- Postgres tests run migration 006 in PGlite and exercise both SQL permissions and the complete service through the Postgres adapter, including independent service instances and concurrent claims.
- `npm run test:hidden:ui`: complete five-round games on 320, 390, 768, 1024 and 1440 px widths, reload/resume, invalid-answer retention, shared-tab conflicts and the homepage entry. Screenshots are in ignored `test-results/`.
- Deployment tests inspect the actual packaged function and static artifacts, including missing-database failure and answer-bank exclusion.

Automated tests establish the checked invariants, not fun, human difficulty, accessibility certification, or an internet-scale load guarantee. There is no claim that the old document's external simulation was reproduced.

### Verified live on 17 November 2026

The production release at `https://after-hours-party-games.vercel.app/updraft` passed a complete five-round phone game using the hosted Postgres store. A temporary confirmed QA account verified real Supabase password sign-in, one-time guest progress transfer, a second browser/device resuming that same run, an unseen daily assignment, the exact early-solve calculation, and a same-day restart returning the same daily result. Anonymous direct RPC access was denied; the guest cookie had Secure/HttpOnly/SameSite flags, and live API views omitted the unrevealed answer. No browser JavaScript errors were observed. The temporary account and tracked QA records were removed after testing.

The final full backend run passed **82 tests** (including 3,000 Updraft stress flights); all **7 browser tests** passed across the five viewport sizes. Live screenshots and the eight-check report are saved in ignored `test-results/hidden-live-*` files. Subsequent UI-only polish makes save notifications dismiss automatically rather than covering the result indefinitely.

## Expansion and subscriptions

Next: playtest the 30 assignments, review rejected-answer reports, broaden accepted dictionaries and vary prompt families. Track recognition, solve/bust/abandon rates and support feedback before freezing difficulty bands. Build a reviewed publication queue for 100, then 300, then 1,000+ canonical answers; validators are necessary but do not replace editorial review.

Before substantially higher traffic, normalize assignments, attempts, action receipts, seen-answer history and reports into separate indexed tables. Keep transactional allocation and move validation, immutable puzzle versions, per-account ownership and retry semantics. The aggregate format intentionally keeps the first prototype small but rewrites the current account document each move; benchmark and migrate before large-scale rollout. Add retention/deletion controls, moderation/report triage and observability before a broad public launch.

Future subscription benefits can include themes, an archive, detailed personal statistics and custom practice collections using the existing subscription/entitlement infrastructure. This release introduces **no checkout or paid lock**. Free guest play, account history and personal daily access remain free. Do not sell extra Fuel, extra competitive attempts or higher scoring multipliers. Any competitive leaderboard must compare equivalent immutable puzzle/difficulty versions; arbitrary random puzzles are not fairly comparable.

## Sky-theme and speed update (17 November 2026)

The game is now Updraft, formerly Hidden Depths. `/updraft` is the canonical URL; old `/hidden-depths` links redirect. Saved account identities, guest cookies, database tables, puzzle IDs, and the internal `air` field retain their existing identifiers, so the rename requires no migration and does not reset progress. The displayed resource is Fuel.

The sky design uses original CSS balloon sculptures, clouds, a paper plane, floating letter cards, and warm pastel colours. Prompt selection, letter launch, reveal, score gains, misses, new rounds, log entries and results have short nonblocking animations. Prefers-reduced-motion disables decorative movement. There are no animation timers that hold up the next step.

Show me how starts a separate five-round PAPER PLANE tutorial. Its small teaching dictionary and result are intentionally public. Once the page assets are loaded, every tutorial move runs synchronously without network requests, including offline. Tutorial progress stays in sessionStorage; tutorial scores and seen answers never enter the real account library or daily history.

Public views may include the next pair of prompt titles at the decision step. This lets Next round open the input immediately while its server move saves. Players may pick a prompt and type during the save, but cannot submit the next answer until confirmation. Errors roll back to the last confirmed phase and reuse the same request ID for safe retry. Letter matches, answer acceptance and points are never predicted.

The previous backend reread a guest record and rewrote unchanged state. The service now reuses its first read and skips unchanged read-only writes. Hosted instances maintain a bounded 128-identity, 30-second private read cache for moves only. Every move, including an identical retry from cache, must pass Postgres compare-and-swap before it is returned. Conflicts invalidate the cache and reread the database. State reads and starts always read fresh records; database failure never falls back to accepting cached moves. This reduces warm guest moves to one database RPC while preserving cross-device and guest-claim correctness. Auth checks remain server-side.

Verification: 85 Node tests passed, including 3,000 stress flights and new tests for stale caches, duplicate scoring, claims, database outages and synchronous tutorial rules. Browser coverage adds offline tutorial play, immediate next-round rendering under a delayed server response, preserving typed drafts, failed-save rollback, particle cleanup and reduced-motion behaviour to the five existing responsive sizes. Live timings are compared with the previous deployment; exact results are recorded separately after deployment.

### Live speed verification

All **11 browser checks passed** against an isolated checkout of release `db01daa`, as did the 85 Node tests. The live deployment was then checked on desktop and phone, including the old URL redirect, resuming an existing guest flight, immediate next-round rendering, an offline tutorial solve, and confirmation that tutorial play leaves the real run untouched. No JavaScript errors were observed.

| Check | Previous deployment | Updraft |
| --- | ---: | ---: |
| Median server-confirmed move (8 requests per version) | 2,534 ms | 949 ms |
| Median progress read (3 requests per version) | 2,128 ms | 740 ms |
| Next-round UI update during live save | Waited for response | 1.6 ms |
| Tutorial answer-to-letter transition | No separate offline tutorial | 6.3 ms |

These are measured samples from this connection, not latency guarantees. Server-side answer and scoring validation still depends on the network. The immediate next screen and tutorial do not wait for decorative animations. Raw live reports and screenshots are in ignored `test-results/updraft-*` files.
