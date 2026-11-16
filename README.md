# After Hours™

[![CI](https://github.com/shobhitsd/after-hours-party-games/actions/workflows/ci.yml/badge.svg)](https://github.com/shobhitsd/after-hours-party-games/actions)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green.svg?logo=node.js)](https://nodejs.org)

Six real-time party games for 4–10 friends (depending on the game), featuring a responsive game lounge, animated dimensional illustrations, private screens, room links, timed rounds, scoring, and practice bots.

> [!NOTE]
> **100% Original Intellectual Property**: No games, card decks, artwork, or mechanics copy existing titles. For a detailed legal audit, patent/copyright analysis, and trademark clearance, read [LEGAL_AND_IP.md](LEGAL_AND_IP.md).

---

## The Games

| Game | Players | Category | How It Works |
| :--- | :--- | :--- | :--- |
| **Packed House** | 5–10 | Collective bluffing | Everyone ranks, negotiates and chooses a room. Rankings set tier pools; hidden seats decide whether entrants split the pool or score zero. 60 varied questions, custom packs, practice bots, spectators and verified reveals. |
| **Signal Bridge** *(formerly Crossed Signals)* | 4–8 | Word association | One sender gives a single clue for different secret targets on everyone's 6-, 9-, or 12-card boards. 24 association groups; five rotating rounds. |
| **Decoy Department** | 5–8 | Creative sabotage | A target and seven related alternatives, then two secret saboteurs add decoys. Twelve authored sets; every player gets one turn as guide. |
| **Crowd Control** | 4–8 | Social prediction | Calibrate a dilemma threshold with a blank to hit a secret target number of YES votes. Includes 40 prompt templates. |
| **Almost Twins** | 6 or 8 | Friendly deduction | Share short clues about secret paired words. Mutual partner selections earn points. Five rounds with fresh pair sets. |
| **Borrowed Words** | 4, 6, or 8 | Team wordplay | Two teams remove cards from each other’s hands; clue-givers arrange up to three remaining cards. Teammates vote for an answer. Everyone gives one clue. |

---

## Deployment & Hosting

### Cloud integration and hosting

The server supports shared Upstash room storage, Supabase accounts/content/private packs/history, and verified Razorpay subscriptions. These integrations are prepared and locally tested; cloud accounts have not been connected or deployed. Follow [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) for the migration, environment settings, seeding, hosting and staging checks.

1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com): **Add New Project** → **Import** your repository.
3. Choose Framework Preset **Other**, build command `npm run build`, output directory `public`, and Node 24. Configure Upstash before deploying multiplayer; Supabase and Razorpay enable the optional account features.
4. Deploy a staging site, set its `PUBLIC_ORIGIN`, and complete the staging checks in the integration guide before sharing it publicly. Shared storage uses short HTTP polling rather than long-lived serverless event streams.

### Deploy to Render / Docker / VM (Always-On Node.js)

For persistent single-process hosting with long-lived SSE connections:
* **Render**: Use the included `render.yaml` Blueprint or create a Web Service pointing to `npm start`.
* **Docker**: Use the included `Dockerfile` (`docker build -t after-hours . && docker run -p 3000:3000 after-hours`).
* Set `PUBLIC_ORIGIN=https://your-domain.com` in environment variables.

---

## Local Quick Start

1. Install **Node.js 20 or newer** if not already installed.
2. Double-click **START GAMES.cmd** in this folder (or run `npm start`).
3. Open **http://localhost:3000** in your browser.
4. Host a game, enter your name, and share the invite link or 5-letter room code.
5. Friends on the same Wi-Fi can open the link directly on their smartphones or laptops.
6. Use **STOP GAMES.cmd** when you are finished.

---

## Development & Testing

```bash
# Run server locally
npm start

# Development mode with hot-reload
npm run dev

# Run engine, privacy and randomized full-game checks
npm test

# Run UI end-to-end tests (requires Chrome)
npm run test:ui

# Run local concurrency check (20 rooms, 200 players, 20 spectators)
npm run test:load

# Exhaust all legal occupancy/capacity outcomes
node test/packed-exhaustive.mjs
```

---

## Legal & Trademark Compliance

* **After Hours™**: Trademark claimed by the project.
* **Signal Bridge™**: Fully cleared and distinct from commercial electronic trademarks.
* **Original Content & Mechanics**: See [LEGAL_AND_IP.md](LEGAL_AND_IP.md) for full breakdown of mechanics, copyright boundaries, and nominative fair use disclaimers.

---

## License

This project is licensed under the [MIT License](LICENSE).

## Packed House

Packed House replaces Trust Issues and Last Seat. Choose it in the lounge or use **Try with practice bots**. Rules, exact capacity tables, reconnect behaviour and implementation decisions are in [PACKED_HOUSE.md](PACKED_HOUSE.md). Current verification is in [VERIFICATION.md](VERIFICATION.md). Retired game code is preserved under `.archive/retired-games/` and is not served or loaded.
