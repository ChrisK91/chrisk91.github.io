/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['source-sans-pro', ...defaultTheme.fontFamily.mono],
        'serif': ['minion-pro-display', ...defaultTheme.fontFamily.serif],
        'sans': ['futura-pt', ...defaultTheme.fontFamily.sans],
      }
    },
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      bluedark: "#132A3D",
      bluemedium: "#214457",
      lightgreen: "#9CCBB2",
      lightyellow: "#F0D69B",
      orange: "#DB5A35"
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
