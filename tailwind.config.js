/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfcf7',
          100: '#faf6ed',
          200: '#f5edd9',
          300: '#eddfc0',
          400: '#dfc69a',
          500: '#d4ae7a',
          600: '#c19865',
          700: '#a67c52',
          800: '#8a6647',
          900: '#71533b',
        },
        botanical: {
          50: '#f6f9f5',
          100: '#e9f2e6',
          200: '#d4e5cf',
          300: '#b0d1a8',
          400: '#87b67c',
          500: '#659b5b',
          600: '#4e7d45',
          700: '#3f6237',
          800: '#354f2f',
          900: '#2d4228',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

