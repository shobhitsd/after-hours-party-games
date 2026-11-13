# Intellectual Property, Originality & Legal Compliance

This document establishes the originality, copyright posture, trademark clearances, and legal defensibility of **After Hours™** and its six included games.

---

## 1. Legal Foundations in Game Law

### 1.1 Copyright Protection (Idea vs. Expression Dichotomy)
Under international copyright jurisprudence (including U.S. Copyright Office Circular 33, 17 U.S.C. § 102(b), the Berne Convention, and the Indian Copyright Act 1957 § 13):
* **Game Mechanics and Rules Systems Cannot Be Copyrighted**: Copyright does not extend to ideas, procedures, processes, systems, methods of operation, concepts, principles, or discoveries. A game's mechanical concept (e.g., voting, bluffing, clue-giving, elimination or capacity limits) is a system of rules that belongs in the public domain unless subject to a valid utility patent.
* **Expression Is Fully Protected**: What copyright *does* protect is the specific, creative expression—the authored text, exact rulebook wording, UI code, visual artwork, character designs, animations, and sound effects.
* **Originality in After Hours**:
  - **Zero Third-Party Assets**: Every icon, illustration, card, game piece, and animation in After Hours is built entirely using custom geometric CSS code authored directly in `styles.css`. No third-party stock photos, external SVG libraries, or proprietary font files are used.
  - **Zero Runtime Dependencies**: The server (`server.js`) and game engine (`engine.js`) are written from scratch in pure vanilla Node.js / JavaScript with zero npm production dependencies.
  - **Authored Word Decks and Prompts**: All 40 dilemma prompts in Crowd Control, the 24 association sets in Signal Bridge, the 12 decoy sets in Decoy Department, the 8 pair sets in Almost Twins, the 10 borrowed card decks, and the 36 topic rounds in Last Seat are original authored works created specifically for this platform.

### 1.2 Patent Clearance
* Neither the game engine nor any of the game mechanics implement patented mechanisms.
* Modern party games rarely contain utility patents (historic examples like Wizards of the Coast's "tapping" card patent expired in 2014). The turn-based deduction, simultaneous voting, and card-removal mechanics used in After Hours are free for use by any creator.

---

## 2. Trademark Clearance & Compliance Audit

### 2.1 Renaming "Crossed Signals" to "Signal Bridge"
* **Prior Conflict Identified**: Mattel, Inc. owns an active registered trademark for "Crossed Signals" (Reg. No. in Class 028 for electronic handheld games).
* **Remediation**: The word-association game previously titled "Crossed Signals" has been renamed to **Signal Bridge™**.
* **Clearance**: "Signal Bridge" has no confusingly similar commercial board game or digital party game registrations in Class 028 / Class 041.

### 2.2 Removal of False Registered Trademark Symbol (`®`)
* Under Lanham Act § 29 (15 U.S.C. § 1111) and Indian Trade Marks Act 1999 § 107, displaying the registered trademark symbol `®` before a mark has been officially registered with a national trademark office is prohibited.
* The header in `public/app.js` has been updated to use the common-law trademark symbol `™` (`after hours™`), which accurately claims proprietary branding rights without falsely asserting government registration.

### 2.3 Nominative Fair Use Statement for Media Titles
In the "Series" topic pack (`variety.js`), popular television shows (e.g., *Stranger Things*, *Friends*, *Panchayat*, *The Office*) are referenced as conversational options in casual discussion ("Which series would you choose?").
* **Legal Doctrine**: Under the doctrine of **Nominative Fair Use** (see *New Kids on the Block v. News America Publishing, Inc.*, 971 F.2d 302):
  1. The product or service cannot be readily identified without naming it.
  2. Only so much of the mark is used as is reasonably necessary (plain text titles only; no copyrighted logos, stills, or trademarks).
  3. The user does nothing that suggests sponsorship or endorsement by the trademark holder.
* **Explicit Disclaimer**: All television, film, book, and pop culture titles referenced within game packs are trademarks of their respective owners. Their inclusion is purely nominative for cultural identification in party trivia and does not imply affiliation, sponsorship, or endorsement.

---

## 3. Game-by-Game Uniqueness & Non-Infringement Analysis

| Game | Core Mechanic | Comparison with Existing Games | Key Legal Differentiator |
| :--- | :--- | :--- | :--- |
| **Signal Bridge** *(formerly Crossed Signals)* | Asymmetric multi-receiver card bridge | **Codenames**: Codenames uses a single shared 5×5 grid with grid coordinates and team agents.<br>**Just One**: Just One has multiple players writing clues for one guesser.<br>**Signal Bridge**: One sender connects *independent, private boards* where each receiver sees a distinct set of distractors and a secret target. | Every receiver has a unique private board; sender solves an n-way intersection problem across private screens. |
| **Decoy Department** | Co-operative clue giving hijacked by secret saboteurs | **Trapwords**: Opponents set secret "forbidden words" beforehand.<br>**The Chameleon / Spyfall**: A hidden player doesn't know the word and tries to blend in.<br>**Decoy Department**: Saboteurs know the target and the clue, and deliberately inject tailored decoy answers from a private hand into the guessing pool. | Active decoys are crafted in real time to intercept and exploit the guide's specific clue; saboteurs earn points per tricked player. |
| **Crowd Control** | Precise crowd threshold calibration | **Herd Mentality**: Players try to give the same answer as the majority.<br>**Wavelength**: Players dial a needle on a continuous spectrum dial.<br>**Crowd Control**: Setter must calibrate a numerical threshold on a binary dilemma (e.g., money or time) to hit an exact secret integer count of YES votes. | Psychological calibration to hit an exact integer split of the room (neither consensus nor rebellion, but a precise fractional consensus). |
| **Last Seat** | Capacity-constrained simultaneous selection (congestion game) | **Incan Gold / Diamant**: Push-your-luck leaving a cave.<br>**Musical Chairs**: Physical speed competition.<br>**Last Seat**: Social deduction & bluffing based on game theory's *El Farol Bar problem*. Visible limits allow negotiation; optional Mystery limits add risk boundaries. Overbooked choices award 0 points. | Players negotiate alliances and bluff destination capacity limits; simultaneous reveals cause total wipeout for overcrowded spots. |
| **Almost Twins** | Mutual pairing deduction with private twin words | **Codenames Duet**: Cooperative 2-player grid deduction.<br>**Pairs**: Memory matching of physical cards.<br>**Almost Twins**: Everyone receives half of a complementary pair (e.g., Sun/Moon, Coffee/Tea). Players write subtle clues. Scoring requires *bilateral mutual selection* (both must pick each other). | Symmetric deduction where you must communicate recognition to your counterpart without tipping off impostors. |
| **Borrowed Words** | Cross-team card removal and restricted phrase crafting | **Ransom Notes**: Freeform magnet poetry answering absurd prompts.<br>**Poetry for Neanderthals**: One-syllable word restriction with physical inflatable club.<br>**Borrowed Words**: Direct adversarial sabotage where opponent clue-givers cut 3 cards from your 12-word bank before you arrange remaining cards into a clue. | Adversarial vocabulary drafting & sabotage combined with team-based deductive voting. |

---

## 4. Summary of Proprietary Assets
1. **Source Code**: 100% original implementation, copyright owned by project authors.
2. **Visual Presentation & UI**: Proprietary 3D isometric and floating CSS layouts, custom pastel and dark themes, responsive typography, and tactile card interfaces.
3. **Audio**: Custom Web Audio API synthesizer oscillators (zero recorded sound files).
4. **Content Decks**: Original handcrafted word banks, association clusters, and scenario dilemmas.

