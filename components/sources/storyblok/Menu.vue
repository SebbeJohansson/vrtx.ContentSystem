<script setup lang="ts">
  import { StoryData } from '@storyblok/vue/dist';

  const menuContent = useMenuContent().value;
  const blok = menuContent as StoryData;
</script>

<template>
  <div class="storyblok-menu">
    <component
      :is="$resolveStoryBlokComponent(blok)"
      v-if="blok.content"
      :blok="blok.content"
      :raw="blok"
    />
  </div>
</template>
