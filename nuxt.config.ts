// import dynamicRoutes from './helpers/dynamicRoutes';
import availableLocales from './locales/availableLocales';

// import i18nConfig from './config/i18n.config';

export default defineNuxtConfig({
  telemetry: false,

  // Disable servenr-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  runtimeConfig: {
    public: {
      STORYBLOK_API_TOKEN: process.env.STORYBLOK_API_TOKEN,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        {
          hid: 'gtm',
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_ID}');`,
          type: 'text/javascript',
        },
      ],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/index.css',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@storyblok/nuxt',
    'nuxt-jsonld',
    '@intlify/nuxt3',
    // '@nuxtjs/i18n', /* @nuxtjs/i18n is currently not supporting nuxt3 properly */
    // '@funken-studio/sitemap-nuxt-3',
  ],

  storyblok: {
    accessToken: process.env.STORYBLOK_API_TOKEN,
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      'postcss-custom-media': {
        importFrom: [
          {
            customMedia: {
              '--phone': '(max-width: 767px)',
              '--phoneAndTablet': '(max-width: 1023px)',
              '--tablet': '(min-width: 768px) and (max-width: 1023px)',
              '--tabletAndDesktop': '(min-width: 768px)',
              '--desktop': '(min-width: 1024px)',
            },
          },
        ],
      },
      autoprefixer: {
        overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/global-vars.scss";',
        },
      },
    },
  },

  // i18n: i18nConfig, /* @nuxtjs/i18n is currently not supporting nuxt3 properly */

  /* intlify instead of nuxt/i18n */
  /* https://github.com/nuxt-community/i18n-module/issues/1410#issuecomment-1192735679 */
  intlify: {
    vueI18n: {
      locale: availableLocales[0],
      fallbackLocale: availableLocales[0],
      availableLocales,
      sync: true,
    },
  },

  // sitemap: {
  //   hostname: 'https://sebbejohansson.com',
  //   gzip: true,
  //   cacheTime: 1,
  //   // routes: dynamicRoutes,
  //   defaults: {
  //     lastmod: new Date().toISOString(),
  //   },
  // },
});
