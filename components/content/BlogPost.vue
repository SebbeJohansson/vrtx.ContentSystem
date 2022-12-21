<script setup lang="ts">
  import { BlogCategory } from '~/composables/useBlog';

  const props = defineProps({
    categories: {
      type: Array as () => BlogCategory[],
      default: Array as () => BlogCategory[],
    },
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
        <h3>
          {{ $t('blog.author') }}
        </h3>
        <p>First and last name</p>
        <div>
          IMAGE
          of how
          the
          author looks
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-post__more-info{
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 .5rem;
}
.blog-post__categories, .blog-post__author {
  background-color: darken($background-color, 20%);
  color: $text-color;
  margin: 0 .5rem;
  border: 1px solid $border-dark;
  padding: 1rem;
}
</style>
