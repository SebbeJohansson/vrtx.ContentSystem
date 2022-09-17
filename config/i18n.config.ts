export default {
  locales: [
    {
      code: 'en',
      file: 'en.ts',
      domain: 'localhost',
    },
    {
      code: 'sv',
      file: 'sv.ts',
      domain: 'dragon.revolutionrace.se',
    },
  ],
  defaultLocale: 'en',
  detectBrowserLanguage: false,
  differentDomains: true,
  // strategy: 'prefix',
  // lazy: true,
  langDir: 'translations/',
};
