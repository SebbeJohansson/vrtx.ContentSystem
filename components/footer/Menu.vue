<script setup lang="ts">
  await useFooterFetch();
  const menu = useFooterContent().value;
  const { departments } = menu;
</script>

<template>
  <div class="footer-menu">
    <div class="footer-menu__content">
      <h2>
        {{ $t("logo") }}
      </h2>
      <div
        v-if="departments && Array.isArray(departments) && departments.length > 0"
        class="footer-menu__departments"
      >
        <HeaderMenuDepartment
          v-for="department in departments"
          :key="department.key"
          :title="department.title"
          :link="department.slug"
          :target="department.target"
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
}

</style>
