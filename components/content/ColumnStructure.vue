<script setup lang="ts">
  defineProps({
    blockKey: {
      type: String,
      required: true,
    },
    margins: {
      type: Object,
      default: null,
    },
  });
</script>

<template>
  <ContentBaseBlock
    class="column-structure"
    :block-key="blockKey"
    :margins="margins"
  >
    <slot />
  </ContentBaseBlock>
</template>

<style scoped>
.column-structure {
  padding: 0 0.5rem;
}
.column-structure:first-child {
  padding-left: 0;
}
.column-structure:last-child {
  padding-right: 0;
}
.column-structure > * {
  height: 100%;
}
</style>
