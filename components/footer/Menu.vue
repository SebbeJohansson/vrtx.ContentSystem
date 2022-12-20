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
@import "./Menu.scss";
</style>
