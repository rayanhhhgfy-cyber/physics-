/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#03040a',
        'electric-blue': '#4a9eff',
        'purple': '#a855f7',
        'orange': '#ff6b35',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
