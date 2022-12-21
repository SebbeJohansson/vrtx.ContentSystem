<script setup lang="ts">
  const { $isArrayEmpty } = useNuxtApp();

  interface DeviceSpecificHeightType {
    mobile: string;
    tablet: string;
    desktop: string;
  }

  const props = defineProps({
    blockKey: {
      type: String,
      required: true,
    },
    margins: {
      type: Object,
      default: null,
    },
    internalLink: {
      type: String,
      default: null,
    },
    externalLink: {
      type: String,
      default: null,
    },
    background: {
      type: Object,
      required: true,
    },
    deviceSpecificHeight: {
      type: Object as () => DeviceSpecificHeightType,
      default: null,
    },
  });
  const blockClass = computed(() => `banner-block--${props.blockKey}`);
  const backgroundCss = computed(() => {
    const css = {};
    if (props.background.color) {
      css['background-color'] = props.background.color;
    }

    return css;
  });
  const backgroundImage = computed(() => {
    if (!props.background.image && props.background.image === '') { return null; }

    return props.background.image;
  });
  const backgroundImageAlt = computed(() => {
    if (!props.background.alt_tag && props.background.alt_tag === '') { return null; }

    return props.background.alt_tag;
  });
  const banner = computed(() => {
    if (props.internalLink !== '') {
      return {
        type: resolveComponent('NuxtLink'),
        url: props.internalLink,
      };
    }

    if (props.externalLink !== '') {
      return {
        type: 'a',
        url: props.internalLink,
      };
    }
    return { type: 'div', url: null };
  });
  const minHeightMobile = computed(() => {
    if (props.deviceSpecificHeight?.mobile && props.deviceSpecificHeight.mobile !== '') {
      return props.deviceSpecificHeight.mobile;
    }
    return null;
  });
  const minHeightTablet = computed(() => {
    if (props.deviceSpecificHeight?.tablet && props.deviceSpecificHeight.tablet !== '') {
      return props.deviceSpecificHeight.tablet;
    }
    return null;
  });
  const minHeightDesktop = computed(() => {
    if (props.deviceSpecificHeight?.desktop && props.deviceSpecificHeight.desktop !== '') {
      return props.deviceSpecificHeight.desktop;
    }
    return null;
  });
  const useBackgroundLook = computed(() => !$isArrayEmpty(backgroundCss.value));
  </script>

<template>
  <ContentBaseBlock
    :block-key="blockKey"
    :margins="margins"
  >
    <component
      :is="'style'"
      v-if="deviceSpecificHeight && (minHeightMobile || minHeightTablet || minHeightDesktop)"
      type="text/css"
    >
      @media (max-width: 767px){
      .{{ blockClass }} .banner-block__content {
      min-height: {{ minHeightMobile }}
      }
      }
      @media (min-width: 768px) and (max-width: 1023px){
      .{{ blockClass }} .banner-block__content {
      min-height: {{ minHeightTablet }}
      }
      }
      @media (min-width: 1024px){
      .{{ blockClass }} .banner-block__content {
      min-height: {{ minHeightDesktop }}
      }
      }
    </component>
    <component
      :is="banner.type"
      :to="banner.url"
      :href="banner.url"
      class="banner-block"
      :class="blockClass"
    >
      <div
        v-if="useBackgroundLook"
        class="banner-block__background"
        :style="backgroundCss"
      >
        <img
          v-if="backgroundImage"
          class="banner-block__background-image"
          :src="backgroundImage"
          :alt="backgroundImageAlt"
        >
      </div>
      <div class="banner-block__content" :class="{ 'banner-block__content--no-background': !useBackgroundLook}">
        <slot name="body" />
      </div>
    </component>
  </ContentBaseBlock>
</template>

  <style scoped lang="scss">
  .banner-block {
    position: relative;
    text-decoration: none;
    display: block;
    height: 100%;
  }
  .banner-block__content {
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
  .banner-block__content--no-background {
    padding: 0;
  }
  .banner-block__background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
  }
  .banner-block__background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-block__buttons {
    margin: .5rem -.5rem 0;
    display: inline-flex;
    flex-direction: row;
  }
  .banner-block__button {
    margin: 0 .5rem;
  }
  </style>
