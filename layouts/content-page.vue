<script setup>
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
  <LayoutsDefaultLayout class="content-page" :class="pageClasses">
    <slot />
  </LayoutsDefaultLayout>
</template>
