<script setup lang="ts">
  const props = defineProps({
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

  const item = computed(() => {
    if (props.internalLink !== '') {
      return {
        type: resolveComponent('nuxt-link'),
        url: props.internalLink,
      };
    }

    if (props.externalLink !== '') {
      return {
        type: 'a',
        url: props.internalLink,
      };
    }
    return { type: 'div', url: null };
  });

</script>

<template>
  <component
    :is="item.type"
    :to="item.url"
    :href="item.url"
    class="menu-department"
  >
    {{ title }}
    <slot />
  </component>
</template>

<style scoped>
</style>
