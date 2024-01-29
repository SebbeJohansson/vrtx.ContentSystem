<script setup lang="ts">
  import type { ISbStoryData } from '@storyblok/vue/dist';

  const pageContent = ref({} as ISbStoryData);
  const pageType = ref('');

  try {
    const pagePreview = usePagePreview();
    const pageMeta = usePageMeta();

    const { locale } = useI18n();

    const route = useRoute();

    // const currentRoute = { ...route };
    let currentPath = route.path;
    console.log('route path:', currentPath);
    console.log('locale:', locale.value);
    const localeString = `/${locale}`;
    if (currentPath.startsWith(localeString)) {
      currentPath = currentPath.slice(localeString.length);
    }
    if (currentPath === '/') {
      currentPath = 'index';
    }

    const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
    const version = isPreview ? 'draft' : 'published';
    pagePreview.value = isPreview;

    await useAsyncStoryblok(currentPath, {
      version,
      language: locale.value,
      resolve_relations: 'sb-blog-page.categories,sb-blog-post.categories,sb-blog-post.author',
    }).then((response) => {
      if (!response) { return; }
      console.log('response:', response.value.content);
      pageContent.value = response.value;

      usePageType().value = response.value.content.component.substring(3);
      pageMeta.value.title = response.value.content.title;
      pageMeta.value.description = response.value.content.description;
      pageMeta.value.seamless_header = response.value.content.seamless_header;
    });
    // // Fetch menu.
    // await useMenuFetch();
    // // Fetch footer.
    // await useFooterFetch();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  const pageMeta = usePageMeta();

  usePageTypeCheck();
</script>

<template>
  <div class="app">
    <Head>
      <Title>{{ pageMeta.title }}</Title>
      <Meta name="description" :content="pageMeta.description" />
    </Head>
    <StoryblokComponent :blok="pageContent.content" :raw="pageContent" />
  </div>
</template>

<style lang="scss">

.app {
  font-family: $base-font;
}

</style>
