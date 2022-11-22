<script setup lang="ts">
  import { StoryData } from '@storyblok/vue/dist';

  const footerContent = useFooterContent().value;
  const blok = footerContent as StoryData;
</script>

<template>
  <div class="storyblok-footer">
    <component
      :is="$resolveStoryBlokComponent(blok)"
      v-if="blok.content"
      :blok="blok.content"
      :raw="blok"
    />
  </div>
</template>
