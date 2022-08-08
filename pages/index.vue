<script setup lang="ts">
// eslint-disable-next-line no-undef
useHead({
  title: 'My Nuxt App',
});
</script>

<template>
  <div>
    <h1>Hello World</h1>
    <p>This is the default page</p>

    {{ $t('welcome') }}
  </div>
</template>
