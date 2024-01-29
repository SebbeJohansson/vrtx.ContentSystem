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
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.default-layout__content {
  flex-grow: 1;
}
</style>
