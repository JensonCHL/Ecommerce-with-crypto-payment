/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'black-70': 'rgba(0, 0, 0, 0.7)',
      },
      
    },
  },
  plugins: [],
}