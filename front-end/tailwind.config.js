/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
extend: {
      colors: {
        customCyan: '#58f6f8',
      },
    },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

