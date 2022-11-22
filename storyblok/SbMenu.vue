<script setup lang="ts">
  defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <ContentMenuContent
    v-if="blok.departments && Array.isArray(blok.departments) && blok.departments.length > 0"
    v-editable="blok"
    class="sb-menu"
  >
    <component
      :is="$resolveStoryBlokComponent(department)"
      v-for="department in blok.departments"
      :key="department._uid"
      :blok="department"
    />
  </ContentMenuContent>
</template>
