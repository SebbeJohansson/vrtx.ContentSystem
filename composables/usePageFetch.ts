export const usePageContent = () => useState<object>('pageContent', () => ({}));
export const usePageType = () => useState<string>('pageType', () => '');
export const usePageSource = () => useState<string>('pageSource', () => '');

/* usePageFetch - Fetches content from sources. */
/* Currently only storyblok. */
export const usePageFetch = async () => {
  await useStoryblokPageFetch();
};
