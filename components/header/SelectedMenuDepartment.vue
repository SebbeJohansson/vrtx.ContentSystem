<script setup lang="ts">

  const { selectedMenuDepartment, menuSource } = useMenu();

  const subMenuDepartments = computed(() => {
    if (selectedMenuDepartment.value) {
      return selectedMenuDepartment.value.sub_departments;
    }
    return [];
  });

  const menuDepartmentContent = computed(() => selectedMenuDepartment.value?.content);

</script>

<template>
  <div class="selected-menu-department">
    <div class="selected-menu-department__subdepartments">
      <HeaderSubDepartment v-for="department in subMenuDepartments" :key="department.key" :department="department" />
    </div>
    <div class="selected-menu-department__content">
      <SourcesStoryblokSelectedMenuContent v-if="menuSource === 'storyblok'" :content="menuDepartmentContent" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.selected-menu-department__subdepartments {
  @include content-width();
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1rem;
}
</style>
