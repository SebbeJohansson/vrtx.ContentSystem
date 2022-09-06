<script setup lang="ts">
import { StoryData } from '@storyblok/vue/dist';

const layout = 'content-page';

const route = useRoute();

const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
const version = isPreview ? 'draft' : 'published';

const story = ref({} as StoryData);

if (isPreview) {
  // We are in preview so lets fetch it with the normal module.
  const storyblokApi = useStoryblokApi();
  await storyblokApi.get(`cdn/stories/${route.path}`, {
    version,
  }).then((response) => {
    if (!response) { return; }
    story.value = response.data.story;
  });

  onMounted(() => {
    const { StoryblokBridge } = window;
    const storyblokInstance = new StoryblokBridge();
    storyblokInstance.on(['published', 'change', 'input'], (event) => {
      story.value = event.story;
    });
  });
} else {
  // Custom fetch for full static support.
  console.log(route.path);
  await useStoryblokFetch(route.path, {
    version,
  }).then((response) => {
    console.log(response);
    if (!response) { return; }
    story.value = response.story;
  });
}
</script>

<template>
  <div>
    <NuxtLayout :name="layout">
      <span>
        {{ story }}
        <component :is="$resolveStoryBlokComponent(story)" :blok="story.content" :raw="story" />
      </span>
    </NuxtLayout>
  </div>
</template>
