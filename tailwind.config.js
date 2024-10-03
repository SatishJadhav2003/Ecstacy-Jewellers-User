/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#b89c55', // Gold color matching the navbar
          600: '#a87c45',
          700: '#806135',
        },
      },
    },
  },
  plugins: [],
}