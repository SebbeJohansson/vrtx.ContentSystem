<script setup lang="ts">
  defineProps({
    content: {
      required: true,
      type: Object as () => {} | undefined,
    },
  });
</script>

<template>
  <div>
    <component
      :is="$resolveStoryBlokComponent(block)"
      v-for="block in content"
      :key="block._uid"
      :blok="block"
    />
  </div>
</template>
