<script setup lang="ts">
  import { BlogAuthor } from '~/composables/useBlog';

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
  console.log(props.blok.author);
  const author = computed(() => (props.blok.author ? {
    key: props.blok.author.uuid,
    first_name: props.blok.author.content.first_name,
    last_name: props.blok.author.content.last_name,
    ...props.blok.author.content.image ? {
      cover_image: {
        url: props.blok.author.content.image.filename,
        alt_text: props.blok.author.content.image.alt,
        focal_point: props.blok.author.content.image.focus,
      },
    } : {},
  } as BlogAuthor : undefined));
</script>

<template>
  <ContentBlogPost
    v-if="blok.content && Array.isArray(blok.content) && blok.content.length > 0"
    v-editable="blok"
    class="sb-blog-post"
    :categories="categories"
    :author="author"
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
