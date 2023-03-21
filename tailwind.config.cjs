/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      '2xl': '1600px',
      'xl': '1300px',
      'lg': '1200px',
      'md': '992px',
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
