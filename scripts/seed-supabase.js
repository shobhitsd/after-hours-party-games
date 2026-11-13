// Script to seed all 100 scenarios and 900 options into Supabase
// Run with: node scripts/seed-supabase.js [--sql]

import fs from 'fs';
import path from 'path';
import { loneQuestions } from '../lone-scenarios.js';

const isSqlMode = process.argv.includes('--sql');
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

function escapeSql(str) {
  return String(str || '').replace(/'/g, "''");
}

async function generateSqlSeed() {
  console.log(`Generating SQL seed for ${loneQuestions.length} scenarios...`);
  const lines = [
    '-- Supabase Seed Data for Trust Issues (100 Scenarios & 900 Options)',
    '-- Generated automatically',
    'BEGIN;',
    ''
  ];

  for (let sIdx = 0; sIdx < loneQuestions.length; sIdx++) {
    const [prompt, options] = loneQuestions[sIdx];
    const isVip = sIdx >= 25; // First 25 are Free; remaining 75 are VIP Host Pass
    const isNsfw = false;
    const category = sIdx < 20 ? 'icebreaker' : sIdx < 50 ? 'dilemma' : sIdx < 75 ? 'spicy' : 'hypothetical';

    const scenarioVar = `scenario_${sIdx}`;
    lines.push(`-- Scenario ${sIdx + 1}: ${prompt.slice(0, 40)}...`);
    lines.push(`WITH ins_s AS (`);
    lines.push(`  INSERT INTO scenarios (game_slug, prompt, category, is_vip, is_nsfw)`);
    lines.push(`  VALUES ('lone', '${escapeSql(prompt)}', '${category}', ${isVip}, ${isNsfw})`);
    lines.push(`  RETURNING id`);
    lines.push(`)`);
    lines.push(`INSERT INTO scenario_options (scenario_id, text, image_url, order_index)`);
    lines.push(`SELECT ins_s.id, opt.text, opt.image_url, opt.order_index`);
    lines.push(`FROM ins_s, (VALUES`);

    const optValues = options.map((opt, oIdx) => {
      const text = typeof opt === 'object' ? opt.text : opt;
      const img = typeof opt === 'object' ? opt.image : null;
      return `  ('${escapeSql(text)}', '${escapeSql(img)}', ${oIdx})`;
    }).join(',\n');

    lines.push(optValues);
    lines.push(`) AS opt(text, image_url, order_index);`);
    lines.push('');
  }

  lines.push('COMMIT;');

  const outPath = path.resolve('supabase', 'seed.sql');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`Generated seed SQL at: ${outPath} (${lines.length} lines)`);
}

async function seedDirectly() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log('No SUPABASE_URL or SUPABASE_KEY found in environment.');
    console.log('Generating seed.sql instead. Run with --sql to regenerate anytime.');
    return generateSqlSeed();
  }

  console.log(`Uploading ${loneQuestions.length} scenarios directly to Supabase (${SUPABASE_URL})...`);
  let uploaded = 0;

  for (let sIdx = 0; sIdx < loneQuestions.length; sIdx++) {
    const [prompt, options] = loneQuestions[sIdx];
    const isVip = sIdx >= 25;

    // 1. Insert scenario
    const sRes = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/scenarios`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        game_slug: 'lone',
        prompt,
        category: sIdx < 25 ? 'free_pack' : 'vip_host_pass',
        is_vip: isVip,
        is_nsfw: false
      })
    });

    if (!sRes.ok) {
      console.warn(`Failed to insert scenario ${sIdx + 1}:`, await sRes.text());
      continue;
    }

    const [savedScenario] = await sRes.json();

    // 2. Insert options
    const optPayload = options.map((opt, oIdx) => ({
      scenario_id: savedScenario.id,
      text: typeof opt === 'object' ? opt.text : opt,
      image_url: typeof opt === 'object' ? opt.image : null,
      order_index: oIdx
    }));

    const optRes = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/scenario_options`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(optPayload)
    });

    if (optRes.ok) uploaded++;
  }

  console.log(`Successfully uploaded ${uploaded} / ${loneQuestions.length} scenarios to Supabase!`);
}

if (isSqlMode) {
  generateSqlSeed();
} else {
  seedDirectly();
}
