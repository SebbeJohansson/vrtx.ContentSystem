import { ISbStoryData } from '@storyblok/vue/dist';
import { PageMeta } from '~/interfaces/page';

export const usePageContent = () => useState<ISbStoryData>('pageContent', () => ({} as ISbStoryData));
export const usePageType = () => useState<string>('pageType', () => '');
export const usePagePreview = () => useState<boolean>('pagePreview', () => false);
export const usePageMeta = () => useState<PageMeta>('pageMeta', () => ({} as PageMeta));

export const acceptedPageTypes = ['content-page', 'blog-page', 'blog-post', 'blog-category'];

/* usePageFetch - Fetches content from storyblok. */
export const usePageFetch = async () => {
  const route = useRoute();
  const { locale } = useI18n();

  watch(() => route.path, async () => {
    await useStoryblokPageFetch(locale.value);
  });
  await useStoryblokPageFetch(locale.value);
};

export const useGetDynamicRoutes = async () => {
  await useStoryblokFetchDynamicRoutes();
};

export const usePageTypeCheck = () => {
  const layout = usePageType();
  const pagePreview = usePagePreview().value;

  if (!acceptedPageTypes.includes(layout.value) && !pagePreview) {
    // eslint-disable-next-line no-console
    console.error(`Page type ${layout.value} is not accepted`);
    layout.value = 'error';
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
  }
};
