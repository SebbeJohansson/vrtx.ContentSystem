<script setup lang="ts">
  defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
  const pageMeta = usePageMeta();

  const pageClasses = computed(() => {
    const classes = [];

    if (pageMeta.value.seamless_header) {
      classes.push('content-page--seamless-header');
    }

    return classes;
  });
</script>

<template>
  <div
    v-if="blok.content && Array.isArray(blok.content) && blok.content.length > 0"
    v-editable="blok"
    class="sb-content-page"
    :class="pageClasses"
  >
    <component
      :is="$resolveStoryBlokComponent(block)"
      v-for="block in blok.content"
      :key="block._uid"
      :blok="block"
    />
  </div>
</template>
