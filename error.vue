<script setup>
  defineProps({
    error: {
      type: Object,
      required: true,
    },
  });
  const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div>
    {{ error.statusCode }}: {{ error.statusMessage }}
    <button @click="handleError">
      Clear errors
    </button>
  </div>
</template>
