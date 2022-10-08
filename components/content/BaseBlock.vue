<script setup lang="ts">
  const props = defineProps({
    blockKey: {
      type: String,
      default: null,
    },
  });
  const blockClass = computed(() => `block--${props.blockKey}`);
</script>

<template>
  <div
    class="base-block"
    :class="blockClass"
  >
    <slot />
  </div>
</template>
