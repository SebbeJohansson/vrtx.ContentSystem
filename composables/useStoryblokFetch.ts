import { StoryData } from '@storyblok/vue/dist';

export interface Blok {
  story: StoryData;
  stories: StoryData[];
  cv: number,
}

export const useGetAcceptedStoryblokPageTypes = () => acceptedPageTypes.map(pageType => `sb-${pageType}`);

export const useStoryblokPageFetch = async () => {
  const { locale } = useI18n();

  const pageContent = usePageContent();
  const pageType = usePageType();
  const pageSource = usePageSource();
  const pagePreview = usePagePreview();
  const pageMeta = usePageMeta();

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
  pagePreview.value = isPreview;

  console.log(currentRoute);
  await useStoryblok(currentRoute.path, {
    version,
    language: locale.value,
  }).then((response) => {
    console.log(response.value.content.component.substring(3));
    if (!response) { return; }
    pageContent.value = response.value;
    pageType.value = response.value.content.component.substring(3);
    pageSource.value = 'storyblok';
    pageMeta.value.title = response.value.content.title;
    pageMeta.value.description = response.value.content.description;
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

export const useStoryblokFooterFetch = async () => {
  const { locale } = useI18n();

  const footerContent = useFooterContent();
  const footerSource = useFooterSource();

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  await useAsyncStoryblok('footer', {
    version,
    language: locale.value,
  }).then((response) => {
    if (!response) { return; }
    footerContent.value = response.value;
    footerSource.value = 'storyblok';
  });
};

export const useStoryblokFetchStories = async (slug?: '', params?: {}) => {
  const storyblokApi = useStoryblokApi();
  let result = {} as Blok;
  try {
    const { data } = await useAsyncData(
      `storyblok-fetch-${slug}-${new URLSearchParams(JSON.stringify(params))}`,
      async () => {
        let pages = 0;
        const stories: StoryData[] = [];

        await storyblokApi.get(`cdn/stories/${slug}`, params).then((res) => {
          if (!res.data) { return; }
          if (res.data.story) {
            stories.push(res.data.story);
          } else {
            const { total } = res.headers;
            const perPage = res.headers.per_page || total > 25 ? 25 : null;

            if (perPage) {
              pages = Math.ceil(total / perPage);
            }

            stories.push(...(res.data.stories as StoryData[]));
          }
        });

        for (let page = 2; page <= pages; page += 1) {
          // eslint-disable-next-line no-await-in-loop
          await storyblokApi.get(`cdn/stories/${slug}`, params).then((res) => {
            stories.push(...(res.data.stories as StoryData[]));
          });
        }

        return {
          stories,
          story: stories[0],
        };
      },
    );
    result = data.value as Blok;
  } catch (error) {
    console.error(error);
  }
  return result;
};

export const useStoryblokFetchDynamicRoutes = async () => {
  const data = await useStoryblokFetchStories('', {
    version: 'published',
    filter_query: {
      component: {
        in: useGetAcceptedStoryblokPageTypes().join(','),
      },
    },
  });
  return data.stories.map(story => `/${story.full_slug}`);
};
