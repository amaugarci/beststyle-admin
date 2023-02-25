/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      '2xl': '1366px',
      'xl': '1200px',
      'lg': '992px',
      'md': '768px',
      'sm': '640px',
      'xm': '576px'
    },
    extend: {
      backgroundImage:{
        'logo': "url('/img/logo.jpg')",
      }
    },
  },
  plugins: [],
}
