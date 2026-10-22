// Font registration for the PDF renderer. The TTFs in /public/fonts are Noto Sans / Noto Serif
// (SIL Open Font License 1.1, see public/fonts/OFL.txt) and contain the ₹, €, £ and ¥ glyphs —
// the built-in PDF Helvetica cannot print ₹.
import { Font } from '@react-pdf/renderer';

export const PDF_FONT_FAMILY = { sans: 'EENotoSans', serif: 'EENotoSerif' } as const;

let registeredBase: string | null = null;

/**
 * Register fonts once. `base` is "/fonts" in the browser (served from public/) or an absolute
 * directory path when rendering in Node (tests).
 */
export function registerPdfFonts(base = '/fonts'): void {
  if (registeredBase === base) return;
  registeredBase = base;
  const b = base.replace(/[\\/]+$/, '');
  Font.register({
    family: PDF_FONT_FAMILY.sans,
    fonts: [
      { src: `${b}/NotoSans-Regular.ttf`, fontWeight: 400 },
      { src: `${b}/NotoSans-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.register({
    family: PDF_FONT_FAMILY.serif,
    fonts: [
      { src: `${b}/NotoSerif-Regular.ttf`, fontWeight: 400 },
      { src: `${b}/NotoSerif-Bold.ttf`, fontWeight: 700 },
    ],
  });
  // Keep normal words whole; only very long unbroken strings (URLs, references) are split so they wrap
  // instead of running off the page. Codes get zero-width break points instead (see breakable() in render.ts).
  Font.registerHyphenationCallback((word) => (word.length > 18 ? word.match(/.{1,12}/g) ?? [word] : [word]));
}
