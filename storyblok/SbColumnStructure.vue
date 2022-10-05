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
    v-editable="blok"
    class="sb-column-structure"
  >
    <component
      :is="$resolveStoryBlokComponent(block)"
      v-for="block in blok.content"
      :key="block._uid"
      :blok="block"
    />
  </div>
</template>

<style scoped>
.sb-column-structure {
  padding: 0 0.5rem;
}
.sb-column-structure:first-child {
  padding-left: 0;
}
.sb-column-structure:last-child {
  padding-right: 0;
}
.sb-column-structure > * {
  height: 100%;
}
</style>
