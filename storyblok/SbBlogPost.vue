<script setup lang="ts">
  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });

  const categories = computed(() => props.blok.categories.map((category: any) => ({
    key: category.uuid,
    title: category.content.title,
    full_slug: category.slug,
  })));
</script>

<template>
  <ContentBlogPost
    v-if="blok.content && Array.isArray(blok.content) && blok.content.length > 0"
    v-editable="blok"
    class="sb-blog-post"
    :categories="categories"
  >
    <template #content>
      <component
        :is="$resolveStoryBlokComponent(block)"
        v-for="block in blok.content"
        :key="block._uid"
        :blok="block"
      />
    </template>
  </ContentBlogPost>
</template>
