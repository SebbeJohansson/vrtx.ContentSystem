<script setup lang="ts">
  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
  const margins = computed(() => props.blok.margins);
</script>

<template>
  <ContentColumnStructure
    v-editable="blok"
    :block-key="blok._uid"
    :margin="margins"
  >
    <component
      :is="$resolveStoryBlokComponent(block)"
      v-for="block in blok.content"
      :key="block._uid"
      :blok="block"
    />
  </ContentColumnStructure>
</template>
