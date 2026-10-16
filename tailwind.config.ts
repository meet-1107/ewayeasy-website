import type { Config } from 'tailwindcss';

const config: Config = {
  content: { relative: true, files: ['./src/**/*.{ts,tsx}'] },
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', md: '1.5rem' }, screens: { '2xl': '1200px' } },
    extend: {
      colors: {
        brand: {
          50: '#EEF6F1', 100: '#D6EADF', 200: '#AED5C0', 300: '#7DB99A', 400: '#4C9874',
          500: '#2C7A57', 600: '#1E6346', 700: '#174F39', 800: '#123F2E', 900: '#0C2D21', 950: '#071C15',
        },
        amber: { 300: '#F6C873', 400: '#F0B550', 500: '#E5A243', 600: '#C9852A' },
        cream: '#F6F5F0',
        ink: { DEFAULT: '#16211C', soft: '#4A5A52', faint: '#7A8A82' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(12,45,33,.06), 0 8px 24px -12px rgba(12,45,33,.18)',
        lift: '0 24px 60px -20px rgba(12,45,33,.35)',
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
};
export default config;
