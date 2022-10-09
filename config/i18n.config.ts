export default {
  locales: [
    {
      code: 'en',
      file: 'en.json',
    },
    {
      code: 'sv',
      file: 'sv.json',
      // domain: 'dragon.revolutionrace.se',
    },
  ],
  defaultLocale: 'sv',
  detectBrowserLanguage: false, /* {
    useCookie: true,
    cookieKey: 'lang',
    alwaysRedirect: true,
    fallbackLocale: 'en',
  }, */
  // differentDomains: true, // DifferentDomains are not supported in nuxt3.
  strategy: 'prefix_and_default',
  lazy: true, // Lazy is not fully supported in nuxt3. Changing language is not working with cookie.
  langDir: 'locales/',
};
