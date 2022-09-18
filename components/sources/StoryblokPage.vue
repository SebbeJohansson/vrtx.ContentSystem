<script setup lang="ts">
import { StoryData } from '@storyblok/vue/dist';

const pageContent = usePageContent();
const blok = pageContent.value as StoryData;
</script>

<template>
  <div>
    <component
      :is="$resolveStoryBlokComponent(blok)"
      v-if="blok.content"
      :blok="blok.content"
      :raw="blok"
    />
  </div>
</template>
