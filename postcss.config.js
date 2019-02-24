const tailwindcss = require('tailwindcss')

module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-easy-import'),
    require('postcss-css-variables'),
    require('postcss-flexbugs-fixes'),
    // require('postcss-scss'),
    tailwindcss('./tailwind.js'),
    require('autoprefixer')
  ]
}
