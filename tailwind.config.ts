import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Snagged brand palette
        brand: {
          navy: '#1B3553',     // primary dark — text, buttons, headings
          coral: '#E8806A',    // CTA coral/salmon
          teal: '#2E7FA5',     // secondary accent / water
          tealLight: '#7EC8D8',
          cream: '#EDE8DC',    // wordmark cream
          salmon: '#F5B4A0',   // hero background
          salmondark: '#E89480',
        },
        // Semantic game colours
        taken: '#E8806A',      // coral — "Snagged / taken"
        available: '#2E7FA5',  // teal — "Available"
        correct: '#2E7FA5',
        wrong: '#C0392B',
        // South Orange palette
        so: {
          green:      '#2D5016',  // deep forest green — primary brand
          greenLight: '#4A7A28',  // lighter green for hover
          cream:      '#FAF8F3',  // warm page background
          amber:      '#C49A2E',  // gold accent
          amberLight: '#E8BE5A',
          slate:      '#1A2332',  // dark text
          muted:      '#6B7280',  // secondary text
          border:     '#E5DDD0',  // card borders
        },
        // Surfaces
        game: {
          bg: '#FAF3EC',       // warm cream page bg
          card: '#FFFFFF',
          border: '#DDD5C8',
          muted: '#9BAAB8',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '65%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pop': {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.25s ease-out',
        'bounce-in': 'bounce-in 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'shake': 'shake 0.45s ease-in-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'pop': 'pop 0.3s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
