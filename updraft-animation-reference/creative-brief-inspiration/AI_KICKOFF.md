# Creative Brief for the AI

You're joining as lead creative technologist on **Updraft**, a browser trivia/word game. I want you
to use your own taste and judgment to make it feel like a living, cinematic experience.

## The goal (this is what matters)
Every answer the player gives should feel like a short, delightful **movie moment**. A character
in a hot air balloon looks directly at the player, as if the player is their co-pilot, and reacts
with real personality: elation when the player is right, a rueful smile and a gentle descent
when the balloon loses air, awe when they break through into a new sky. The world should feel
like it's rising or falling with the player's performance.

Think storybook warmth, a vintage-aeronaut sky ascent, and games that feel *alive* because of
small, well-timed details.

## The attached files
Files in this pack (`DESIGN.md`, `MOTION_SPEC.md`, `CLAUDE.md`, and optionally
`STEP4_CHARACTER_RIG_PROMPTS.md`) are **inspiration and one possible direction, not requirements**.
Read them to understand my taste and intent, then feel free to:
- Redesign the character, balloon, world, palette, tiers, naming and copy
- Invent better animation beats, camera moves, transitions and sound ideas
- Choose a different tech approach if it serves the result better
- Change the build order, structure and level of fidelity

If you improve on something in the files, just do it and tell me briefly what you changed and why.

## Guardrails (the only fixed rules)
1. **Originality:** all art, characters, names, copy and layout must be original. Do not imitate
   any existing game or franchise.
2. **Animation doesn't own game logic:** visuals react to game events; they never decide score,
   fuel or outcomes. Keep game logic separate and testable.
3. **Performance:** smooth on a mid-range phone (aim for 60fps). Pool particles, animate cheap
   properties, don't leak memory.
4. **Accessibility:** respect `prefers-reduced-motion`, keep text readable at every moment,
   make cinematics skippable, and don't use color alone to convey status.
5. **Kind failure:** losing is gentle and charming, never harsh.
6. **Tunable feel:** keep timings, colors and counts in one config so I can tweak them, and give
   me a small debug panel to trigger events and scrub altitude/fuel.

## How I'd like you to work
- Start with a short plan (a few lines): your creative direction, what you'll build first, and any
  big decision you want me to weigh in on. Then get building.
- Show me real things early (a running scene, a character moving) rather than long explanations.
- Check your own work: run it, look at screenshots, fix visible problems before reporting.
- Check in at meaningful milestones with: what you built, how to see it, and what you'd improve next.
- Ask questions only when a wrong guess would waste a lot of work; otherwise state your assumption
  and move on.
- Surprise me. If you have a better idea for a moment, a gesture, an effect or a mechanic reaction,
  try it.

## Things I'm open to your input on
- The character's name, look and personality
- Whether the art is built in code (SVG/canvas) or needs assets I should source
- Sound and music direction
- Any extra "movie-like" moments you think would make answers feel more special
