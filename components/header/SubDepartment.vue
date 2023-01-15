<script setup lang="ts">
  import { MenuDepartment } from '~/interfaces/menu';

  const props = defineProps({
    department: {
      type: Object as () => MenuDepartment,
      required: true,
    },
  });

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
</script>

<template>
  <div
    class="sub-department"
  >
    <component
      :is="item.type"
      :to="item.url ? item.url : null"
      :target="target"
      class="sub-department__title"
    >
      {{ title }}
    </component>
    <div v-if="subDepartments" class="sub-department__sub-departments">
      <HeaderMenuDepartment
        v-for="subDepartment in subDepartments"
        :key="subDepartment.key"
        :department="subDepartment"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sub-department {
  color: $text-color;
}
.sub-department__title {
  font-weight: 500;
}
</style>
