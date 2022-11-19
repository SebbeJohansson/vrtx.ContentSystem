<script setup lang="ts">
  defineProps({
    internalLink: {
      type: String,
      default: null,
    },
    externalLink: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  });

</script>

<template>
  <div
    class="menu-department"
  >
    {{ title }}
    <slot />
  </div>
</template>

<style scoped>
</style>
