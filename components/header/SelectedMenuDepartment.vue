<script setup lang="ts">

  const { selectedMenuDepartment } = useMenu();

  const subMenuDepartments = computed(() => {
    if (selectedMenuDepartment.value) {
      return selectedMenuDepartment.value.sub_departments;
    }
    return [];
  });

</script>

<template>
  <div class="selected-menu-department">
    <div class="selected-menu-department__content">
      <HeaderSubDepartment v-for="department in subMenuDepartments" :key="department.key" :department="department" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.selected-menu-department__content {
  @include content-width();
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1rem;
}
</style>
