import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const localesDir = path.resolve(fileURLToPath(new URL('../src/locales', import.meta.url)));

function flatten(obj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...flatten(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const files = readdirSync(localesDir).filter((f) => f.endsWith('.json'));
if (files.length < 2) {
  console.error(`Expected at least 2 locale files in ${localesDir}, found ${files.length}.`);
  process.exit(1);
}

const keySets = {};
for (const file of files) {
  const locale = file.replace(/\.json$/, '');
  const content = JSON.parse(readFileSync(path.join(localesDir, file), 'utf-8'));
  keySets[locale] = new Set(flatten(content));
}

const locales = Object.keys(keySets);
let ok = true;

for (let i = 0; i < locales.length; i++) {
  for (let j = 0; j < locales.length; j++) {
    if (i === j) continue;
    const a = locales[i];
    const b = locales[j];
    const missingInB = [...keySets[a]].filter((k) => !keySets[b].has(k));
    if (missingInB.length > 0) {
      ok = false;
      console.error(`\nKeys present in "${a}.json" but missing from "${b}.json":`);
      for (const k of missingInB) console.error(`  - ${k}`);
    }
  }
}

if (!ok) {
  console.error('\ni18n:check failed — locale files are out of sync.\n');
  process.exit(1);
}

const total = keySets[locales[0]].size;
console.log(`i18n:check passed — ${locales.length} locales (${locales.join(', ')}), ${total} keys each, in sync.`);
