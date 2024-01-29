<script setup lang="ts">
  import type { MenuDepartment } from '~/interfaces/menu';

  const { menuContent, setSelectedMenuDepartment, selectedMenuDepartment } = useMenu();

  const localePath = useLocalePath();
  const menu = menuContent.value;
  const { departments } = menu;

  const onSelectDepartment = (selectedDepartment: MenuDepartment | undefined) => {
    if (selectedDepartment && selectedDepartment.sub_departments?.length > 0) {
      setSelectedMenuDepartment(selectedDepartment);
    } else {
      setSelectedMenuDepartment(undefined);
    }
  };

  const showSelectedMenu = computed(() => {
    if (selectedMenuDepartment.value && selectedMenuDepartment.value?.sub_departments?.length > 0) {
      return true;
    }
    return false;
  });
</script>

<template>
  <div
    class="header-menu"
    @mouseleave="onSelectDepartment(undefined)"
  >
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
          :department="department"
          @select-department="onSelectDepartment(department)"
        />
      </div>
    </div>
    <HeaderSelectedMenuDepartment v-if="showSelectedMenu" class="header-menu__selected-menu-department" />
  </div>
</template>

<style scoped lang="scss">
.header-menu {
  background-color: $base-color;
  color: $text-color;
  position: sticky;
  top: 0;
  z-index: 1000;
  @at-root .content-page--seamless-header & {
    position: absolute;
    width: 100%;
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

.header-menu__selected-menu-department {
  background-color: $background-color;
  position: absolute;
  width: 100%;
}
</style>
