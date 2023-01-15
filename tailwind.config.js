/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
    boxShadow:{
      menu: '-4px -6px 16px 0px'
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
}


