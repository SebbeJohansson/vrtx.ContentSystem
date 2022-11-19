<script setup lang="ts">
  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });

  const title = computed(() => props.blok.title);

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
</script>

<template>
  <ContentMenuDepartment
    v-editable="blok"
    class="sb-menu-department"
    :title="title"
    :internal-link="internalLink"
    :external-link="externalLink"
  >
    <component
      :is="$resolveStoryBlokComponent(sub_department)"
      v-for="sub_department in blok.sub_departments"
      :key="sub_department._uid"
      :blok="sub_department"
    />
  </ContentMenuDepartment>
</template>
