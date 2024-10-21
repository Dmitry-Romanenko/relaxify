/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './app/sound/[...enpointSlug].tsx',
    './components/**/*.{js,jsx,ts,tsx}',
    './utils/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1c1c1c',
        'bg-secondary': '#333333',
        'btn-bg': '#00838f',
        'tx-primary': '#FFFFFF',
        'tx-secondary': '#E0E0E0',
        'tx-silver': '#B0BEC5',
      },
      fontFamily: {
        mlight: ['Montserrat-Light', 'sans-serif'],
        mregular: ['Montserrat-Regular', 'sans-serif'],
        msemibold: ['Montserrat-SemiBold', 'sans-serif'],
        mbold: ['Montserrat-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
