# Updraft - rules and implementation

Implemented 17 November 2026; expanded 20 November 2026. Route: `/updraft`.

This is a solo game alongside the six existing party games. It does not create a multiplayer room. The homepage has a separate solo entry.

## Rules in this version

- Five rounds. Each round offers two prompts: one **everyday** prompt (Name a fruit, Name a colour…) and one **specialist** prompt (Name an NBA player, Name a Bollywood movie…). Choose one and type any answer you can think of.
- An accepted answer banks 5 / 10 / 20 / 40 points by rarity tier. The tiers are editorial, **not measured player frequencies**.
- Test one unused letter from that answer. Every occurrence is revealed and a hit earns +5. A miss costs 1 Fuel. Start with 6 Fuel.
- An answer cannot be reused, including its aliases. An echo banks points without a probe. Skipping an answer gives no points; skipping a probe keeps the banked points. Neither skip costs Fuel.
- **Hint.** Beside the mystery: first a written clue for 1 Fuel, then one revealed letter (the most frequent unrevealed one) for 2 Fuel. The button asks for a second tap before spending. A hint can never use your last Fuel. Hints are available while answering, launching or deciding.
- Between rounds, try to solve the hidden answer. A wrong guess costs 2 Fuel. At most three wrong guesses. No solve before the first round.
- At zero Fuel, the run ends and keeps everything banked. After round five, solve, use the remaining guesses, or finish and reveal. Abandoning also counts as seeing that puzzle.
- No countdown ever ends a flight. An attempt can resume for 24 hours from creation. A server timestamp controls expiry and every timing bonus.

### Scoring (maximum 600)

All scoring lives in `public/updraft-rules.js`, imported by the server engine (authoritative), the offline tutorial and the UI text, so they cannot drift apart.

| Component | Points |
| --- | --- |
| Trivia answer | common 5 · uncommon 10 · rare 20 · deep cut 40 |
| Quick answer | +10 within 10 s of the prompt appearing · +6 within 20 s · +3 within 30 s |
| Letter hit | +5 for each launched letter that is in the answer |
| Solve | 100 + 20 × Fuel left + 60 × unused rounds |
| Swift flight | up to +60: full under 60 s of active play, fading linearly to 0 at 5 minutes |
| First-guess solve | +25 when the first guess is right |

- The quick window starts when the server deals the prompt (flight start or Next round). A rejected answer does not restart it.
- Active play time adds the gap between consecutive accepted moves, capped at 90 s per gap, so leaving a flight open overnight costs one capped pause. Failed moves record no time.
- Time only ever adds bonuses; it never subtracts. The tutorial is untimed and awards no quick or swift bonus, so its score is always reproducible.
- An unused round (60) is worth more than the best possible extra round (40 + 10 + 5), so solving early is always right.
- The result itemises every component, shows a 0–5 star rating (solved: 2 stars, +1 each at 300, 400 and 500; unsolved with 50+ points: 1 star) and play time, letter accuracy and hints used.

Normalization ignores case, accents, spaces and punctuation; “&” and a free-standing “+” read as “and”; a “+” or “#” attached to a word is spoken, so C++, C# and Disney+ equal “C plus plus”, “C sharp” and “Disney plus”. Digits are kept (“3 Idiots”), and digit-only titles such as 1917, 300, 2.0 or 96 are valid answers (they bank points as an echo, since they have no letters to launch). An alias may be a single letter, matched exactly (“C”, “R”, “X”). Trivia answers accept listed entries and aliases, an optional leading “The”, simple plurals/singulars, and one typo for answers of five or more letters when exactly one entry fits. If several entries fit equally well, the single entry in the most common tier is suggested (“kaola” suggests Koala, not the deep-cut Saola); a tie within that tier is rejected. The player always confirms a suggestion before it banks. On people prompts, a surname alone is accepted when exactly one listed person has it. Full solves ignore a leading “the”, accept listed alternatives, and allow a single typo for targets of at least eight letters. Revealing every letter never solves automatically.

Worked example (Machu Picchu, every answer within ten seconds): Papaya/P, Chile/E, Hornbill/H, Cucumber/C bank their rarity points, +40 quick, +15 for three hits; E misses (5 Fuel). Solving after 42 s of play earns 100 + 100 + 60 + 60 swift + 25 first-guess = 345. The engine test asserts every figure.

## Free guests and account progress

