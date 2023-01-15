<script setup lang="ts">
  import { MenuDepartment } from '~/interfaces/menu';

  const props = defineProps({
    department: {
      type: Object as () => MenuDepartment,
      required: true,
    },
  });

  const emit = defineEmits(['select-department']);

  const item = computed(() => {
    if (props.department.slug) {
      return {
        type: resolveComponent('nuxt-link'),
        url: props.department.slug,
      };
    }
    return { type: 'div', url: null };
  });
  const target = computed(() => {
    if (props.department.target) {
      return props.department.target;
    }
    return null;
  });
  const title = computed(() => {
    if (props.department.title) {
      return props.department.title;
    }
    return null;
  });
  const subDepartments = computed(() => {
    if (props.department.sub_departments) {
      return props.department.sub_departments;
    }
    return [];
  });

  const onMouseEnter = () => {
    emit('select-department');
  };

</script>

<template>
  <component
    :is="item.type"
    :to="item.url ? item.url : null"
    :target="target"
    class="menu-department"
    :class="{'menu-department--has-sub-menus' : subDepartments.length > 0}"
    @mouseenter="onMouseEnter"
  >
    {{ title }}
    <slot />
  </component>
</template>

<style scoped lang="scss">
.menu-department--has-sub-menus {
  cursor: pointer;
}
</style>
