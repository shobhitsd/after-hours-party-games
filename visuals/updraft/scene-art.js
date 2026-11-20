import {miriArt} from './miri-art.js';
export function sceneArt(){return `<section class="ud-scene" aria-label="Miri Quill and your storybook sky" data-shot="still" data-pose="soft">
 <div class="ud-atmosphere" aria-hidden="true"><div class="ud-sky-current"></div><div class="ud-sky-previous"></div><div class="ud-stars">✦ <span>·</span> ✧ <span>·</span> ✦ <span>·</span> ✧</div><div class="ud-sun"></div><div class="ud-warmth"></div></div>
 <div class="ud-scene-heading"><span>UPDRAFT · A LITTLE FLIGHT OF WONDER</span><strong class="ud-sky-name">First Light</strong></div>
 <div class="ud-happy-place" aria-hidden="true"><div class="ud-happy-rays"></div><div class="ud-happy-sun"></div><svg class="ud-birds" viewBox="0 0 300 90"><g fill="none" stroke="#62899e" stroke-width="3" stroke-linecap="round"><path d="M20 30q12-14 24 0 12-14 24 0M135 55q9-10 18 0 9-10 18 0M215 20q14-16 28 0 14-16 28 0"/></g></svg></div>
 <div class="ud-camera" aria-hidden="true">
  <div class="ud-light-shafts"></div><div class="ud-coolth"></div>
  <svg class="ud-air-trails" viewBox="0 0 500 500" preserveAspectRatio="none"><g fill="none" stroke="#fff8e8" stroke-width="2" stroke-linecap="round"><path d="M65 110v80m0 28v15M410 190v90m0 22v15M100 325v55M380 65v60"/><path d="M42 290q35-17 59 0m270 60q35-17 59 0" stroke-width="1"/></g></svg>
  <svg class="ud-hills" viewBox="0 0 900 220" preserveAspectRatio="none"><path d="M0 120Q140 12 320 110T650 90T900 95V220H0" fill="#c5b4a8"/><path d="M0 170Q180 85 380 160T700 130T900 150V220H0" fill="#a6b5aa"/><path d="M0 210Q160 170 340 192T660 175T900 187V220H0" fill="#8d9f98"/></svg>
  <div class="ud-clouds ud-clouds-far"><i></i><i></i><i></i></div>
  <div class="ud-afterimages"></div>
  <div class="ud-balloon-position"><div class="ud-balloon-drift">${miriArt('ud-full')}</div></div>
  <div class="ud-particles"></div>
  <div class="ud-clouds ud-clouds-near"><i></i><i></i></div>
  <svg class="ud-kite" viewBox="0 0 100 160"><path d="m50 4 34 42-34 45-34-45Z" fill="#e5aa8e"/><path d="m50 4 0 87-34-45Z" fill="#fae3b5"/><path d="M50 91q-20 25 0 40t-9 27" fill="none" stroke="#a28a86" stroke-width="2"/><path d="m45 114-9-5 3 12 6-7 8-4 0 10Z" fill="#94b8b0"/></svg>
 </div>
 <div class="ud-closeup" aria-hidden="true"><div class="ud-portrait-halo"></div><div class="ud-portrait">${miriArt('ud-portrait',true)}</div><span>A MOMENT WITH MIRI</span></div>
 <div class="ud-caption" aria-hidden="true"></div>
 <div class="ud-dialogue"><span>MIRI QUILL <i>your co-pilot</i></span><p class="ud-line" role="status" aria-live="polite">Well, hello there. Shall we see what the sky is hiding?</p></div>
 <div class="ud-scene-tools"><button type="button" data-ud-wave aria-label="Wave to Miri">Wave hello ♡</button><button type="button" data-ud-skip hidden>Skip scene →</button><button type="button" data-ud-motion aria-pressed="true" aria-label="Turn cinematic motion off">Motion on</button></div>
 <details class="ud-director" hidden><summary>Flight director · visuals only</summary><p>Preview a moment without changing your game.</p><div>${['correct','wrong','rare','sky','landing','celebrate','wave'].map(kind=>`<button type="button" data-ud-demo="${kind}">${kind==='sky'?'New sky':kind}</button>`).join('')}</div><label>Preview sky <input data-ud-altitude type="range" min="0" max="4600" value="0" step="100"></label><button type="button" data-ud-reset>Return to actual flight</button><output class="ud-debug-status">idle</output></details>
 </section>`;}
