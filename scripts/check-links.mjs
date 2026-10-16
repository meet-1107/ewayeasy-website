// Crawls the static export in ./out and reports internal links that point to missing pages.
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('out');
if (!fs.existsSync(OUT)) { console.error('Run `npm run build` first.'); process.exit(1); }
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : files.push(p); } })(OUT);
const exists = (href) => {
  const clean = decodeURI(href.split('#')[0].split('?')[0]).replace(/\/$/, '') || '/';
  if (clean === '/') return fs.existsSync(path.join(OUT, 'index.html'));
  const p = path.join(OUT, clean);
  return fs.existsSync(p) || fs.existsSync(p + '.html') || fs.existsSync(path.join(p, 'index.html'));
};
const broken = new Map();
let checked = 0;
for (const f of files.filter((x) => x.endsWith('.html'))) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith('/_next') || href.startsWith('//')) continue;
    checked++;
    if (!exists(href)) {
      const page = '/' + path.relative(OUT, f).split(path.sep).join('/');
      if (!broken.has(href)) broken.set(href, new Set());
      broken.get(href).add(page);
    }
  }
}
console.log(`Checked ${checked} internal links across ${files.filter((x) => x.endsWith('.html')).length} pages.`);
if (broken.size) {
  for (const [href, pages] of broken) console.log(`BROKEN ${href}  ←  ${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? ` (+${pages.size - 3})` : ''}`);
  process.exit(1);
}
console.log('No broken internal links.');
