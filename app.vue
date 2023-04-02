<script setup lang="ts">
  definePageMeta({
    // We use a custom solution for layouts since some features we need does not exist.
    layout: false,
  });

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
    <NuxtLayout :name="layout">
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
