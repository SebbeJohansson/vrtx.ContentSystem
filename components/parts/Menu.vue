<script setup lang="ts">
  await useMenuFetch();
  const menuSource = useMenuSource().value;
</script>

<template>
  <div class="menu">
    <SourcesStoryblokMenu v-if="menuSource === 'storyblok'" />
  </div>
</template>
