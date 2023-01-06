import { FooterMenu } from "./useContent";

export const useFooterContent = () => useState<FooterMenu>('footerContent', () => ({} as FooterMenu));
export const useFooterSource = () => useState<string>('footerSource', () => '');

/* useFooterFetch - Fetches content from sources. */
/* Currently only storyblok. */
export const useFooterFetch = async () => {
  await useStoryblokFooterFetch();
};
