import type { ISbStoryData } from '@storyblok/vue/dist';
import type { MenuDepartment, HeaderMenu } from '~/interfaces/menu';

export interface Blok {
  story: ISbStoryData;
  stories: ISbStoryData[];
  cv: number,
}

export const useGetAcceptedStoryblokPageTypes = () => acceptedPageTypes.map(pageType => `sb-${pageType}`);

function menuDepartmentMapper(storyblokDepartment: any) {
  let link;
  if (storyblokDepartment.link.id !== '' && storyblokDepartment.link.linktype === 'story') {
    link = `${storyblokDepartment.link.cached_url ?? storyblokDepartment.link.url ?? storyblokDepartment.link.link}`;
  }
  if (storyblokDepartment.link.linktype === 'url') {
    link = `${storyblokDepartment.link.url ?? storyblokDepartment.link.link}`;
  }
  return {
    key: storyblokDepartment._uid,
    title: storyblokDepartment.title,
    slug: link,
    target: storyblokDepartment.link.target,
    sub_departments: storyblokDepartment.sub_departments.map((subDepartment: any) => menuDepartmentMapper(subDepartment)),
    content: storyblokDepartment.content,
  } as MenuDepartment;
}

export const useStoryblokMenuFetch = async () => {
  const { locale } = useI18n();

  const menuContent = useMenuContent();

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  await useAsyncStoryblok('menu', {
    version,
    language: locale.value,
  }).then((response) => {
    if (!response) { return; }

    const departments = response.value.content.departments.map((department: any) => menuDepartmentMapper(department)) as MenuDepartment[];
    const headerMenu = { departments } as HeaderMenu;

    menuContent.value = headerMenu;
  });
};

export const useStoryblokFooterFetch = async () => {
  const { locale } = useI18n();

  const footerContent = useFooterContent();

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  await useAsyncStoryblok('footer', {
    version,
    language: locale.value,
  }).then((response) => {
    if (!response) { return; }

    const departments = response.value.content.departments.map((department: any) => menuDepartmentMapper(department)) as MenuDepartment[];
    const footerMenu = { departments } as FooterMenu;

    footerContent.value = footerMenu;
  });
};

export const useStoryblokBlogPostFetch = async (version: string, categories: ISbStoryData[]) => {
  const params = {
    version,
    content_type: 'sb-blog-post',
    ...categories.length > 0
      ? {
        filter_query: {
          categories: {
            any_in_array: categories.map(category => category.uuid).join(','),
          },
        },
      }
      : {},
  };
  const data = await useStoryblokFetchStories('', params);
  return data.stories as ISbStoryData[];
};

export const useStoryblokFetchStories = async (slug?: '', params?: {}) => {
  const storyblokApi = useStoryblokApi();
  let result = {} as Blok;
  try {
    const { data } = await useAsyncData(
      `storyblok-fetch-${slug}-${new URLSearchParams(JSON.stringify(params))}`,
      async () => {
        let pages = 0;
        const stories: ISbStoryData[] = [];

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

            stories.push(...(res.data.stories as ISbStoryData[]));
          }
        });

        for (let page = 2; page <= pages; page += 1) {
          // eslint-disable-next-line no-await-in-loop
          await storyblokApi.get(`cdn/stories/${slug}`, params).then((res) => {
            stories.push(...(res.data.stories as ISbStoryData[]));
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
    // eslint-disable-next-line no-console
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

export const useStoryblokMakeLinkSafe = (link: string, language: string) => {
  if (link.startsWith(language)) {
    return link.slice(language.length);
  }
  return link;
};
