<template>
  <div class="menu-content">
    <slot />
  </div>
</template>

<style scoped>
.menu-content {
  display: inline-flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
