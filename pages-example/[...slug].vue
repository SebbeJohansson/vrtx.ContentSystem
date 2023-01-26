<script setup lang="ts">
  definePageMeta({
    // We use a custom solution for layouts since some features we need does not exist.
    layout: false,
  });

  try {
    console.log('normal page fetch');
    await usePageFetch();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  const layout = usePageType();
  const pageSource = usePageSource().value;
  const pageMeta = usePageMeta().value;

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
