<script setup lang="ts">
  import { MenuDepartment } from '~/composables/useContent';

  const { menuContent, setSelectedMenuDepartment } = useMenu();

  const localePath = useLocalePath();
  await useMenuFetch();
  const menu = menuContent.value;
  const { departments } = menu;

  const onSelectDepartment = (selectedDepartment: MenuDepartment) => {
    setSelectedMenuDepartment(selectedDepartment);
  };
</script>

<template>
  <div class="header-menu">
    <div class="header-menu__content">
      <NuxtLink
        :to="localePath('/')"
      >
        <h2 class="header-menu__logo">
          {{ $t("logo") }}
        </h2>
      </NuxtLink>
      <div
        v-if="departments && Array.isArray(departments) && departments.length > 0"
        class="header-menu__departments"
      >
        <HeaderMenuDepartment
          v-for="department in departments"
          :key="department.key"
          :title="department.title"
          :link="department.slug"
          :target="department.target"
          @select-department="onSelectDepartment(department)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-menu {
  background-color: $base-color;
  color: $text-color;
  @at-root .content-page--seamless-header & {
    position: absolute;
    width: 100%;
    z-index: 1000;
    background-color: transparent;
    color: $base-color;
  }
}
.header-menu__content {
  @include content-width();
  display: flex;
  flex-direction: row;
  min-height: calc(60px - 1rem);
  align-items: center;
  padding: .5rem 1rem;
  @include for-phone-only {
    align-items: flex-start;
    flex-direction: column;
  }
}
.header-menu__logo {
  margin-right: 1rem;
}

.header-menu__departments {
  display: inline-flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
