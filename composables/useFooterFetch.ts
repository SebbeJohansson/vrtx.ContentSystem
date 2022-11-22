export const useFooterContent = () => useState<object>('footerContent', () => ({}));
export const useFooterSource = () => useState<string>('footerSource', () => '');

/* useFooterFetch - Fetches content from sources. */
/* Currently only storyblok. */
export const useFooterFetch = async () => {
  await useStoryblokFooterFetch();
};
