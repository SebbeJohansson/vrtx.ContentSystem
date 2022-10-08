export default {
  locales: [
    {
      code: 'en',
      file: 'en.json',
    },
    {
      code: 'sv',
      file: 'sv.json',
      domain: 'dragon.revolutionrace.se',
    },
  ],
  defaultLocale: 'en',
  detectBrowserLanguage: false,
  differentDomains: true,
  // strategy: 'prefix',
  lazy: true,
  langDir: 'locales/',
};
