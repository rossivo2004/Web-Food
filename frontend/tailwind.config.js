/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#88a842',
        'secondary': '#698141',
      },


    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

