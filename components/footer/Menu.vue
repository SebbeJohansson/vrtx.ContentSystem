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
  <div class="footer-footer">
    <div class="footer-footer__content">
      <h2>
        {{ $t("logo") }}
      </h2>
      <component
        :is="footerContentComponent"
        class="footer-footer__source-content"
      />
      <PartsLanguageSwitcher />
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-footer {
  background-color: $base-color;
}
.footer-footer__content {
  @include content-width();
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.footer-footer__source-content {
  display: flex;
  align-items: center;
}
</style>
