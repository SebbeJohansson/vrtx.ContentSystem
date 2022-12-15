<script setup lang="ts">
  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
  const posts = computed(() => props.blok.blogPosts.map(post => ({
    key: post._uid,
    title: post.content.title || post.content.name || post.name,
    cover_image: {
      color: post.content.cover_image.color,
      image: post.content.cover_image.image,
      alt_tag: post.content.cover_image.alt_tag,
    },
    description: post.content.description || post.description,
    slug: post.content.full_slug,
  } as BlogPost)));
</script>

<template>
  <div
    v-editable="blok"
    class="sb-blog-page"
  >
    <ContentBlogPage :posts="posts" />
  </div>
</template>
