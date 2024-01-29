<script setup lang="ts">
  const { toImageUrl } = useMediaHandler();

  const props = defineProps({
    categories: {
      type: Array as () => BlogCategory[],
      default: Array as () => BlogCategory[],
    },
    author: {
      type: Object as () => BlogAuthor | undefined,
      default: undefined,
    },
  });
  const authorImage = computed(() => {
    if (!props.author?.cover_image || !props.author?.cover_image.url || props.author?.cover_image.url === '') { return undefined; }

    return toImageUrl(props.author?.cover_image.url, { focalPoint: props.author?.cover_image.focal_point });
  });
  const authorImageAlt = computed(() => {
    if (!props.author?.cover_image || !props.author?.cover_image.alt_text || props.author?.cover_image.alt_text === '') { return undefined; }

    return props.author?.cover_image.alt_text;
  });
</script>

<template>
  <div class="blog-post">
    <slot name="content" />
    <div class="blog-post__more-info">
      <div v-if="categories.length > 0" class="blog-post__categories">
        <h3>
          {{ $t('blog.categories') }}
        </h3>
        <div
          v-for="category in categories"
          :key="category.key"
          class="blog-post__category"
        >
          <NuxtLink
            :to="category.slug"
            class="blog-post__category-link"
          >
            {{ category.title }}
          </NuxtLink>
        </div>
      </div>
      <div class="blog-post__author">
        <div class="blog-post__author-info">
          <h3>
            {{ $t('blog.author') }}
          </h3>
          <p>{{ author?.first_name }} {{ author?.last_name }}</p>
        </div>
        <div
          v-if="authorImage"
          class="blog-page__author-image"
        >
          <img
            :src="authorImage"
            :alt="authorImageAlt"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-post__more-info{
  margin: 0 1rem 1rem;
  @include content-width();
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @include for-phone-only {
    grid-template-columns: 1fr;
  }
}
.blog-post__categories, .blog-post__author {
  background-color: darken($background-color, 20%);
  color: $text-color;
  border: 1px solid $border-dark;
  padding: 1rem;
}
.blog-post__author {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.blog-post__author-info {
  margin-right: 1rem;
}
.blog-page__author-image {
  max-width: 11rem;
  & img {
    width: 100%;
  }
}

</style>
