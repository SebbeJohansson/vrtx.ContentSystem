<script setup lang="ts">
  defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <div
    v-if="blok.content && Array.isArray(blok.content) && blok.content.length > 0"
    v-editable="blok"
    class="sb-content-page"
  >
    <ContentBaseBlock
      v-for="block in blok.content"
      :key="block._uid"
      :block-key="block._uid"
    >
      <component
        :is="$resolveStoryBlokComponent(block)"
        :blok="block"
      />
    </ContentBaseBlock>
  </div>
</template>
