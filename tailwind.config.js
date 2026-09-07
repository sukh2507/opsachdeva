/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        bodoni: ['Bodoni Moda', '"Bodoni 72"', 'serif'],
      },
      // Deep maroon + gold palette lifted from OP Sachdeva & Party's
      // brochure, paired with the site's existing cream/white base.
      colors: {
        maroon: {
          50: '#fbeeee',
          100: '#f3d6d8',
          300: '#c98a90',
          500: '#8a1f2b',
          600: '#6e1621',
          700: '#57121a',
          800: '#420d14',
          900: '#2d080d',
        },
        gold: {
          400: '#d9b565',
          500: '#c9a24a',
          600: '#b3893a',
        },
      },
    },
  },
  plugins: [],
}