Guests receive a cryptographically random HttpOnly, SameSite cookie (Secure on hosted HTTPS). The server stores only its SHA-256 identity. A browser reset or another device loses guest continuity; we do not claim to prevent that.

Signed-in identity comes only from Supabase token verification, never a client-supplied user ID. Sign-in atomically claims guest progress once. Seen answers merge; an account's existing active practice run takes priority. Existing daily assignments cannot be overwritten by claiming a guest run. A signed-out browser receives a fresh guest identity instead of reading the former account's state.

Practice is free. Signed-in users also get one personal daily assignment per UTC date (reset at 05:30 India time; UI displays the next reset locally). This is a random unseen puzzle for that account, not a shared global daily answer. An active flight must be completed/abandoned/expired before another of the same mode starts. Finishing a daily does not grant another daily that day. Practice and daily share canonical-answer history. Assignment marks an answer as seen immediately, including abandoned attempts.

The last 20 result summaries are displayed; storage retains 100 summaries and full current practice/daily runs. Old complete solutions are not an archive feature in this first version.


### Daily return: streaks, ranks and records

- **Streak.** Consecutive UTC days on which at least one flight was flown to its end (solved, out of Fuel, or revealed after round five). An abandoned flight does not count. A streak survives until the end of the day after the last flight.
- **Pilot rank.** Lifetime points: Fledgling, Sky Cadet (300), Cloud Hopper (1,000), Thermal Rider (2,500), Jetstream Ace (5,000), Stratonaut (10,000), Aurora Legend (20,000).
- The launchpad shows the streak, rank progress, solved/flights/best score and a live countdown to the next daily flight. Records are counted exactly once per flight and merge correctly when a guest signs in. Older saves rebuild their record from history.
- After the whole library has been flown, the oldest mysteries return with newly dealt prompts. The 60 most recent (or half the library, if smaller) stay retired.

## Content

The library is server-only and has two parts.

**Answer bank: `lib/updraft-bank/`, 178 prompts and 116,263 accepted answers** (plus about 62,600 aliases; expanded 23 November 2026, see below). There is one file per prompt. Each lists answers in four rarity tiers, with aliases for spellings, nicknames, abbreviations and Indian-language names. `AUTHORING.md` in that folder holds the rules. `npm run lint:bank` reports duplicates, bad lengths and broken aliases. `npm run build:bank` regenerates `index.js` after adding a file; `npm run build` runs it too.

Each flight is dealt five everyday/specialist pairs, ten distinct prompts. Every letter of the hidden answer must be reachable from at least two of the ten without relying on a deep cut. The deal uses a CSPRNG. A saved flight stores only prompt references (about 2 KB), not answer lists; answers are looked up when a move arrives.

**Mysteries: `lib/hidden-puzzles.js`, 329 hidden answers.** Each has a category, a reveal explanation, and a hint that is checked not to contain any word of the answer. IDs are positional per edition (`hd-1-*`, `hd-2-*`); only append. `validateLibrary()` checks lengths, duplicates, hints and letter coverage.

The bank was written by AI authoring passes instructed to include only entries they were sure of. It has passed the structural linter but has **not** been reviewed by people, and deep-cut tiers are the most likely place for errors. Players can report missing or wrong answers from the game; reports are stored privately.

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

## Expansion: library, hints, scoring, 3D motion (20 November 2026)

**Library.** 113 prompts (51 everyday, 62 specialist: NBA, cricket, football, tennis, F1, Olympians, Bollywood and South Indian films, Hollywood, TV, anime, Pokémon, books, Harry Potter, Star Wars, mythology, scientists, leaders and more) with 53,930 accepted answers, and 329 mysteries with hints. See *Content* above for provenance and review status.

**3D motion layer** (`visuals/updraft/flightdeck-motion.js`, `flightdeck.css`, tuning in `CONFIG.deck` of `gsap-config.js`). Letter tiles are two-faced cards that flip on a horizontal axis and hop in a wave; the mystery deals itself tile by tile. Prompt cards swing in like doors, lean toward the mouse pointer with their icon and title on raised 3D planes, and the chosen card lifts toward the player. Launch keys flip up like keycaps; a launched letter tumbles along a curved arc; score and altitude count up; spent Fuel cells pop; the clue card unfolds downward; the result medal spins like a tossed coin, stars land one by one and the breakdown adds up line by line. The storybook scene shifts in parallax layers with the pointer. Everything is presentation only: it reads already-rendered state, never delays a move, is skipped by Motion off, and is disabled by reduced-motion preferences. Letters can also be launched from the keyboard.

