<script setup lang="ts">
  defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <ContentColumnStructure
    v-editable="blok"
  >
    <component
      :is="$resolveStoryBlokComponent(block)"
      v-for="block in blok.content"
      :key="block._uid"
      :blok="block"
    />
  </ContentColumnStructure>
</template>
