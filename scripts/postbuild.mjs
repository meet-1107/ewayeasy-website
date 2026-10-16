// Removes internal cover-render pages and cover source crops from the production export.
// Set KEEP_COVERS=1 to keep them (needed only while running scripts/capture-covers.mjs).
import fs from 'node:fs';

if (process.env.KEEP_COVERS !== '1') {
  for (const p of ['out/cover', 'out/images/covers/src']) fs.rmSync(p, { recursive: true, force: true });
  for (const f of fs.existsSync('out') ? fs.readdirSync('out') : []) {
    if (/^cover(\.html|\.txt)?$/.test(f)) fs.rmSync(`out/${f}`, { recursive: true, force: true });
  }
  console.log('postbuild: removed internal cover pages from ./out');
}
