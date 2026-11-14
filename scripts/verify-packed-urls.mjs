// scripts/verify-packed-urls.mjs
// Verifies an array of { text, image } questions
import fs from 'fs';

export async function verifyUrls(questions) {
  let total = 0, passed = 0, failed = [];
  const urls = new Map();
  
  for (let qIdx = 0; qIdx < questions.length; qIdx++) {
    const [title, opts] = questions[qIdx];
    for (let optIdx = 0; optIdx < opts.length; optIdx++) {
      const opt = opts[optIdx];
      total++;
      const u = typeof opt === 'string' ? '' : opt.image;
      if (!u) {
        failed.push({ q: title, text: opt.text || opt, reason: 'missing url' });
        continue;
      }
      urls.set(u, (urls.get(u) || []).concat({ q: title, text: opt.text }));
    }
  }

  console.log(`Checking ${urls.size} unique image URLs across ${total} options...`);

  const uniqueUrls = Array.from(urls.keys());
  const batchSize = 25;
  for (let i = 0; i < uniqueUrls.length; i += batchSize) {
    const chunk = uniqueUrls.slice(i, i + batchSize);
    await Promise.all(chunk.map(async u => {
      try {
        const res = await fetch(u, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (res.status === 200) {
          passed += urls.get(u).length;
        } else {
          failed.push({ url: u, status: res.status, usages: urls.get(u) });
        }
      } catch (err) {
        failed.push({ url: u, error: err.message, usages: urls.get(u) });
      }
    }));
  }

  console.log(`Verification finished: ${passed}/${total} options passed.`);
  if (failed.length > 0) {
    console.log(`Failed URLs count: ${failed.length}`);
    console.log(JSON.stringify(failed.slice(0, 10), null, 2));
  }
  return { total, passed, failed };
}
