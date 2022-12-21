<script setup lang="ts">
  const props = defineProps({
    link: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    },
  });

  const item = computed(() => {
    if (props.link) {
      return {
        type: resolveComponent('nuxt-link'),
        url: props.link,
      };
    }
    return { type: 'div', url: null };
  });

</script>

<template>
  <component
    :is="item.type"
    :to="item.url ? item.url : null"
    :target="target"
    class="menu-department"
  >
    {{ title }}
    <slot />
  </component>
</template>

<style scoped>
</style>
