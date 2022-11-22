<template>
  <div class="content-page-layout">
    <HeaderMenu />
    <div class="content-page-layout__content">
      <slot />
    </div>
    <FooterMenu />
  </div>
</template>

<style>
.content-page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content-page-layout__content {
  flex-grow: 1;
}
</style>
