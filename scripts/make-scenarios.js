import { writeFileSync } from 'node:fs';

// Batches 1 to 10
import { batch1 } from './scenarios-part1.js';
import { batch2 } from './scenarios-part2.js';
import { batch3 } from './scenarios-part3.js';
import { batch4 } from './scenarios-part4.js';
import { batch5 } from './scenarios-part5.js';
import { batch6 } from './scenarios-part6.js';
import { batch7 } from './scenarios-part7.js';
import { batch8 } from './scenarios-part8.js';
import { batch9 } from './scenarios-part9.js';
import { batch10 } from './scenarios-part10.js';

const all = [
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
  ...batch6,
  ...batch7,
  ...batch8,
  ...batch9,
  ...batch10
];

console.log(`Total scenarios loaded: ${all.length}`);

// Validation
for (let i = 0; i < all.length; i++) {
  const [q, options] = all[i];
  if (!q.endsWith('?')) throw new Error(`Scenario ${i + 1} does not end with '?': ${q}`);
  if (options.length !== 9) throw new Error(`Scenario ${i + 1} (${q}) has ${options.length} options, expected 9`);
  const texts = new Set();
  for (const opt of options) {
    if (!opt.text || typeof opt.text !== 'string') throw new Error(`Scenario ${i + 1} option missing text`);
    if (!opt.image || !opt.image.startsWith('https://images.unsplash.com/')) {
      throw new Error(`Scenario ${i + 1} option ${opt.text} has invalid image: ${opt.image}`);
    }
    if (texts.has(opt.text)) throw new Error(`Scenario ${i + 1} has duplicate option: ${opt.text}`);
    texts.add(opt.text);
  }
}

const fileHeader = `// Auto-generated 100 Scenarios with 9 options & safe images for Trust Issues
// Every prompt ends in '?' and has exactly 9 options to support 8-player final rounds.

export const loneQuestions = ${JSON.stringify(all, null, 1)};
`;

writeFileSync('lone-scenarios.js', fileHeader, 'utf8');
console.log('Successfully generated lone-scenarios.js with 100 scenarios!');
