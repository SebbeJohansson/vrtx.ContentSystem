<script setup lang="ts">
  import { StoryData } from '@storyblok/vue/dist';

  const pagePreview = usePagePreview();

  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });

  const blogPosts = ref(props.blok.blogs as StoryData[]);

  const version = pagePreview.value ? 'draft' : 'published';
  if (props.blok.component === 'sb-blog-page' || props.blok.component === 'sb-blog-category') {
    await useStoryblokBlogPostFetch(version, props.blok.categories).then((response) => {
      blogPosts.value = blogPosts.value.concat(response);
    });
  }
  const posts = computed(() => blogPosts.value.map((post: StoryData) => {
    console.log(post);
    return {
      key: post.uuid,
      title: post.content.title || post.content.name || post.name,
      /* cover_image: {
        color: post.content.cover_image.color,
        image: post.content.cover_image.image,
        alt_tag: post.content.cover_image.alt_tag,
      }, */
      // description: post.content.description,
      slug: post.full_slug,
    } as BlogPost;
  }));
</script>

<template>
  <div
    v-editable="blok"
    class="sb-blog-page"
  >
    <ContentBlogPage :posts="posts" />
  </div>
</template>
