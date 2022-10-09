<script setup lang="ts">
  const layout = usePageType().value;
  const pageSource = usePageSource();
  const { locale } = useI18n();
</script>

<template>
  <div>
    {{ locale }}
    <NuxtLayout :name="layout">
      <SourcesStoryblokPage v-if="pageSource === 'storyblok'" />
    </NuxtLayout>
  </div>
</template>
