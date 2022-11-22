export const useMenuContent = () => useState<object>('menuContent', () => ({}));
export const useMenuSource = () => useState<string>('menuSource', () => '');

/* useMenuFetch - Fetches content from sources. */
/* Currently only storyblok. */
export const useMenuFetch = async () => {
  await useStoryblokMenuFetch();
};
