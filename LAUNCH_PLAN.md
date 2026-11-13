# After Hours: game improvements, worldwide launch, and ₹99 membership

Prepared 13 November 2026. Game changes described as implemented are in this folder. Hosting configuration is prepared; no public service, subscription, or payment collection has been activated.

## 1. Product decisions and what is implemented

### Borrowed Words: make the two hands unmistakable

Your screenshots show two different teams' hands. The football cards belong to Team Violet, whose hand you sabotage. The museum cards belong to your own team, whose hand the other clue-giver sabotages. The three football removals were preserved in the opponent review. The presentation made the change of responsibility look like a change of cards.

Both hands now remain visible during sabotage and clue-building, in consistent team panels. The active panel says “Your action is here”; the other panel retains the exact words and removed positions. On narrow screens the panels stack. An explicitly confirmed redraw is still the only action that replaces available cards; removed slots remain unchanged. Neither team receives the other team's target.

“2 of 2 choices locked in” meant two clue-givers had submitted, each removing three cards. It now says **“Both clue-givers have finished removing 3 cards each.”** The clue phase similarly names the completed action. This removes the ambiguity between players and selected cards.

### Last Seat: variety plus an optional mystery mode

The game currently named Last Seat is the one described as Last Hour. It now contains **36 round sets across six topics**: places, sports, series, food, activities, and superpowers. Choose a topic or Mixed, which uses all six topics in a six-round game. Questions and choices change together.

Keep **visible limits as the default**. Players can negotiate and reason about risk, which gives their decisions meaning. Hiding every limit would add surprise but could make losses feel arbitrary.

The implemented **Mystery limits** option hides the exact risky-choice capacity, displays a possible range, and fixes the actual capacity when the round begins. It reveals the capacity after choices lock. Everyone gets the same information. The safe choice has no player limit and a small reward. This adds uncertainty while keeping decisions understandable. It is a host setting, never changed midway through a round.

### Decoy Department: believable alternatives

The initial board now contains a target and **seven related alternatives**, with two player-selected decoys added afterward. There are twelve authored target sets. For Bee, alternatives include Wasp, Hornet, Butterfly, Moth, Ant, Beetle, and Dragonfly. A clue like “honey” is still useful, but added decoys such as Hive or Wax can create a real decision instead of competing with unrelated bicycles and tents.

Related does not mean indistinguishable: every board needs both plausible alternatives and clues that can discriminate. The target, base alternatives, and both saboteurs' candidate hands are distinct. Further content should be playtested for ambiguity; bots alone cannot judge whether a human clue is fun.

### Signal Bridge: adjustable challenge

Hosts can choose **6, 9, or 12 cards per receiver**, with 9 as the default. There are now 24 authored association groups. Each receiver still has a different board and secret target, and the sender must find one clue that connects their targets. Six cards suits newcomers; twelve increases difficulty and reading time. Larger boards should remain a choice, especially on phones.

### Presentation and demos

Selections update existing card elements rather than recreating the screen. Practice waits for Continue demo, and preserves selections through live updates and refresh. Settings work in the game dialog and shared lobby; only the host can change them. Both teams' hands, topic questions, mystery rules, and selected difficulty appear in the relevant game screens.

Responsive checks cover twelve viewport sizes from 320px to 1920px wide, including phone landscape and tablet orientations. Chrome exercises all six games; WebKit and Firefox also exercise live Borrowed Words interactions and these widths. Physical iOS/Android devices, browser zoom, screen readers, and varied mobile keyboards remain part of the public pilot checklist. Automated layout tests cannot establish perfection on every device.

## 2. Membership: one paying host, free guests

Recommend **After Hours Plus at ₹99/month per host**. A paying host unlocks eligible content for everyone in their room. Guests follow an invite and enter a name; requiring six separate subscriptions would make a party much harder to start.

| Free | Plus host: ₹99/month |
| --- | --- |
| All six core games and a useful starter library | Full premium pack library and regular curated additions |
| Full mobile support, practice, normal player limits, fair scoring | Private custom decks, reusable room presets, saved match history |
| Invite guests without accounts | Guests use the host's unlocked content for that match |
| Current game settings and accessibility | Optional cosmetic themes and seasonal packs |

