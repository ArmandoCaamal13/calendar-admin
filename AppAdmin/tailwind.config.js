/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    './src/**/*.{js,cjs,mjs,ts}'
  ],
  variants: {
    active: true
  },
  theme: {
    extend: {},
  },
  plugins: [],
});

