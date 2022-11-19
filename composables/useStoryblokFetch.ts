import { StoryData } from '@storyblok/vue/dist';

export interface Blok {
  story: StoryData;
  stories: StoryData[];
  cv: number,
}

export const useStoryblokPageFetch = async () => {
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

  await useAsyncStoryblok(currentRoute.path, {
    version,
    language: locale.value,
  }).then((response) => {
    if (!response) { return; }
    pageContent.value = response.value;
    pageType.value = response.value.content.component.substr(3);
    pageSource.value = 'storyblok';
  });
};

export const useStoryblokMenuFetch = async () => {
  const { locale } = useI18n();

  const menuContent = useMenuContent();
  const menuSource = useMenuSource();

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  await useAsyncStoryblok('menu', {
    version,
    language: locale.value,
  }).then((response) => {
    if (!response) { return; }
    menuContent.value = response.value;
    menuSource.value = 'storyblok';
  });
};

