/* eslint-disable import/no-duplicates */
import { ISbStoryData } from '@storyblok/vue/dist';
import { apiPlugin } from '@storyblok/vue';

import { acceptedPageTypes } from './usePageFetch';

export interface Blok {
  story: ISbStoryData;
  stories: ISbStoryData[];
  cv: number,
}

export const useStoryblokRawFetchStories = async (storyblokApiToken: string, params?: any) => {
  const { storyblokApi } = apiPlugin({ apiOptions: { accessToken: storyblokApiToken } });

  let pages = 0;
  const stories: ISbStoryData[] = [];
  const pageInfo = await storyblokApi.get('cdn/stories/', params);

  stories.push(...(pageInfo.data.stories as ISbStoryData[]));
  const { total } = pageInfo.headers;
  const perPage = pageInfo.headers.per_page || total > 25 ? 25 : null;

  if (perPage) {
    pages = Math.ceil(total / perPage);
  }

  for (let page = 2; page <= pages; page += 1) {
    const pageInfo2 = await storyblokApi.get('cdn/stories/', {
      ...params,
      page,
    });
    stories.push(...(pageInfo2.data.stories as ISbStoryData[]));
  }

  return stories;
};

export const useStoryblokRawFetchDynamicRoutes = async (storyblokApiToken: string) => {
  const data = await useStoryblokRawFetchStories(
    storyblokApiToken,
    {
      version: 'published',
      filter_query: {
        component: {
          in: acceptedPageTypes.map(pageType => `sb-${pageType}`).join(','),
        },
      },
    },
  );
  return data.map(story => story.path || `/${story.slug}` || `/${story.full_slug}`) as string[];
};
