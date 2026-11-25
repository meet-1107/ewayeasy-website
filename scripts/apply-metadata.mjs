// Applies the recommended variant from scripts/metadata-variants.mjs to each page's source.
import fs from 'node:fs';
import { PAGES } from './metadata-variants.mjs';

const q = (s) => JSON.stringify(s); // YAML double-quoted string is JSON-compatible for these texts
const log = [];

function setMd(file, title, desc, keepTitle) {
  let s = fs.readFileSync(file, 'utf8');
  if (!keepTitle) s = s.replace(/^seoTitle: .*$/m, `seoTitle: ${q(title)}`);
  s = s.replace(/^metaDescription: .*$/m, `metaDescription: ${q(desc)}`);
  fs.writeFileSync(file, s);
}

function setTs(file, oldTitle, title, desc) {
  let s = fs.readFileSync(file, 'utf8');
  const i = s.indexOf(oldTitle);
  if (i < 0) throw new Error(`Old title not found in ${file}: ${oldTitle}`);
  // Replace the title literal and the next description literal after it.
  const before = s.slice(0, i);
  let after = s.slice(i).replace(oldTitle, `'${title.replace(/'/g, "\\'")}'`);
  after = after.replace(/((?:description|metaDescription):\s*)'(?:[^'\\]|\\.)*'/, `$1'${desc.replace(/'/g, "\\'")}'`);
  fs.writeFileSync(file, before + after);
}

for (const p of PAGES) {
  const [title, desc] = p.v[p.pick];
  if (p.url === '/') {
    setTs('src/app/page.tsx', "'E-Way Easy: E-Way Bill Generator App for Mobile | Free Invoice'", title, desc);
  } else if (p.url === '/commercial-invoice-templates') {
    setTs('src/lib/templates/catalog.ts', "'Commercial Invoice Template & Format: Free, Printable PDF'", title, desc);
  } else if (p.url.startsWith('/blog/')) {
    setMd(`content/blog/${p.url.slice(6)}.md`, title, desc, p.keepTitle);
  } else {
    setMd(`content/guides/${p.url.slice(1)}.md`, title, desc, p.keepTitle);
  }
  log.push(`${p.url}  ->  ${p.keepTitle ? '(title kept)' : title}`);
}
console.log(log.join('\n'));
