<script setup lang="ts">
  import type { ISbRichtext } from 'storyblok-js-client';

  const { formatRichText } = useMediaHandler();

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
          content: formatRichText(renderRichText({
            type: 'doc',
            content: [
              node,
            ],
          } as ISbRichtext)),
        });
      }
    });
    return localNodes;
  });
  const textColor = computed(() => {
    if (props.blok.text_color?.color && props.blok.text_color?.color !== '') {
      return props.blok.text_color.color;
    }
    return '000';
  });
</script>

<template>
  <ContentTextLine
    v-editable="blok"
    :text-align="blok.text_align"
    :text-color="textColor"
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
  </ContentTextLine>
</template>
