<script setup lang="ts">

  defineProps({
    posts: {
      type: Array as () => BlogPost[],
      required: true,
    },
  });

  const coverCss = (post: BlogPost) => {
    const css = {} as Record<string, string>;

    if (post.cover_image?.color) {
      css['background-color'] = post.cover_image.color;
    }

    return css;
  };
  const coverImage = (post: BlogPost) => {
    if (!post.cover_image || !post.cover_image.image || post.cover_image.image === '') { return null; }

    return post.cover_image.image;
  };
  const coverImageAlt = (post: BlogPost) => {
    if (!post.cover_image || !post.cover_image.alt_tag || post.cover_image.alt_tag === '') { return null; }

    return post.cover_image.alt_tag;
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
        <nuxt-link
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
            <div class="blog-page__post-button btn-campaign-solid--xs">
              <span>Read More</span>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style>
.blog-page {
  margin-bottom: 1rem;
}
.blog-page__posts {
  overflow: hidden;
  width: 100%;
  max-width: calc(1180px + 2rem);
  margin: auto;
  padding: 0 1rem;
  margin-top: 1rem;
}
.blog-page__posts-margin {
  margin: 0 -1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}
.blog-page__post {
  background-color: #f1eff1;
  text-decoration: none;
  display: flex;
  flex-direction: column;
}
.blog-page__post-cover {
  position: relative;
  height: 15rem;
  width: 100%;
}
.blog-page__post-cover-image {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.blog-page__post-content {
  overflow: auto;
  padding: 2rem 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.blog-page__post-title {
  margin-top: 0;
}
.blog-page__post-button {
  margin-top: auto;
}
</style>
