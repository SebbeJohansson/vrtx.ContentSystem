import type { FooterMenu } from '~/interfaces/menu';

export const useFooterContent = () => useState<FooterMenu>('footerContent', () => ({} as FooterMenu));

/* useFooterFetch - Fetches footer from storyblok. */
export const useFooterFetch = async () => {
  await useStoryblokFooterFetch();
};
