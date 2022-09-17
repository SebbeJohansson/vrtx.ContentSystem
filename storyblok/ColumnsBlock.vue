<script setup lang="ts">
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const blockClasses = computed(() => {
  const classes = [];
  if (props.blok.design) {
    classes.push(`sb-columns-block--design-${props.blok.design}`);
  }
  return classes;
});
const columns = computed(() => props.blok.columns);
</script>

<template>
  <div
    v-editable="blok"
    class="sb-columns-block"
    :class="blockClasses"
  >
    <div class="sb-columns-block__margin">
      <StoryblokComponent
        v-for="column in columns"
        :key="column.key"
        :blok="column"
      />
    </div>
  </div>
</template>

<style>
.sb-columns-block {
  overflow: hidden;
  width: 100%;
  max-width: calc(1180px + 2rem);
  margin: auto;
  padding: 0 1rem;
}

.sb-columns-block__margin {
  margin: 0 -1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
.sb-columns-block--design-center .sb-columns-block__margin {
  display: flex;
  justify-content: center;
}

@media (--phone) {
  .sb-columns-block__margin {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
