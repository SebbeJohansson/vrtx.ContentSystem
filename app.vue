<script setup lang="ts">

  try {
    await usePageFetch();
  } catch (e) {
    console.log(e);
  }

  let layout = usePageType().value;
  const pageSource = usePageSource().value;
  const pagePreview = usePagePreview().value;
  const pageMeta = usePageMeta().value;

  if ((!acceptedPageTypes.includes(layout) || !pageSource) && !pagePreview) {
    layout = 'error';
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
  }
</script>

<template>
  <div v-if="layout" class="app">
    {{ pageMeta }}
    <Head>
      <Title>{{ pageMeta.title }}</Title>
      <Meta name="description" content="My app description" />
    </Head>
    <NuxtLayout :name="layout">
      <SourcesStoryblokPage v-if="pageSource === 'storyblok'" />
    </NuxtLayout>
  </div>
</template>
