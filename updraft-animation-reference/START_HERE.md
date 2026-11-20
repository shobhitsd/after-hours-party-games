# Updraft → Astra: animation & design handoff

**Purpose:** Give Astra in VS Code our latest *visual* prototype and a targeted brief to animate/design the **existing game**. The already-built game is the source of truth for rules and functionality; this folder is an animation reference, not a replacement app.

## In VS Code

1. Unzip this package into a separate folder such as `design-reference/updraft-astra-animation-handoff/` in a workspace alongside your **actual Updraft game**. Do not overwrite its `src/` or `index.html`.
2. Open the actual game folder and this handoff folder together in a VS Code workspace (File → Add Folder to Workspace…) so Astra can read both.
3. Paste the entire `ASTRA_PROMPT.md` into Astra chat. You can also attach or reference it using its file path.
4. Ask Astra to **inspect both projects**, map the existing game's answer events, and integrate one real correct-answer cinematic first. Require it to keep your gameplay logic and APIs untouched.

## Run the reference animation demo

Open `reference-prototype/updraft-play.html` in a modern browser, or from the `reference-prototype` folder run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`. Press **D** to open the Flight Director: trigger Correct, Wrong, Rare find, New sky, Soft landing, and scrub altitude without playing a round. The stand-alone HTML is a demo; the editable source lives in `reference-prototype/src/`.

## Sanity checks for the reference

From `reference-prototype`:

```bash
node --test tests/*.test.cjs
python build.py
```

No npm install is required for these. Browser automation scripts are provided but depend on Python Playwright and a local Chromium installation; they may need path adjustments on your machine.

## What's inside

- `ASTRA_PROMPT.md`: ready-to-paste prompt tailored for **visual-only integration**.
- `VISUAL_INTEGRATION_MAP.md`: source file ownership, event mapping, isolation boundaries, and visual acceptance tests.
- `reference-prototype/`: the entire editable Chapter VI reference plus a self-contained runnable build and unit tests.
- `previews/`: real captured screenshots/animation, not final production artwork.
- `creative-brief-inspiration/`: original kickoff and motion/design inspiration, not requirements to replace existing features.

**Important:** This package does **not** include your already-built external game repository. Astra needs access to that repository to integrate into it. This is the work from our ChatGPT visual collaboration through Chapter VI.
