import { StoryData } from '@storyblok/vue/dist';

// import { Blok } from '~/composables/useStoryblokFetch';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('Middleware: pagefetch.global.ts', to);

  const pageContent = usePageContent();
  const pageType = usePageType();
  const pageSource = usePageSource();

  const currentRoute = { ...useRoute() };
  if (currentRoute.path === '/') {
    currentRoute.path = 'index';
  }

  const isPreview = !!(currentRoute.query._storyblok && currentRoute.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  // const story = ref({} as StoryData);

  if (isPreview) {
    // We are in preview so lets fetch it with the normal module.
    /* const storyblokApi = useStoryblokApi();
    await storyblokApi.get(`cdn/stories/${currentRoute.path}`, {
      version,
    }).then((response) => {
      if (!response) { return; }
      // story.value = response.data.story;
      pageContent.value = response.data as Blok;
    }); */

    // We are in preview so lets fetch it with the normal module.
    await useStoryblok(currentRoute.path, {
      version,
      resolve_relations: 'blog-entry.categories',
    }).then((response) => {
      if (!response) { return; }
      pageContent.value = response.value;
    });
  } else {
    // Custom fetch for full static support.
    await useStoryblokFetch(currentRoute.path, {
      version,
    }).then((response) => {
      if (!response) { return; }
      // story.value = response.story;
      pageContent.value = response.story as StoryData;
      console.log(response.story);
      pageType.value = response.story.content.component;
      pageSource.value = 'storyblok';
    });
  }
});
