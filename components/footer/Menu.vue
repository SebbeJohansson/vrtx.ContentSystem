<script setup lang="ts">
  await useFooterFetch();
  const footerSource = useFooterSource().value;
  let footerContentComponent: any;
  switch (footerSource) {
    case 'storyblok':
      footerContentComponent = resolveComponent('SourcesStoryblokFooter');
      break;
    case 'contentful':
      // footerContentComponent = ContentfulFooter;
      break;
    default:
      break;
  }
</script>

<template>
  <div class="footer-menu">
    <div class="footer-menu__content">
      <h2>
        {{ $t("logo") }}
      </h2>
      <component
        :is="footerContentComponent"
        class="footer-menu__source-content"
      />
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
}
.footer-menu__content {
  @include content-width();
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.footer-menu__source-content {
  display: flex;
  align-items: center;
}

</style>
