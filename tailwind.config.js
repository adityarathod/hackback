module.exports = {
  purge: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {},
    },
    fontFamily: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
