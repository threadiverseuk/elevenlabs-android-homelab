import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rotom: {
          bg: '#0a1022',
          panel: '#121a33',
          accent: '#46b6ff',
          warning: '#ffa94d',
        },
      },
      boxShadow: {
        glow: '0 0 0 2px rgba(70,182,255,0.4), 0 0 24px rgba(70,182,255,0.35)',
      },
    },
  },
  plugins: [],
} satisfies Config;
