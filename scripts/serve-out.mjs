// Minimal static server for previewing the production export in ./out (mirrors clean-URL hosting).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const PORT = Number(process.env.PORT || process.argv[2] || 4321);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml',
  '.txt': 'text/plain', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const safe = path.normalize(urlPath).replace(/^([/\\])+/, '');
  const base = path.join(OUT, safe);
  if (!base.startsWith(OUT)) { res.writeHead(403).end(); return; }
  const candidates = [base, `${base}.html`, path.join(base, 'index.html')];
  const file = candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
  if (!file) {
    const notFound = path.join(OUT, '404.html');
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    if (fs.existsSync(notFound)) fs.createReadStream(notFound).pipe(res);
    else res.end('Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).on('error', () => res.end()).pipe(res);
}).listen(PORT, () => console.log(`Serving ./out at http://localhost:${PORT}`));
