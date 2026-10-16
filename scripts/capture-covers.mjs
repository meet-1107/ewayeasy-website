// Captures /cover/<slug> pages as 1280×720 JPG covers using headless Edge or Chrome.
// Usage: build, start the preview server (`npm start`), then `node scripts/capture-covers.mjs [baseUrl]`.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const BASE = process.argv[2] || 'http://localhost:4321';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'images', 'covers');
const BROWSERS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
];
const browser = BROWSERS.find((b) => fs.existsSync(b));
if (!browser) { console.error('No Chrome/Edge found.'); process.exit(1); }

const src = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'covers.ts'), 'utf8');
const slugs = [...src.matchAll(/^\s+'([a-z0-9-]+)': \{/gm)].map((m) => m[1]);
const only = process.argv.slice(3);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'covers-'));

for (const slug of only.length ? only : slugs) {
  const png = path.join(tmp, `${slug}.png`);
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=1280,720', '--virtual-time-budget=4000', `--user-data-dir=${path.join(tmp, 'profile')}`,
    `--screenshot=${png}`, `${BASE}/cover/${slug}`,
  ], { stdio: 'ignore' });
  await sharp(png).resize(1280, 720, { fit: 'cover', position: 'top' }).jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(OUT, `${slug}.jpg`));
  console.log('✓', slug);
}
fs.rmSync(tmp, { recursive: true, force: true });
