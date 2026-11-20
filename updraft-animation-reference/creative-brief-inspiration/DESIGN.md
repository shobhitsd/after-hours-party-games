# Updraft: Design Bible

> Inspiration and direction, not a spec. Keep the spirit (warm vintage-aeronaut sky ascent, a character who
> acts to the player, kind failure). Feel free to invent better visuals, names, gestures and moments.

## 1. Concept
A skyward trivia/word game. Launch a hot air balloon flight; every smart answer and correct
letter lifts you higher into the atmosphere.

- **Tagline:** "Let your imagination take a little flight."
- **Framing:** "Turn trivia into letters. Turn letters into a lightbulb moment. Five rounds, one mystery, and a sky full of possibilities."
- **Tone:** warm, storybook, optimistic. Whimsical, never childish. Failure is gentle.

## 2. Mechanics mapping
| Mechanic | Theme | Details |
|---|---|---|
| Score | Altitude, 10m per point | Altimeter `▲ 450m ALT` pulses and climbs on score |
| Tiers | Altitude milestones | Breeze Level, Cloud Surfer, High Thermal, Stratosphere, Aurora Orbit |
| Lives | Burner Fuel (6) | Capsule icons; at 0 the flight lands safely |
| Letter probe | Letter Launch | Tapped letter becomes a token that floats up into the slipstream |
| Wrong guess | Turbulence | Panel tremor, `-1 Fuel` or `-2 Fuel` vents steam |
| Rarity | Thermal Discoveries | Common 🪶 steady breezes, Uncommon 🌤️ warm thermals, Rare ⚡ pristine high-altitude air, Deep Cut 🌟 stratospheric wonders |
| Flow | Flight stages | "Start a flight", "Your Flight Log", "The Final Approach", "A bright landing at the launchpad" |

## 3. Altitude tiers (starting thresholds, tune in config)
| Tier | Altitude | Sky | Clouds | Stars | Notes |
|---|---|---|---|---|---|
| Breeze Level | 0-199m | Peach and coral dawn into soft lavender | Many, low, close | 0 | Low warm sun, rooftops and hills far below |
| Cloud Surfer | 200-499m | Periwinkle `#deedff` into lavender | Dense banks at eye level | 0 | Paper planes appear |
| High Thermal | 500-899m | Sunlit gold `#ffd487` rays into soft blue | Thinning | faint | Light shafts, wind wisps |
| Stratosphere | 900-1499m | Deep blue into indigo | Almost none | many | Air feels thin and quiet |
| Aurora Orbit | 1500m+ | Twilight indigo | None | dense | Aurora ribbons, shooting stars |

## 4. Palette
- Periwinkle `#deedff`
- Sunlit gold `#ffd487`
- Warm peach / coral (pick 2 shades in config)
- Soft lavender (pick 2 shades)
- Deep twilight indigo (for contrast and UI text on light skies)
- Balloon stripes: coral, cream and teal accents. Wicker: warm tan.
Contrast rule: UI text must stay readable at every tier (use panel backgrounds with a subtle blur, not raw text on sky).

## 5. The character: "[NAME TBD, e.g. Captain Wick]"
A charming vintage aeronaut: leather cap, brass goggles pushed up on the forehead, long
scarf, waistcoat, rolled sleeves. Stands in a wicker basket. **Always faces the player**
and treats them as a co-pilot (fourth-wall aware).

**Personality:** warm, curious, a little vain, quick to laugh at himself. Encouraging when
the player does well, comically anxious in turbulence, gracious in defeat.

**Expressions:** calm, delighted, awe, smug, nervous, panicked, relieved, determined, rueful.
**Gestures:** thumbs up, tips cap, wipes brow, shrugs, points at altimeter, taps fuel gauge,
holds up a letter token, grips basket rim, waves, bows.
**Idle:** breathing, blinking every 2-5s, scarf flutter, basket sway, occasional glance at player.

**Direct address rule:** at least one beat per round must include eye contact with the player
(a glance, a wink, a shrug). Don't overdo it. Roughly 1 in 3 events.

## 6. The balloon
- Striped envelope (coral, cream, teal), rope rigging, wicker basket, brass burner, fuel gauge
- **Inflation is tied to fuel:** 6 fuel = fully round, 0 = limp. Never snaps, always eases.
- Burner flame flares on lift and on fuel spend. Ropes tense and slacken with motion.

## 7. Atmosphere accents
Soft drifting clouds, paper planes, wind wisps, sunbeam flashes on correct tiles, birds at low
tiers only, aurora ribbons and shooting stars at the top.

## 8. Cinematic language
Slight camera push-ins, brief letterbox bars on big moments only, parallax speed changes with
lift, gentle screen shake for turbulence, warm light flashes for discoveries, soft vignette
during tension. Reserve slow-motion for Deep Cut discoveries and the out-of-fuel landing.

## 9. Audio
- Ambient wind: low and muffled near the ground, clearer and airier as altitude climbs
- Burner whoosh on lift, rope creak on sway, brass-bell chime ladder by rarity
- Music: warm acoustic bed (e.g. plucked strings and soft piano) that adds layers by tier; a tension layer at low fuel
- Low-pass filter on ambience decreases with altitude
- Provide a mute toggle and respect autoplay policies (start audio on first tap)

## 10. Copy style
Short, warm, slightly nautical-aviation. Examples: "Steady as she goes", "Warm thermal ahead",
"Easy on the burner", "Clear skies", "A bright landing". Avoid sarcasm and avoid shaming the player.

## 11. Originality checklist
- [ ] Character, balloon and all assets drawn or licensed by us
- [ ] Layout and UI are our own, not copied from any other game
- [ ] Names, tiers and copy are our own
- [ ] Fonts and audio are properly licensed (note licenses in `/docs/licenses.md`)
