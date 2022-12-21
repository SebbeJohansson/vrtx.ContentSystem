<script setup lang="ts">
  import { StoryData } from '@storyblok/vue/dist';

  import { BlogPost } from '~/composables/useBlog';

  const pagePreview = usePagePreview();

  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
    raw: {
      type: Object,
      required: true,
    },
  });

  const title = computed(() => props.blok.title);

  const blogPosts = ref([] as StoryData[]);

  const version = pagePreview.value ? 'draft' : 'published';
  // Since we need the base object and not the content of the story, we need to pass the raw object.
  await useStoryblokBlogPostFetch(version, [props.raw] as StoryData[]).then((response) => {
    blogPosts.value = blogPosts.value.concat(response);
  });
  const posts = computed(() => blogPosts.value.map((post: StoryData) => ({
    key: post.uuid,
    title: post.content.title || post.content.name || post.name,
    cover_image: {
      url: post.content.cover_image?.filename,
      alt_text: post.content.cover_image?.alt,
      focal_point: post.content.cover_image?.focus,
      name: post.content.cover_image?.name,
      title: post.content.cover_image?.title,
    },
    cover_color: post.content.cover_color?.color,
    description: post.content.description,
    slug: post.full_slug,
  } as BlogPost)));
</script>

<template>
  <div
    v-editable="blok"
    class="sb-blog-page"
  >
    <ContentBlogPage :title="title" :posts="posts" />
  </div>
</template>
