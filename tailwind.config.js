const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      zIndex: {
        '-10': '-10',
      },
      colors: {
        'gray-1000': '#050505',
        'logo-gray': '#404040',
        yellow: colors.yellow,
        purple: colors.purple,
        blue: colors.blue,
        gray: colors.gray,
        red: colors.red,
        green: colors.green,
        pink: colors.pink,
        indigo: colors.indigo,
        white: '#fff',
      },
      lineClamp: {
        1: 1,
        2: 2,
        3: 3,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
