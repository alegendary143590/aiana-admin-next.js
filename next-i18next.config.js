const path = require('path');

module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'es', 'fr'],
    localeDetection: false, // Enable or disable automatic locale detection
    // Optional: use locale subpaths (e.g., /en, /fr)
    localePath: path.resolve('./public/locales')
  },
}
