<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    v-if="blok.content && Array.isArray(blok.content) && blok.content.length > 0"
    v-editable="blok"
    class="sb-content-page"
  >
    <component
      :is="$resolveStoryBlokComponent(block)"
      v-for="block in blok.content"
      :key="block._uid"
      :blok="block.content"
    />
  </div>
</template>
