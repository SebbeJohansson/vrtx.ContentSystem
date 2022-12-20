<script setup lang="ts">
  const { toImageUrl } = useMediaHandler();

  defineProps({
    posts: {
      type: Array as () => BlogPost[],
      required: true,
    },
  });

  const coverCss = (post: BlogPost) => {
    console.log(post);
    const css = {} as Record<string, string>;

    if (post.cover_color) {
      css['background-color'] = post.cover_color;
    }

    return css;
  };
  const coverImage = (post: BlogPost) => {
    if (!post.cover_image || !post.cover_image.url || post.cover_image.url === '') { return undefined; }

    return toImageUrl(post.cover_image.url, { focalPoint: post.cover_image.focal_point });
  };
  const coverImageAlt = (post: BlogPost) => {
    if (!post.cover_image || !post.cover_image.alt_text || post.cover_image.alt_text === '') { return undefined; }

    return post.cover_image.alt_text;
  };
</script>

<template>
  <div
    class="blog-page"
  >
    <div
      class="blog-page__posts"
    >
      <div class="blog-page__posts-margin">
        <NuxtLink
          v-for="post in posts"
          :key="post.key"
          class="blog-page__post"
          :to="`/${post.slug}`"
        >
          <div
            class="blog-page__post-cover"
            :style="coverCss(post)"
          >
            <img
              v-if="coverImage(post)"
              class="blog-page__post-cover-image"
              :src="coverImage(post)"
              :alt="coverImageAlt(post)"
            >
          </div>
          <div
            class="blog-page__post-content"
          >
            <h5 class="blog-page__post-title">
              {{ post.title }}
            </h5>
            <p>
              {{ post.description }}
            </p>
            <div class="blog-page__post-button btn">
              <span>Read More</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./BlogPage.scss";
</style>
