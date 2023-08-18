/** @type {import('tailwindcss').Config} */

const primary = '#FF397F';
const primaryDark = '#EB0052';
const gray = '#A6A6A6';
const lightGray = '#CACACA';

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      primary: '#FF397F',
      secondary: '#45CAFF',
      white: '#FAFAFA',
      gray,
      lightGray,
      black: '#0D0D0D',
      dark: '#272727',
      error: '#FF3434',
      button: {
        hoverBackgroundGray: lightGray,
        hoverBackgroundPrimary: primaryDark,
      },
    },
  },
  plugins: [],
};
