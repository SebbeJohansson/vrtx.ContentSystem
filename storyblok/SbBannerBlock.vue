<script setup lang="ts">
  const { $isArrayEmpty } = useNuxtApp();

  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });
  const blockClass = computed(() => `sb-banner-block--${props.blok.key}`);
  const body = computed(() => props.blok.body);
  const backgroundCss = computed(() => {
    const css = {};
    if (props.blok.background.color) {
      css['background-color'] = props.blok.background.color;
    }

    return css;
  });
  const backgroundImage = computed(() => {
    if (!props.blok.background.image && props.blok.background.image === '') { return null; }

    return props.blok.background.image;
  });
  const backgroundImageAlt = computed(() => {
    if (!props.blok.background.alt_tag && props.blok.background.alt_tag === '') { return null; }

    return props.blok.background.alt_tag;
  });
  const buttons = computed(() => props.blok.button);
  const buttonsStyle = computed(() => {
    const css = {};

    if (props.blok.buttons_align) {
      css['justify-content'] = props.blok.buttons_align;
    }

    return css;
  });
  const banner = computed(() => {
    if (!props.blok.link) { return { type: 'div', url: null }; }

    if (props.blok.link.id !== '') {
      return {
        type: 'nuxt-link',
        url: `${props.blok.link.cached_url || props.blok.link.link}`,
      };
    }
    return {
      type: (props.blok.link.cached_url || props.blok.link.link) ? 'a' : 'div',
      url: props.blok.link.cached_url || props.blok.link.link,
    };
  });
  const deviceSpecificHeight = computed(() => props.blok.height);
  const minHeightMobile = computed(() => {
    if (deviceSpecificHeight.value?.mobile && deviceSpecificHeight.value.mobile !== '') {
      return deviceSpecificHeight.value.mobile;
    }
    return null;
  });
  const minHeightTablet = computed(() => {
    if (deviceSpecificHeight.value?.tablet && deviceSpecificHeight.value.tablet !== '') {
      return deviceSpecificHeight.value.tablet;
    }
    return null;
  });
  const minHeightDesktop = computed(() => {
    if (deviceSpecificHeight.value?.desktop && deviceSpecificHeight.value.desktop !== '') {
      return deviceSpecificHeight.value.desktop;
    }
    return null;
  });
  const useBackgroundLook = computed(() => !$isArrayEmpty(backgroundCss.value));
</script>

<template>
  <component
    :is="banner.type"
    v-editable="blok"
    :to="banner.url"
    :href="banner.url"
    class="sb-banner-block"
    :class="blockClass"
  >
    <component
      :is="'style'"
      v-if="deviceSpecificHeight && (minHeightMobile || minHeightTablet || minHeightDesktop)"
      type="text/css"
    >
      @media (max-width: 767px){
      .{{ blockClass }} .sb-banner-block__content {
      min-height: {{ minHeightMobile }}
      }
      }
      @media (min-width: 768px) and (max-width: 1023px){
      .{{ blockClass }} .sb-banner-block__content {
      min-height: {{ minHeightTablet }}
      }
      }
      @media (min-width: 1024px){
      .{{ blockClass }} .sb-banner-block__content {
      min-height: {{ minHeightDesktop }}
      }
      }
    </component>
    <div
      v-if="useBackgroundLook"
      class="sb-banner-block__background"
      :style="backgroundCss"
    >
      <img
        v-if="backgroundImage"
        class="sb-banner-block__background-image"
        :src="backgroundImage"
        :alt="backgroundImageAlt"
      >
    </div>
    <div class="sb-banner-block__content" :class="{ 'sb-banner-block__content--no-background': !useBackgroundLook}">
      <StoryblokComponent
        v-for="bodyLine in body"
        :key="bodyLine.key"
        :blok="bodyLine"
      />
      <div v-if="!$isArrayEmpty(buttons)" class="sb-banner-block__buttons" :style="buttonsStyle">
        <StoryblokComponent
          v-for="button in buttons"
          :key="button.key"
          class="sb-banner-block__button"
          :blok="button"
        />
      </div>
    </div>
  </component>
</template>

<style scoped lang="scss">
.sb-banner-block {
  position: relative;
  text-decoration: none;
  display: block;
}
.sb-banner-block__content {
  overflow: auto;
  width: 100%;
  height: 100%;
  @include content-width();
  padding: 2rem 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sb-banner-block__content--no-background {
  padding: 0;
}
.sb-banner-block__background {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}
.sb-banner-block__background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
