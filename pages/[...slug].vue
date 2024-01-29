<script setup lang="ts">
  try {
    // Fetch first page.

    // console.log('route:', route);
    // const pageContent = usePageContent();
    const pageType = usePageType();
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

      pageContent.value = response.value;

      pageType.value = response.value.content.component.substring(3);
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

  const layout = usePageType();
  const pageMeta = usePageMeta();

  usePageTypeCheck();

  const pageContent = usePageContent();
</script>

<template>
  <div v-if="layout" class="app">
    <Head>
      <Title>{{ pageMeta.title }}</Title>
      <Meta name="description" :content="pageMeta.description" />
    </Head>
    <NuxtLayout :name="layout" fallback="default">
      <component
        :is="$resolveStoryBlokComponent(pageContent)"
        v-if="pageContent.content"
        :blok="pageContent.content"
        :raw="pageContent"
      />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">

.app {
  font-family: $base-font;
}

</style>