### Verification (20 November 2026)

- `npm test`: **95/95** pass, including 3,000 deterministic stress flights with hints and server clocks, the worked scoring example, quick/swift timing edge cases, streak and rank rules, guest-claim merging of the pilot record, flights saved before this release, symbol and digit matching, and the Postgres migration.
- `npm run lint:bank`: 113 categories, 0 problems. `validateLibrary()`: 0 errors (lengths, duplicates, hint leaks, letter coverage for every mystery).
- Updraft browser tests: **26/26** pass against the full library (five-round games at 320–1440 px, hint purchase and confirm, quick-bonus meter, keyboard launch, itemised result that sums to the server score, streak and next flight, plus all cinematic tests).
- `npm run build`: the answer bank ships only inside the server function; no public file contains any answer.
- Content review: a pattern scan for padding (fake “Jr”, name-plus-extra-word, doubled words) found only legitimate entries, and random samples of rare/deep-cut entries in the specialist files were all real. This is a sample, not a full review; the deep tiers of cricketer, footballer, tennis_player, f1_driver, olympian, fighter, bollywood_song and the very recent (2025) titles are most worth a human skim.

## Expansion: more prompts and accepted answers (23 November 2026)

**Library.** 178 prompts (79 everyday, 99 specialist) with 116,263 accepted answers, up from 113 prompts and 53,930. All 113 existing prompts accept more answers and aliases. 65 prompts are new:

- **Everyday (28):** exercise or yoga pose, children's TV show, superpower, fairy tale or nursery rhyme, landform, pizza topping, ice cream flavour, breakfast food, soup, sauce or condiment, cooking technique, baby animal word, sound word, plant, maths term, computer term, stationery, jewellery, hairstyle, beauty product, container, sports equipment, car or bike part, building, room, shop, TV channel and Indian brand.
- **Specialist (37):** cricket term, stadium, Indian sports star outside cricket, golfer, NFL player, baseball player, chess, South Indian film star, Indian TV show, TV character, movie character, Middle-earth character, Game of Thrones character, video game character, detective or spy, villain, English song, K-pop, comedian, painter, painting or sculpture, museum, philosopher, font, monarch, explorer, empire or dynasty, battle, national park, university, newspaper or magazine, business leader, cat breed, horse breed, collective noun, chemical compound and phobia.

**Method and safeguards.**
- Every existing file was edited **append-only**. A snapshot of every previously accepted key (answer, explicit alias and automatic surname shortcut) was compared after authoring: nothing that was accepted before is rejected now, and no existing answer changed tier.
- One change was made on purpose: in `indian_leader`, “Shah”, “Basu” and “Didi” now resolve to Amit Shah, Jyoti Basu and Mamata Banerjee. Before, they resolved to less famous people.
- Where a new person shared a surname with a listed person, the author added an explicit alias, so the old surname shortcut still works.
- A scan of the new entries for padding found no invented entries. It looked for fake “Jr.”/“Sr.” names, doubled words, a listed name with extra words, near-duplicate spellings and leftover placeholder text. The authors reported catching and deleting some invented “Jr.” names in their drafts.

**Left out on purpose:**
- People convicted of, or facing, serious abuse allegations.
- Prejudice words in the phobia list, and explicit titles.
- Releases from 2026 whose release could not be confirmed.
- Titles over 30 letters. A short form is used where one exists.

**Review status.** Like the first bank, this was written by AI authoring passes. It has passed the linter and the checks above, but has **not** been reviewed by people. Specific concerns:
- **Deep tiers:** the expansion added mostly specialist items, so many files now lean towards rare and deep. These are the most likely place for errors: city, Indian city, water, dinosaur, small-nation cricketers and recent titles.
- **Very recent titles:** they rely on the author's knowledge of release dates.

**Typo matching.** Bigger lists put more one-letter typos equally close to two entries. The tier tie-break above keeps common answers like Koala reachable.

**Verification.**
- `npm run lint:bank`: 178 categories, 0 problems.
- `validateLibrary()`: 0 errors.
- `npm test`: all pass, including a new tie-break assertion.
- A non-exact lookup in the largest prompt (city, 3,434 answers) takes about 12 ms.
