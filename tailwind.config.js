module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.ts'
    ],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      tableLayout: ['hover'],
    },
    backgroundColor: ['checked', 'hover', 'dark']
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
