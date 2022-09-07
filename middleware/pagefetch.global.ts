import { StoryData } from '@storyblok/vue/dist';

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Middleware: pagefetch.global.ts', to);

  const pageContent = usePageFetch();
  const pageType = usePageType();
  const pageSource = usePageSource();

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const story = ref({} as StoryData);

  if (isPreview) {
    // We are in preview so lets fetch it with the normal module.
    const storyblokApi = useStoryblokApi();
    storyblokApi.get(`cdn/stories/${route.path}`, {
      version,
    }).then((response) => {
      if (!response) { return; }
      story.value = response.data.story;
      pageContent.value = response.data.story;
    });
  } else {
    // Custom fetch for full static support.
    useStoryblokFetch(route.path, {
      version,
    }).then((response) => {
      if (!response) { return; }
      story.value = response.story;
      pageContent.value = response.story;
      console.log(response.story);
      pageType.value = response.story.content.component;
      pageSource.value = 'storyblok';
    });
  }
});
