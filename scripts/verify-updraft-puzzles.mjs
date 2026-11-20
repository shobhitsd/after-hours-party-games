import rows from '../lib/hidden-puzzles.js';
import { normalize } from '../lib/hidden-bank-tools.js';

console.log(`Checking ${rows.length} puzzles...`);

const seenAnswers = new Map();
const seenIds = new Set();
const issues = [];

for (let i = 0; i < rows.length; i++) {
  const [id, answer, category, explanation, hint, aliases = []] = rows[i];
  const canon = normalize(answer);

  if (seenIds.has(id)) {
    issues.push(`Row ${i} (${id}): Duplicate id`);
  }
  seenIds.add(id);

  if (seenAnswers.has(canon)) {
    issues.push(`Row ${i} (${id} - ${answer}): Duplicate canonical answer of row ${seenAnswers.get(canon)}`);
  }
  seenAnswers.set(canon, i);

  if (!answer || answer.length < 3) issues.push(`Row ${i} (${id}): Answer too short: "${answer}"`);
  if (!category) issues.push(`Row ${i} (${id}): Missing category`);
  if (!explanation) issues.push(`Row ${i} (${id}): Missing explanation`);
  if (!hint) issues.push(`Row ${i} (${id}): Missing hint`);

  if (/[^A-Za-z -]/.test(answer)) {
    issues.push(`Row ${i} (${id}): Invalid characters in answer: "${answer}"`);
  }

  // Check aliases
  for (const alias of aliases) {
    if (/[^A-Za-z0-9 -]/.test(alias)) {
      issues.push(`Row ${i} (${id} - ${answer}): Invalid character in alias "${alias}"`);
    }
    if (normalize(alias) === canon) {
      issues.push(`Row ${i} (${id} - ${answer}): Alias "${alias}" normalizes to same as answer`);
    }
  }

  // Check hint giveaway
  const words = answer.split(/[ -]/).map(normalize);
  const normHint = normalize(hint);
  for (const w of words) {
    if (w.length > 3 && normHint.includes(w)) {
      issues.push(`Row ${i} (${id} - ${answer}): Hint contains word "${w}" -> "${hint}"`);
    }
  }
}

console.log(`Puzzles audit complete. Found ${issues.length} issues.`);
if (issues.length) {
  for (const iss of issues) console.log(' - ' + iss);
}
