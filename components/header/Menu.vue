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
  <div class="menu">
    <div class="menu__content">
      <h2 class="menu__logo">
        LocoLogo
      </h2>
      <h3 class="menu__logo">
        {{ $t("welcome") }}
      </h3>
      <component
        :is="menuContentComponent"
        class="menu__source-content"
      />
      <PartsLanguageSwitcher />
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  background-color: $base-color;
}
.menu__content {
  @include content-width();
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
}
.menu__logo {
  margin-right: 1rem;
}
.menu__source-content {
  display: flex;
  align-items: center;
}
</style>
