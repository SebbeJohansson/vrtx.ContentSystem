import { StoryData } from '@storyblok/vue/dist';
import { useContext } from 'unctx/index';
import { useSSRContext } from 'vue';

// import { Blok } from '~/composables/useStoryblokFetch';

// Should i move this to a composable that is used in app.vue? That way maybe useAsyncStoryblok and useNuxtApp().$i18n.locale.value works as expected.
export default defineNuxtRouteMiddleware(async (to) => {
  const pageContent = usePageContent();
  const pageType = usePageType();
  const pageSource = usePageSource();
  // const { locale } = useI18n();

  console.log(useNuxtApp().$i18n);

  const locale = useNuxtApp().$i18n.locale.value;

  const currentRoute = { ...to };
  console.log(currentRoute.path);
  const localeString = `/${locale}`;
  if (currentRoute.path.startsWith(localeString)) {
    currentRoute.path = currentRoute.path.slice(localeString.length);
  }
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
      // console.log(response.story);
      pageType.value = response.story.content.component.substr(3);
      pageSource.value = 'storyblok';
    });
  }
});
