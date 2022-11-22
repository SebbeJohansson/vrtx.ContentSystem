<script setup lang="ts">

  try {
    await usePageFetch();
  } catch (e) {
    console.log(e);
  }

  const acceptedPageTypes = ['content-page'];

  let layout = usePageType().value;
  const pageSource = usePageSource().value;
  const pagePreview = usePagePreview().value;

  console.log(pagePreview);

  if ((!acceptedPageTypes.includes(layout) || !pageSource) && !pagePreview) {
    console.log('redirecting to 404');
    layout = 'error';
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
  }
</script>

<template>
  <div v-if="layout" class="app">
    <NuxtLayout :name="layout">
      <SourcesStoryblokPage v-if="pageSource === 'storyblok'" />
    </NuxtLayout>
  </div>
</template>
