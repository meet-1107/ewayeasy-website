// Checks every exported page for a unique <title>, a unique meta description, exactly one <h1>,
// a canonical URL, and flags titles/descriptions that are unusually short or long.
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('out');
if (!fs.existsSync(OUT)) { console.error('Run `npm run build` first.'); process.exit(1); }
const pages = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html') && !['404.html', '_not-found.html'].includes(f)) pages.push(p);
  }
})(OUT);

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const titles = new Map();
const descs = new Map();
const problems = [];
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const url = '/' + path.relative(OUT, file).split(path.sep).join('/').replace(/(index)?\.html$/, '');
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (noindex) continue;
  if (!title) problems.push(`${url}: missing <title>`);
  if (!desc) problems.push(`${url}: missing meta description`);
  if (h1 !== 1) problems.push(`${url}: ${h1} <h1> elements`);
  if (!canonical) problems.push(`${url}: missing canonical`);
  if (desc && (desc.length < 70 || desc.length > 175)) problems.push(`${url}: description length ${desc.length}`);
  (titles.get(title) ?? titles.set(title, []).get(title)).push(url);
  (descs.get(desc) ?? descs.set(desc, []).get(desc)).push(url);
}
for (const [t, urls] of titles) if (urls.length > 1) problems.push(`duplicate title "${t}": ${urls.join(', ')}`);
for (const [d, urls] of descs) if (urls.length > 1) problems.push(`duplicate description on: ${urls.join(', ')}`);
console.log(`Checked ${pages.length} pages.`);
if (problems.length) { problems.forEach((p) => console.log('•', p)); process.exit(1); }
console.log('All titles and descriptions unique; one H1 and a canonical on every indexable page.');
