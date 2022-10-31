import { StoryData } from '@storyblok/vue/dist';

export interface Blok {
  story: StoryData;
  stories: StoryData[];
  cv: number,
}

export const useStoryblokFetch = async () => {

  console.log("use storyblok fetch");

  const { locale } = useI18n();

  const pageContent = usePageContent();
  const pageType = usePageType();
  const pageSource = usePageSource();

  const route = useRoute();

  const currentRoute = { ...route };
  const localeString = `/${locale.value}`;
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
      language: locale.value,
    }).then((response) => {
      if (!response) { return; }
      pageContent.value = response.value;
      pageType.value = response.value.content.component.substr(3);
      console.log(pageType.value);
      pageSource.value = 'storyblok';
    });
  } else {
    await useAsyncStoryblok(currentRoute.path, {
      version,
      language: locale.value,
    }).then((response) => {
      if (!response) { return; }
      pageContent.value = response.value;
      pageType.value = response.value.content.component.substr(3);
      pageSource.value = 'storyblok';
    });
  }
};

