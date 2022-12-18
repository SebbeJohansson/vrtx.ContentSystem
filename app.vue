<script setup lang="ts">

  try {
    await usePageFetch();
  } catch (e) {
    console.log(e);
  }

  const layout = usePageType();
  const pageSource = usePageSource().value;
  const pagePreview = usePagePreview().value;
  const pageMeta = usePageMeta().value;

  if ((!acceptedPageTypes.includes(layout.value) || !pageSource) && !pagePreview) {
    layout.value = 'error';
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
  }
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
