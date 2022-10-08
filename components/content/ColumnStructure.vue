<template>
  <div
    class="column-structure"
  >
    <slot />
  </div>
</template>

<style scoped>
.column-structure {
  padding: 0 0.5rem;
}
.column-structure:first-child {
  padding-left: 0;
}
.column-structure:last-child {
  padding-right: 0;
}
.column-structure > * {
  height: 100%;
}
</style>
