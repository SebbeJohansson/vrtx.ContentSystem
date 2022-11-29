import { StoryData } from '@storyblok/vue/dist';
// eslint-disable-next-line import/no-duplicates
import { apiPlugin } from '@storyblok/vue';

export interface Blok {
  story: StoryData;
  stories: StoryData[];
  cv: number,
}

export const useStoryblokRawFetchStories = async (params?: any) => {
  const config = useRuntimeConfig();
  const { storyblokApi } = apiPlugin({ apiOptions: { accessToken: config.public.STORYBLOK_API_TOKEN } });

  let pages = 0;
  const stories: StoryData[] = [];

  const pageInfo = await storyblokApi.get('cdn/stories/', {
    version: 'published',
    filter_query: {
      component: {
        in: 'sb-content-page',
      },
    },
  });

  stories.push(...(pageInfo.data.stories as StoryData[]));
  console.log(pageInfo.data.stories);
  const { total } = pageInfo.headers;
  const perPage = pageInfo.headers.per_page || total > 25 ? 25 : null;

  if (perPage) {
    pages = Math.ceil(total / perPage);
  }

  for (let page = 2; page <= pages; page += 1) {
    const pageInfo2 = await storyblokApi.get('cdn/stories/', {
      version: 'published',
      page,
    });
    stories.push(...(pageInfo2.data.stories as StoryData[]));
  }

  return stories;
};

export const useStoryblokRawFetchDynamicRoutes = async () => {
  const data = await useStoryblokRawFetchStories({
    version: 'published',
    filter_query: {
      component: {
        in: ['content-page'].join(','),
      },
    },
  });
  return data.map(story => story.path || `/${story.full_slug}`);
};
