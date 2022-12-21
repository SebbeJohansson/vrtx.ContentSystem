<script setup lang="ts">
  const props = defineProps({
    blockKey: {
      type: String,
      default: null,
    },
    margins: {
      type: Object,
      default: null,
    },
  });
  const blockClass = computed(() => `block--${props.blockKey}`);

  const blockCss = computed(() => {
    const css = {};
    console.log(props.margins);
    if (props.margins && (props.margins.bottom !== '' || props.margins.top !== '')) {
      if (props.margins.top !== '') {
        css['margin-top'] = props.margins.top;
      }
      if (props.margins.bottom !== '') {
        css['margin-bottom'] = props.margins.bottom;
      }
    }

    return css;
  });
</script>

<template>
  <div
    class="base-block"
    :class="blockClass"
    :style="blockCss"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.base-block {
  margin-bottom: 1rem;
}
.columns-block .base-block {
  margin-bottom: 0;
}
</style>
