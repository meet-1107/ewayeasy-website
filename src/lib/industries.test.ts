import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { INDUSTRIES } from './industries';
import { INDUSTRY_NAV } from './site';
import { INDUSTRY_PHOTOS } from './industry-photos';

const ROOT = path.resolve(__dirname, '..', '..');

describe('industries', () => {
  it('header dropdown matches the industry pages', () => {
    expect(INDUSTRY_NAV.map((n) => n.href)).toEqual(INDUSTRIES.map((i) => `/industries/${i.slug}`));
  });

  it('has unique, well-sized titles and descriptions', () => {
    const titles = new Set(INDUSTRIES.map((i) => i.seoTitle));
    const descs = new Set(INDUSTRIES.map((i) => i.metaDescription));
    expect(titles.size).toBe(INDUSTRIES.length);
    expect(descs.size).toBe(INDUSTRIES.length);
    for (const i of INDUSTRIES) {
      expect(i.seoTitle.length, i.slug).toBeLessThanOrEqual(60);
      expect(i.metaDescription.length, i.slug).toBeGreaterThanOrEqual(120);
      expect(i.metaDescription.length, i.slug).toBeLessThanOrEqual(165);
    }
  });

  it('has a photo for every industry', () => {
    for (const i of INDUSTRIES) {
      const p = INDUSTRY_PHOTOS[i.slug];
      expect(p, i.slug).toBeTruthy();
      expect(fs.existsSync(path.join(ROOT, 'public', p.src)), p.src).toBe(true);
    }
  });

  it('links only to tools that exist', () => {
    for (const i of INDUSTRIES) {
      for (const t of i.tools) {
        expect(fs.existsSync(path.join(ROOT, 'src', 'app', 'tools', t.slug)), `${i.slug} → ${t.slug}`).toBe(true);
      }
    }
  });

  it('never claims features the app does not have', () => {
    const text = JSON.stringify(INDUSTRIES.map((i) => i.appFit)).toLowerCase();
    expect(text).not.toMatch(/bulk generat|irn|e-invoice|multi-user|offline|ios|erp integration/);
  });
});
