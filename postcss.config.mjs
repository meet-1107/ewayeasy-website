import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
// Explicit config path so builds work no matter which directory they are started from.
export default { plugins: { tailwindcss: { config: path.join(dir, 'tailwind.config.ts') }, autoprefixer: {} } };
