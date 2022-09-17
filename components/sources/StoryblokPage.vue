<script setup lang="ts">
import { StoryData } from '@storyblok/vue/dist';

const pageContent = usePageContent();
console.log("storyblok page: ", pageContent);
const blok = pageContent.value as StoryData;

</script>

<template>
  <div>
    {{ blok }}
    <component
      :is="$resolveStoryBlokComponent(blok)"
      v-if="blok.content"
      :blok="blok.content"
      :raw="blok"
    />
  </div>
</template>
