/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./**/*.{html,js}"],
  safelist: [
    // these can be generated in a shortcode and wont be picked up correctly without safelisting them
    'grid-cols-none',
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8',
    'grid-cols-9',
    'grid-cols-10',
    'grid-cols-11',
    'grid-cols-12'
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['calling-code', ...defaultTheme.fontFamily.mono],
        'serif': ['minion-pro-display', ...defaultTheme.fontFamily.serif],
        'sans': ['futura-pt', ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content : ''},
            'code::after': { content : ''},
            'blockquote p:first-of-type::before': { content: ''}, 
            'blockquote p:last-of-type::after': { content: ''}
          }
        }
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
      orange: "#DB5A35",
      codebg: "#2e3440",
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
}
