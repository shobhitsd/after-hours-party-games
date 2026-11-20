import { packedQuestions } from '../packed-content.js';

async function verifyAllLive() {
  const all = [];
  for (const [q, opts] of packedQuestions) {
    for (const opt of opts) {
      all.push({ q, text: opt.text, image: opt.image });
    }
  }

  console.log(`Starting live HTTP verification of all ${all.length} option images...`);
  const uniqueSet = new Set();
  const dupes = [];
  for (const item of all) {
    if (uniqueSet.has(item.image)) dupes.push(item);
    uniqueSet.add(item.image);
  }

  if (dupes.length > 0) {
    console.error(`FATAL: Found ${dupes.length} duplicates!`);
    process.exit(1);
  }
  console.log(`✅ Uniqueness check: ${uniqueSet.size}/${all.length} URLs are 100% unique.`);

  let bad = 0;
  let success = 0;
  const BATCH_SIZE = 8;

  for (let i = 0; i < all.length; i += BATCH_SIZE) {
    const chunk = all.slice(i, i + BATCH_SIZE);
    await Promise.all(chunk.map(async (item, idx) => {
      const overallIdx = i + idx + 1;
      try {
        const res = await fetch(item.image, {
          method: 'HEAD',
          headers: { 'User-Agent': 'PartyGamesApp/1.0 (contact@afterhours.party)' },
          redirect: 'follow',
          signal: AbortSignal.timeout(6000)
        });
        const ctype = res.headers.get('content-type') || '';
        if (res.status === 200 && ctype.startsWith('image/')) {
          success++;
        } else {
          console.error(`[#${overallIdx}] ❌ FAILED (${res.status}, ${ctype}): "${item.text}" -> ${item.image}`);
          bad++;
        }
      } catch(e) {
        console.error(`[#${overallIdx}] ❌ ERROR (${e.message}): "${item.text}" -> ${item.image}`);
        bad++;
      }
    }));
    process.stdout.write(`\rProgress: ${Math.min(i + BATCH_SIZE, all.length)}/${all.length} (OK: ${success}, Bad: ${bad})`);
    await new Promise(r => setTimeout(r, 60));
  }

  console.log('\n\n--- Live Verification Result ---');
  console.log(`Total URLs: ${all.length}`);
  console.log(`Unique URLs: ${uniqueSet.size}`);
  console.log(`Successful 200 OK Images: ${success}`);
  console.log(`Failed / Bad: ${bad}`);

  if (bad === 0) {
    console.log('🎉 100% PERFECT! All 360 options are valid images and unique!');
  } else {
    console.error(`⚠️ Need to fix ${bad} bad URLs.`);
    process.exit(1);
  }
}

verifyAllLive().catch(console.error);

