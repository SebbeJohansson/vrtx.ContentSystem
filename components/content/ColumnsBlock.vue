<script setup lang="ts">
  const props = defineProps({
    design: {
      type: String,
      default: null,
    },
  });
  const blockClasses = computed(() => {
    const classes = [];
    if (props.design) {
      classes.push(`columns-block--design-${props.design}`);
    }
    return classes;
  });
</script>

<template>
  <div
    class="columns-block"
    :class="blockClasses"
  >
    <div class="columns-block__margin">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.columns-block {
  overflow: hidden;
  width: 100%;
  @include content-width();
}

.columns-block__margin {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
.columns-block--design-center .columns-block__margin {
  display: flex;
  justify-content: center;
}

@media (--phone) {
  .columns-block__margin {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
