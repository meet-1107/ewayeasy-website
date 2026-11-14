// Tells Bing (and other IndexNow engines) which URLs were added, changed or removed since the last run.
// Runs after `firebase deploy` (npm run deploy:firebase). Usage: node scripts/indexnow.mjs [--dry-run] [--all]
// State (URL -> lastmod) is kept in .indexnow-state.json so only real changes are sent.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'out');
const STATE = path.join(ROOT, '.indexnow-state.json');
const args = new Set(process.argv.slice(2));

const env = fs.readFileSync(path.join(ROOT, '.env.production'), 'utf8');
const SITE = (env.match(/^NEXT_PUBLIC_SITE_URL=(.+)$/m)?.[1] ?? '').trim().replace(/\/$/, '');
const keyFile = fs.readdirSync(path.join(ROOT, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!SITE || !keyFile) { console.error('indexnow: missing NEXT_PUBLIC_SITE_URL or public/<key>.txt'); process.exit(1); }
const KEY = keyFile.replace('.txt', '');
const keyLocation = `${SITE}/${keyFile}`;

// Current URLs and lastmod values from the built sitemaps.
const now = {};
for (const f of fs.readdirSync(OUT).filter((f) => /^sitemap-.+\.xml$/.test(f))) {
  const xml = fs.readFileSync(path.join(OUT, f), 'utf8');
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (loc) now[loc] = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '';
  }
}
const before = !args.has('--all') && fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
const changed = Object.keys(now).filter((u) => before[u] === undefined || before[u] !== now[u]);
const removed = Object.keys(before).filter((u) => !(u in now));
const urlList = [...changed, ...removed];

console.log(`indexnow: ${changed.length} new/changed, ${removed.length} removed (${Object.keys(now).length} URLs in sitemaps)`);
if (!urlList.length) process.exit(0);
if (args.has('--dry-run')) { console.log(urlList.join('\n')); process.exit(0); }

// The key file must be live on the site, or the engines reject the submission (403).
const live = await fetch(keyLocation).then((r) => (r.ok ? r.text() : '')).catch(() => '');
if (live.trim() !== KEY) {
  console.error(`indexnow: ${keyLocation} is not live yet (deploy first). Nothing sent.`);
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation, urlList: urlList.slice(0, 10000) }),
});
console.log(`indexnow: HTTP ${res.status} ${res.statusText}`);
if (res.status === 200 || res.status === 202) {
  fs.writeFileSync(STATE, JSON.stringify(now, null, 2) + '\n');
  console.log('indexnow: state saved; next run sends only changes.');
} else {
  console.error(await res.text().catch(() => ''));
  process.exit(1);
}
