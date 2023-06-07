import { useStoryblokBridge } from '@storyblok/vue';
import type {
  ISbStoriesParams, StoryblokBridgeConfigV2, ISbStoryData, ISbError, ISbResult,
} from '@storyblok/vue';
import { stringify } from 'storyblok-js-client/source/helpers';

export const useCustomAsyncStoryblok = async (
  url: string,
  apiOptions: ISbStoriesParams = {},
  bridgeOptions: StoryblokBridgeConfigV2 = {},
) => {
  const uniqueKey = `${JSON.stringify(apiOptions)}${url}`;
  // const story = useState<ISbStoryData>(`${uniqueKey}-state`, () => ({} as ISbStoryData));
  const storyblokApiInstance = useStoryblokApi();

  // onMounted(() => {
  //   if (story.value && story.value.id) {
  //     useStoryblokBridge(
  //       story.value.id,
  //       evStory => (story.value = evStory),
  //       bridgeOptions,
  //     );
  //   }
  // });

  // const { data, error } = await useAsyncData<ISbResult, ISbError>(
  //   `${uniqueKey}-asyncdata`,
  //   () => storyblokApiInstance.get(`cdn/stories/${url}`, apiOptions),
  // );
  console.log('route: ', `/api/storyblok${url}?${stringify(apiOptions)}`);
  const { data, error } = await useAsyncData<ISbResult|ISbError>(
    `${uniqueKey}-asyncdata`,
    () => $fetch(`/api/storyblok/blog?${stringify(apiOptions)}`),
  );
  const storyblokData = data.value as ISbResult;
  const storyblokError = data.value as ISbError;
  console.log('data result:', data.value);
  const status = storyblokData?.data ? 200 : undefined || storyblokError?.response?.status || storyblokError?.status || (storyblokError as any)?.statusCode || 500;
  console.log(status);
  if (status >= 400 && status < 600) {
    const message = storyblokError?.message?.message || storyblokError?.message?.name || `${storyblokError?.message}` || 'Something went wrong when fetching from storyblok.';
    throw createError({ statusCode: status, statusMessage: message });
  }

  const story = toRef(storyblokData?.data.story, `${uniqueKey}-state`);
  console.log('story:', story);

  return story;
};
