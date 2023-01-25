<script setup lang="ts">
  try {
    // Fetch first page.
    await usePageFetch();
    // Fetch menu.
    await useMenuFetch();
    // Fetch footer.
    await useFooterFetch();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  const layout = usePageType();
  const pageSource = usePageSource();
  const pageMeta = usePageMeta();

  usePageTypeCheck();
</script>

<template>
  <div v-if="layout" class="app">
    <Head>
      <Title>{{ pageMeta.title }}</Title>
      <Meta name="description" :content="pageMeta.description" />
    </Head>
    <NuxtLayout :name="layout">
      <SourcesStoryblokPage v-if="pageSource === 'storyblok'" />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">

.app {
  font-family: $base-font;
}

</style>
