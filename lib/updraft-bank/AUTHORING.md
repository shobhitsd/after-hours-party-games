# Updraft answer bank — authoring rules

Updraft is a solo word game. Each round shows a prompt such as "Name a fruit" or "Name an NBA player";
the player types ANY valid answer from memory and the server checks it against the list in this folder.
Players get frustrated when a perfectly good answer is rejected, so every category must be as complete
as honestly possible: the obvious answers, the well-known ones, and the deep cuts.

## File format — one file per category: `lib/updraft-bank/<id>.js`

```js
export default {
 id: 'nba_player',                  // must equal the file name
 title: 'Name an NBA player',       // the prompt shown to the player (given in your brief; keep it)
 icon: '🏀',                        // one emoji (given in your brief)
 note: 'Past or present. Surnames work.',   // optional, <= 60 chars, shown under the prompt
 people: true,                      // ONLY for categories whose answers are real/fictional people's names
 common: `LeBron James|Michael Jordan|Kobe Bryant|Stephen Curry`,
 uncommon: `Dirk Nowitzki|Allen Iverson|Dwyane Wade`,
 rare: `Manu Ginobili|Pau Gasol`,
 deep: `Detlef Schrempf|Muggsy Bogues`,
 aliases: { 'MJ': 'Michael Jordan', 'Shaq': "Shaquille O'Neal", 'Steph Curry': 'Stephen Curry', 'Curry': 'Stephen Curry' }
};
```

- The four tier fields are template-literal strings of answers separated by `|`. Line breaks inside are fine.
- Tiers describe how readily a general, English-speaking player (many of our players are in India) would
  say the answer — NOT how important it is:
  - `common` (5 pts): the first things almost everyone says.
  - `uncommon` (10 pts): well known; most people would recognise it instantly.
  - `rare` (20 pts): takes real thought or some interest in the subject.
  - `deep` (40 pts): enthusiasts and experts only.
  Rough shape: ~15% common, ~30% uncommon, ~30% rare, ~25% deep. Put each answer in exactly ONE tier.
- `aliases` maps an alternative the player might type -> the exact answer as listed. Use it generously for:
  British/American spellings (Colour/Color, Aubergine->Eggplant), nicknames and abbreviations (SRK, DDLJ,
  CR7), alternative names (Bombay->Mumbai), common transliterations, plural-only forms, and a famous
  surname shared by several listed people (pick the most famous: 'Curry' -> 'Stephen Curry').
  An alias must not equal another listed answer, and one alias cannot point at two answers.

## What the game already handles (do NOT add entries or aliases for these)

- Case, accents, spaces, hyphens, apostrophes and all punctuation are ignored. "&" equals "and".
- A leading "The" is optional automatically (The Godfather == Godfather).
- Simple plurals (Apples -> Apple) and a single typo in words of 5+ letters are accepted automatically.
- With `people: true`, a surname alone is accepted when exactly one listed person has that surname.
- Digits are kept: "3 Idiots" and "Idiots" are different. Write titles the way they are officially written.

## Hard rules

1. ACCURACY FIRST. Every entry must be real and must genuinely belong to the category. Never invent,
   guess, or pad to reach a number. If you are not sure something is real or correctly spelled, leave it out.
   The target size in your brief is an aspiration for well-known categories; a smaller, correct list is better
   than a padded one. Do not write scripts that generate or combine entries mechanically.
2. One entry per distinct thing. No duplicates across tiers, no singular+plural pairs, no spelling variants as
   separate entries (use aliases). The linter rejects duplicates.
3. Each answer needs 2–30 letters/digits once spaces and punctuation are removed, and must contain a letter.
   Use the short, natural name people would actually type ("Taj Mahal", not "The Taj Mahal Mausoleum of Agra").
   No parentheses or explanatory suffixes.
4. Proper display spelling and capitalisation; this text is shown to players.
5. Family-friendly and neutral. No slurs, adult content, or insulting entries.
6. Where a category already exists in `lib/hidden-content.js` (the old 30 categories), read its old list and
   keep every old entry that is genuinely correct, but re-tier sensibly and DROP the wrong ones (the old list has
   mistakes such as non-members, truncated words and duplicates under other spellings).
7. Only create the files assigned to you, each with ONE Write call (rewrite the whole file if you must fix it).
   Do not edit any other file in the repository.

## Before you finish

Run `node scripts/lint-updraft-bank.mjs <id> <id> ...` from the project root for your categories and fix every
reported issue (for a duplicate, delete the copy in the rarer tier). Repeat until every line says `ok`.
Then report, per category, the final answer count and anything you deliberately left out or were unsure about.
