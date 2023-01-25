<script setup lang="ts">
  const menu = useFooterContent().value;
  const { departments } = menu;
</script>

<template>
  <div class="footer-menu">
    <div class="footer-menu__content">
      <div
        v-if="departments && Array.isArray(departments) && departments.length > 0"
        class="footer-menu__departments"
      >
        <HeaderSubDepartment
          v-for="department in departments"
          :key="department.key"
          :department="department"
        />
      </div>
      <PartsLanguageSwitcher />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/elements/button" with (
  $button-color: yellow
);

.footer-menu {
  background-color: $base-color;
  color: $text-color;
}
.footer-menu__content {
  @include content-width();
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.footer-menu__departments {
  display: inline-flex;
  flex-direction: row;
  gap: 1rem;
  margin-right: auto;
}

</style>
