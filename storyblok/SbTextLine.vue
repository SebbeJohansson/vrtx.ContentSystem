<script setup lang="ts">
  import { Richtext } from 'storyblok-js-client';

  const { $formatRichText } = useNuxtApp();

  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
  const textObject = { ...props.blok.text };
  const nodes = computed((): any[] => {
    const localNodes = [];
    // Proof of concept for custom handling of inline blok nodes.
    Object.entries(textObject.content).forEach(([key, node]) => {
      if (node.type === 'blok') {
        const blok = {
          content: node.attrs?.body?.[0],
        };
        localNodes.push({
          key,
          type: 'blok',
          content: {
            blok,
          },
        });
      } else {
        localNodes.push({
          key,
          type: 'html',
          content: $formatRichText(useStoryblokApi().richTextResolver.render({
            type: 'doc',
            content: [
              node,
            ],
          } as Richtext)),
        });
      }
    });
    return localNodes;
  });
  const css = computed(() => {
    const cssObject = {} as any;

    if (props.blok.text_color?.color && props.blok.text_color?.color !== '') {
      cssObject.color = props.blok.text_color.color;
    }

    return cssObject;
  });
  const classes = computed(() => {
    const classesObject = [];

    if (props.blok.text_align) {
      classesObject.push(`sb-text-line--text-align-${props.blok.text_align}`);
    }

    return classesObject;
  });
</script>

<template>
  <div
    v-editable="blok"
    class="sb-text-line"
    :class="classes"
    :style="css"
  >
    <div v-for="node in nodes" :key="node.key">
      <component
        :is="$resolveStoryBlokComponent(node.content.blok)"
        v-if="node.type === 'blok'"
        class="sb-text-line__content"
        :blok="node.content.blok.content"
      />
      <div v-else class="sb-text-line__content" v-html="node.content" />
    </div>
  </div>
</template>

<style scoped>
.sb-text-line--text-align-right{
  text-align: right;
}
.sb-text-line--text-align-left{
  text-align: left;
}
.sb-text-line--text-align-center{
  text-align: center;
}
.sb-text-line__content *:first-child {
  margin-top: 0;
}
.sb-text-line__content *:last-child {
  margin-bottom: 0;
}
</style>
