<script setup lang="ts">
  await usePageFetch();

  const layout = usePageType().value;
  const pageSource = usePageSource();
</script>

<template>
  <div v-if="layout">
    layout = {{ layout }}
    {{pageSource}}
    <NuxtLayout :name="layout">
      <SourcesStoryblokPage v-if="pageSource === 'storyblok'" />
    </NuxtLayout>
  </div>
</template>
