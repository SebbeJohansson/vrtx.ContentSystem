interface PageMeta {
  title: string;
  description: string;
}

export const usePageContent = () => useState<object>('pageContent', () => ({}));
export const usePageType = () => useState<string>('pageType', () => '');
export const usePageSource = () => useState<string>('pageSource', () => '');
export const usePagePreview = () => useState<boolean>('pagePreview', () => false);
export const usePageMeta = () => useState<PageMeta>('pageMeta', () => ({} as PageMeta));

export const acceptedPageTypes = ['content-page', 'blog-page', 'blog-post'];

/* usePageFetch - Fetches content from sources. */
/* Currently only storyblok. */
export const usePageFetch = async () => {
  const route = useRoute();
  const currentPath = ref('');
  const { locale } = useI18n();

  await watchEffect(async () => {
    currentPath.value = route.fullPath;
    // TODO: Investigate if this is causing multiple fetches from storyblok.
    await useStoryblokPageFetch(locale.value);
  });
  await useStoryblokPageFetch(locale.value);
};

export const useGetDynamicRoutes = async () => {
  await useStoryblokFetchDynamicRoutes();
};

export const usePageTypeCheck = () => {
  const layout = usePageType();
  const pageSource = usePageSource().value;
  const pagePreview = usePagePreview().value;

  if (!pageSource) {
    layout.value = 'error';
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
  }
  if (!acceptedPageTypes.includes(layout.value) && !pagePreview) {
    // eslint-disable-next-line no-console
    console.error(`Page type ${layout.value} is not accepted`);
    layout.value = 'error';
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
  }
};
