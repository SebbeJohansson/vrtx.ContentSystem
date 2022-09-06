import { defineNuxtConfig } from '@nuxt/bridge';
import axios from 'axios';
import { StoryblokVue, useStoryblokBridge, useStoryblokApi } from '@storyblok/nuxt-2';

import i18nConfig from './config/i18n.config';

export default defineNuxtConfig({
  // bridge: false, // Temporarily disable bridge integration
  bridge: {
    meta: true,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/bridge',
    ['@storyblok/nuxt-2/module', { accessToken: 'liEdsDqa1r20DQlvJHQbzgtt' }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  hooks: {
    'nitro:config': async function (nitroConfig) {
      console.log(nitroConfig);
      if (nitroConfig.dev) { return; }
      // ..Async logic..
      nitroConfig.prerender.routes.push('/custom');
      console.log(nitroConfig.prerender.routes);
      axios.get('https://api.storyblok.com/v2/cdn/stories?token=liEdsDqa1r20DQlvJHQbzgtt&version=published').then((res) => res.data.stories.map((story) => story.slug));
    },
  },

  generate: {
    // routes: async () => { // add async here
    //   /* const client = contentful.createClient(config);

    //   const blogRoutes = await client // add await here
    //     .getEntries({
    //       content_type: 'blogPost',
    //     })
    //     .then((response) => response.items.map(
    //       (entry) => `/blog/${entry.fields.slug}`,
    //     ));
    //   const collectionRoutes = await client // add await here
    //     .getEntries({
    //       content_type: 'collection',
    //     })
    //     .then((response) => response.items.map(
    //       (entry) => `/collections/${entry.fields.slug}`,
    //     )); */

    //   // const storyblokApi = useStoryblokApi();
    //   // const { data } = await storyblokApi.get(`cdn/stories`, {
    //   //   version: "draft",
    //   // });
    //   // await storyblokApi.get('cdn/stories', {
    //   //   version: 'published',
    //   //   filter_query: {
    //   //     component: {
    //   //       any_in_array: 'content-page,blog-page',
    //   //     },
    //   //   },
    //   // }).then(({ data }) => {
    //   // });

    //   const routes = [/* ...blogRoutes, ...collectionRoutes */]; // return a single array of strings

    //   return routes;
    // },

    /* routes() {
      console.log(axios);
      return axios.get('https://api.storyblok.com/v2/cdn/stories?token=liEdsDqa1r20DQlvJHQbzgtt&version=published').then((res) => res.data.stories.map((story) => story.slug));
    }, */
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  /*  build: {
    extend(config, context) {
      if (context.isServer && process.env.NODE_ENV !== 'development') {
        const client = new useStoryblokApi.StoryblokClient({
          accessToken: process.env.STORYBLOK_ACCESSTOKEN,
        });

        // Render BlockPage
        client.get('cdn/stories', {
          version: 'published',
          filter_query: {
            component: {
              in: 'BlockPage',
            },
          },
        }).then(({ data }) => {
          data.stories.forEach((detailPage) => {
            const path = detailPage.path || `/${detailPage.slug}`;
            this.buildContext.options.generate.routes.push(path);
          });
        });
      }
    },
  }, */

  i18n: i18nConfig,
});
