<script setup lang="ts">
  await useMenuFetch();
  const menuSource = useMenuSource().value;
  let menuContentComponent;
  switch (menuSource) {
    case 'storyblok':
      menuContentComponent = resolveComponent('SourcesStoryblokMenu');
      break;
    case 'contentful':
      // menuContentComponent = ContentfulMenu;
      break;
    default:
      break;
  }
</script>

<template>
  <div class="header-menu">
    <div class="header-menu__content">
      <div>
        <h2 class="header-menu__logo">
          {{ $t("logo") }}
        </h2>
        <h3 class="header-menu__logo">
          {{ $t("welcome") }}
        </h3>
      </div>
      <component
        :is="menuContentComponent"
        class="header-menu__source-content"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-menu {
  background-color: $base-color;
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
.header-menu__source-content {
  display: flex;
  align-items: center;
}
</style>
