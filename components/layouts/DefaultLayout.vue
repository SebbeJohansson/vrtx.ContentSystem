<!-- There is still no way to have a proper fallback layout. -->
<!-- https://github.com/nuxt/framework/issues/9239 -->

<template>
  <div class="default-layout">
    <HeaderMenu />
    <div class="default-layout__content">
      <slot />
    </div>
    <FooterMenu />
  </div>
</template>

<style>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.default-layout__content {
  flex-grow: 1;
}
</style>