These are proposed entitlements, not an implemented paywall. Keep the improvements in this update free. Do not sell better odds, stronger clues, larger scores, or removal of artificial friction. Do not interrupt a round with advertising or payment prompts. Offer upgrading when a host selects a premium pack, with a clear preview and a free alternative.

Start with one monthly plan. Test an annual option such as ₹999 only after retention is understood. The ongoing value must come from fresh, well-tested content and useful hosting tools. A small static word list alone is a weak recurring subscription.

Suggested initial premium packs: Bollywood and Indian everyday life, global series, family-friendly, difficult word connections, travel, and seasonal celebrations. Label language, familiarity, age suitability, difficulty, and supported games. Use original text; obtain rights for any artwork or licensed assets. Custom decks stay private initially, avoiding a public content-moderation system at launch.

Before building a large pack library, invite twenty groups to play at least twice. Ask hosts whether they would actually pay ₹99 and which feature makes them return. Measure repeat groups and completed games rather than just registrations.

## 3. Recommended tools and architecture

Keep the existing Node engine and browser UI. An account/billing layer and durable storage can be added without rewriting the games in another framework.

| Tool | Job |
| --- | --- |
| GitHub private repository | Source, reviews, automated engine/browser tests |
| Render paid Node web service | Public HTTPS app, API and live event streams on one always-on instance |
| Supabase Postgres and Auth | Host accounts, subscriptions, entitlements, content versions, recoverable game state |
| Razorpay Subscriptions and Checkout | INR recurring billing, payment authentication, lifecycle webhooks |
| Custom domain and DNS | A memorable address for invites and support |
| Existing Node tests and Playwright | Regression, mobile viewport, privacy and concurrency checks |
| Render logs plus an uptime check initially | Errors, availability and restart visibility |

