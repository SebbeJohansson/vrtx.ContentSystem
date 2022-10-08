<script setup lang="ts">
  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
  const columns = computed(() => props.blok.columns);
</script>

<template>
  <ContentColumnsBlock
    v-editable="blok"
    :block-key="blok._uid"
    :design="blok.design"
  >
    <StoryblokComponent
      v-for="column in columns"
      :key="column.key"
      :blok="column"
    />
  </ContentColumnsBlock>
</template>
