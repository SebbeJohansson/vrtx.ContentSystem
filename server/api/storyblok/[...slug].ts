import StoryBlokClient from 'storyblok-js-client';

let storyblokApiInstance = new StoryBlokClient({});
let hasStorblokClient = false;

export default defineEventHandler(async (event) => {
  if (!hasStorblokClient) {
    console.log('hasStorblokClient is false which means we dont have a proper storyblok api instance');
    const runtimeConfig = useRuntimeConfig();
    const storyblokConfig = runtimeConfig.public.storyblok as any; // Since not everything exists properly typed.
    const storyblokApiToken = storyblokConfig?.accessToken;
    const storyblokApiOptions = storyblokConfig?.apiOptions;
    console.log(storyblokApiToken);

    storyblokApiInstance = new StoryBlokClient(
      {
        ...storyblokApiOptions,
        accessToken: storyblokApiToken,
      },
    );
  } else {
    console.log('hasStorblokClient is true which means we have a proper storyblok api instance');
  }
  hasStorblokClient = true;

  const slug = event.context.params?.slug;
  const query = getQuery(event);
  console.log('url:', `cdn/stories/${slug}`);
  console.log('query: ', query);
  try {
    return await storyblokApiInstance.get(`cdn/stories/${slug}`, query);
  } catch (e) {
    const error = e as any;
    const errorResponse = error.response as any;
    console.log('error response: ', {
      status: errorResponse?.status || errorResponse?.statusCode || 500,
      statusText: errorResponse?.statusText || errorResponse?.statusMessage || errorResponse?.message || 'Something went wrong when fetching from storyblok.',
    });
    return {
      status: errorResponse?.status || errorResponse?.statusCode || 500,
      statusText: errorResponse?.statusText || errorResponse?.statusMessage || errorResponse?.message || 'Something went wrong when fetching from storyblok.',
    };
  }
});
