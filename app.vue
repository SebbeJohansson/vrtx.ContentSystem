<script setup lang="ts">
  await usePageFetch();

  const layout = usePageType().value;
  const pageSource = usePageSource().value;
</script>

<template>
  <div v-if="layout">
    <NuxtLayout :name="layout">
      <SourcesStoryblokPage v-if="pageSource === 'storyblok'" />
    </NuxtLayout>
  </div>
</template>
