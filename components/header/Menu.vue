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
      <h2>
        LocoLogo
        {{ $t("welcome") }}
      </h2>
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
  display: flex;
  flex-direction: row;
  @include content-width();
}
.menu__source-content {
  display: flex;
  align-items: center;
}
</style>
