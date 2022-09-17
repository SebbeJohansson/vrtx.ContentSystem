<script setup lang="ts">
const layout = usePageType().value;
const pageSource = usePageSource();
</script>

<template>
  <div>
    <NuxtLayout :name="layout">
      <SourcesStoryblokPage v-if="pageSource === 'storyblok'" />
    </NuxtLayout>
  </div>
</template>
