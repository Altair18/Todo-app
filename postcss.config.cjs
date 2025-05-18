// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},   // <-- use the new adapter here
    autoprefixer: {},
  }
}