Supabase supports email and social authentication; start with one simple host sign-in method and keep guest joining anonymous. Production email delivery needs a configured mail provider rather than assuming development email limits will suit customers. [Supabase Auth](https://supabase.com/docs/guides/auth)

Architecture at launch:

```text
Phones / tablets / computers anywhere
                  |
             public HTTPS
                  |
        one authoritative Node server
         |           |              |
   room events   Postgres/Auth   Razorpay API
   private views snapshots      signed webhooks
```

An internet connection reaches the same public server from any country; players no longer need the host's Wi-Fi. This is asynchronous, turn-based gameplay, so a single initial region is practical. Start in Singapore for the expected Indian audience and measure real latency from other regions. Render offers Singapore as a deployment region. [Render regions](https://render.com/docs/regions)

The games do not currently include voice/video. Remote groups can use an existing call app. In-app audio would need its own permissions, reliability, moderation and bandwidth budget; defer it until players request it.

## 4. Worldwide beta deployment, step by step

1. Create a repository containing this project folder. Exclude `.env`, `.local`, `node_modules`, screenshots, session tokens and logs. The surrounding desktop is not the project repository; do not commit unrelated files.
2. Create a Render web service from that repository, or import `render.yaml`. It selects Node 24, Singapore, one paid `0.5c-512mb` instance, `npm ci --omit=dev`, `node server.js`, and health check `/api/health`. Review the paid plan before creating the service. Render builds from the connected repository and assigns a public URL. [Web services](https://render.com/docs/web-services), [Blueprint configuration](https://render.com/docs/blueprint-spec)
3. The server already binds `0.0.0.0` and reads `PORT`. Set `PUBLIC_ORIGIN=https://YOUR-SERVICE.onrender.com` in the hosting dashboard after the URL is assigned. This makes invites use the public HTTPS origin instead of internal network addresses. No trailing room path is needed.
4. Run a real smoke test with one phone on mobile data and another player on a separate home network. Join through an invite, exercise private roles, finish a game, refresh, briefly disconnect, and return from a sleeping tab. Verify long-lived event streams and reconnect on the deployed service.
5. Add your custom domain, configure the supplied DNS records, wait for HTTPS, then update `PUBLIC_ORIGIN` to that domain. Recheck invite links and same-origin API requests. Do not cache `/api/*` through a CDN.
6. Keep one instance and manual deployments during the beta. The prepared manifest disables automatic deployment. Announce maintenance between games: current rooms are in memory and reset on restart or deployment. Unexpected restarts can also happen; this beta is not yet a durable paid service.
7. Add persistence, recovery and billing below before charging. Keep separate staging and production databases, payment keys and webhook URLs. Back up production and rehearse restoration.

`Dockerfile` is also provided for a container host, but the recommended Render setup uses the native Node runtime. The container build has not been verified locally because Docker Desktop's daemon was not running. The hosting account, domain, and real public-network test have not been created or performed here.

Do not use sleeping free compute for a dependable paid multiplayer service. Render's free web services spin down after fifteen minutes without qualifying inbound traffic, adding a cold start. [Render free service limits](https://render.com/docs/free)

## 5. Persistence and accounts before billing

Proposed database tables:

- `profiles`: authenticated host ID and public display preferences.
- `subscriptions`: unique provider subscription ID, host ID, provider status, paid-through date, cancellation state, last reconciliation time.
- `payments`: unique provider payment ID, amount, currency, invoice/refund state. Never store card numbers or UPI credentials.
- `webhook_events`: unique provider event ID, processing status and minimal audit metadata.
- `packs` and `pack_versions`: curated content, premium flag, language and difficulty. Pin a version when a room starts so a content update cannot change cards mid-round.
- `rooms` and `room_players`: private recoverable snapshot, revision, phase ID, deadline, expiry, host, hashed player-session tokens. Do not make secret game snapshots readable from the browser database client.
- `commands`: unique request ID and committed result for deduplicating retried actions.
- `match_summaries`: final results and pack/version references, with retention and deletion controls.

Persist each accepted game mutation in a transaction **before acknowledging it or broadcasting the new revision**. Serialize commands per room and validate the expected phase/revision. On restart, restore rooms and deadlines; apply overdue transitions once. Continue sending the existing role-filtered views so the database addition never exposes opponents' targets. Keep server credentials on the server and use row access policies for host-owned records.

Guest reconnection needs a room-scoped durable session, explicit expiry and recovery UX. An account holder should be able to reclaim their host role. Define disconnect grace periods and host transfer before launch; current multiplayer keeps its roster fixed during a match.

Acceptance tests: restart during every game phase, duplicate payment and game requests, database outage before/after commit, overdue timers, expired sessions, host disconnect, deletion, and a restore from backup. No acknowledged move may silently vanish.

## 6. Implementing ₹99 recurring billing

Razorpay's documented flow uses a plan, subscription and Checkout integration. Create a server-controlled monthly plan for **9900 paise** and use test mode first. Available methods and international acceptance depend on account activation and merchant eligibility. Worldwide game access does not require worldwide payment acceptance on day one. [Subscription integration](https://razorpay.com/docs/payments/subscriptions/integration-guide/), [International payments](https://razorpay.com/docs/payments/international-payments/)

Implementation sequence:

1. Complete merchant onboarding, business/bank verification and enable the required recurring methods in the account. Configure separate test and live credentials and webhook secrets.
2. Add `POST /billing/subscription`. Require an authenticated host, choose the plan on the server, prevent unintended duplicate active subscriptions, and create the provider subscription. Ignore client-supplied prices or entitlement claims.
3. Open provider Checkout using its public key and the returned subscription reference. The current Content Security Policy blocks third-party checkout; add only the provider's documented script, frame and connection origins after testing. Secret keys never enter the browser bundle.
4. Verify the Checkout result on the server, but grant access only from a verified paid state. A successful-looking browser callback alone is insufficient.
5. Add `POST /billing/webhook`, capturing raw bytes before JSON parsing. Verify HMAC-SHA256 against `X-Razorpay-Signature`, deduplicate `x-razorpay-event-id`, and tolerate out-of-order delivery. Record events transactionally; reconcile uncertain state with the provider API. This route needs its own authentication and request handling rather than the game's same-origin JSON restriction. [Webhook validation](https://razorpay.com/docs/webhooks/validate-test/)
6. Add billing status and cancellation endpoints, receipts/history, and a clear “Access until [date]” display. Cancellation stops future renewal while retaining the paid entitlement period. A proposed short retry grace period must be explicit and bounded. Process refunds and disputes according to a published policy.
7. Check premium access on the server when selecting a pack or starting a room. Snapshot the room's authorized content for that match. Expiry or cancellation during a round should not abruptly end a game already started. Restrict new premium sessions when access ends.
8. Run sandbox success, failure, retry, cancelled mandate, renewal, duplicate webhook, out-of-order webhook, refund, and expired membership tests. Reconcile provider records on a scheduled job. Then perform a small real payment and cancellation with the merchant account before announcing launch.

Recommended routes: `/billing/subscription`, `/billing/webhook`, `/billing/status`, `/billing/cancel`; use Supabase Auth's supported flow for sign-in/session management. Protect authenticated cookie sessions against cross-site requests if adopting cookies. Store only the minimum payment metadata necessary for support and accounting.

## 7. Budget and unit economics

Current published infrastructure starting points: Render's `0.5c-512mb` paid instance is **US$7/month**, and Supabase Pro starts at **US$25/month**. That gives a **US$32/month starting infrastructure subtotal**, before taxes, exchange rates, domain, email, bandwidth overages, monitoring and labor. The $7 machine is an initial configuration to measure, not a demonstrated production capacity guarantee. [Render pricing](https://render.com/pricing), [Supabase pricing](https://supabase.com/pricing)

Razorpay lists standard gateway pricing of **2% plus GST**. Subscriptions can carry an additional fee; its subscription page currently advertises a promotional rate. Confirm the applicable recurring fee and taxes in the merchant agreement instead of basing the business on a temporary promotion. [Gateway pricing](https://razorpay.com/pricing/), [Subscription pricing](https://razorpay.com/subscriptions/)

| Paid hosts | Gross monthly billing at ₹99 |
| --- | ---: |
| 100 | ₹9,900 |
| 500 | ₹49,500 |
| 1,000 | ₹99,000 |

For an early planning model only, assume **₹80 contribution per paid host** after a conservative provision for transaction costs and applicable taxes. If the chosen monthly operating budget is ₹4,000, infrastructure break-even is approximately 50 paying hosts. These are assumptions, not tax advice, a currency conversion, or a profit forecast; content creation, support, acquisition, refunds and developer time still cost money. Have an accountant establish whether ₹99 is tax-inclusive and the actual invoice/tax treatment before launch.

## 8. Quality gates, scaling, and rollout

Existing checks include 36 engine tests, 1,200 randomized complete games, 30 browser tests and a local 192-player concurrency exercise. The measurement supports regression confidence; it does not prove the capacity of a particular hosting plan. See `VERIFICATION.md` for exact scope and limitations.

Before a paid launch, require:

- Full games on real iPhone Safari, Android Chrome, iPad Safari and desktop browsers; touch, keyboard, zoom, mobile keyboard, contrast and reduced-motion checks.
- Deployed-server concurrency testing and observation of CPU, memory, connection count and 95th-percentile action latency; reproduce slow networks and tab suspension.
- Persistent-room restart recovery, database backup restore, privacy tests, billing lifecycle tests and no double scoring or double entitlement grants.
- A usable cancellation/refund path, support address, privacy/terms pages and clear recurring-price disclosure.
- A small human playtest of every content pack, especially related decoys and ambiguous cross-board clues.

Start with one authoritative process. If capacity requires multiple instances, add shared room storage and coordination, a single owner/lease per active room, and event distribution such as Redis pub/sub. Sticky sessions alone do not make in-memory games durable. For regional expansion, map each room to one region and route all its players there; do not independently run the same room in multiple regions. Scale based on measured bottlenecks rather than launching an expensive distributed system immediately.

Illustrative solo-development schedule, assuming accounts and approvals are available:

| Stage | Deliverable |
| --- | --- |
| Week 1 | Public free beta, custom domain, real-device/remote-network testing, twenty pilot groups |
| Week 2 | Auth, durable state, recovery, content-version model |
| Week 3 | Subscription sandbox, entitlements, cancellation, reconciliation |
| Week 4 | Premium starter packs, support flows, backup/recovery and payment failure testing |
| Week 5 | Limited paid pilot, monitored production payment, refine onboarding |
| Week 6 onward | Broader release if reliability and repeat play justify it; regular curated additions |

Track room creation → invited guest joins → first round → completed game → next-week return, plus upgrade conversion, voluntary cancellation and payment failures. Store aggregate events without private clues, full payment payloads or unnecessary personal data. Set numerical targets from the pilot rather than assuming generic conversion benchmarks apply.

The immediate next business step is a free public beta. The immediate next engineering step for monetization is durable room state and host identity; the ₹99 checkout comes after those foundations.
