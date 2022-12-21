<script setup lang="ts">
  const { $isArrayEmpty } = useNuxtApp();

  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
  const margins = computed(() => props.blok.margins);
  const body = computed(() => props.blok.body);
  const background = computed(() => props.blok.background);
  const buttons = computed(() => props.blok.button);
  const buttonsStyle = computed(() => {
    const css = {};

    if (props.blok.buttons_align) {
      css['justify-content'] = props.blok.buttons_align;
    }

    return css;
  });
  const internalLink = computed(() => {
    if (props.blok.link.id !== '') {
      return `${props.blok.link.cached_url || props.blok.link.link}`;
    }
    return undefined;
  });
  const externalLink = computed(() => {
    if (!props.blok.link.id || props.blok.link.id === '') {
      return `${props.blok.link.cached_url || props.blok.link.link}`;
    }
    return undefined;
  });
  const deviceSpecificHeight = computed(() => props.blok.height);
</script>

<template>
  <ContentBannerBlock
    v-editable="blok"
    class="sb-banner-block"
    :block-key="blok._uid"
    :internal-link="internalLink"
    :external-link="externalLink"
    :background="background"
    :device-specific-height="deviceSpecificHeight"
    :margins="margins"
  >
    <template #body>
      <StoryblokComponent
        v-for="bodyLine in body"
        :key="bodyLine._uid"
        :blok="bodyLine"
      />
      <div v-if="!$isArrayEmpty(buttons)" class="sb-banner-block__buttons" :style="buttonsStyle">
        <StoryblokComponent
          v-for="button in buttons"
          :key="button._uid"
          class="sb-banner-block__button"
          :blok="button"
        />
      </div>
    </template>
  </ContentBannerBlock>
</template>

<style scoped lang="scss">
.sb-banner-block {
  height: 100%;
}
.sb-banner-block__buttons {
  margin: .5rem -.5rem 0;
  display: inline-flex;
  flex-direction: row;
}
.sb-banner-block__button {
  margin: 0 .5rem;
}
</style>
