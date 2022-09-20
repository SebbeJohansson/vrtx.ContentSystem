<script setup lang="ts">
const { $formatRichText } = useNuxtApp();

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const text = computed((): string => $formatRichText(useStoryblokApi().richTextResolver.render(props.blok.text)));
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
    <div class="sb-text-line__content" v-html="text" />
  </div>
</template>

<style>
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
