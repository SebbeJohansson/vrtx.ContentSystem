interface PageMeta {
  title: string;
}

export const usePageContent = () => useState<object>('pageContent', () => ({}));
export const usePageType = () => useState<string>('pageType', () => '');
export const usePageSource = () => useState<string>('pageSource', () => '');
export const usePagePreview = () => useState<boolean>('pagePreview', () => false);
export const usePageMeta = () => useState<PageMeta>('pageMeta', () => ({} as PageMeta));

export const acceptedPageTypes = ['content-page'];

/* usePageFetch - Fetches content from sources. */
/* Currently only storyblok. */
export const usePageFetch = async () => {
  await useStoryblokPageFetch();
};

export const useGetDynamicRoutes = async () => {
  await useStoryblokFetchDynamicRoutes();
};
