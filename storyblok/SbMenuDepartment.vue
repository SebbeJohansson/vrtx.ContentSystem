<script setup lang="ts">
  const props = defineProps({
    blok: {
      type: Object,
      required: true,
    },
  });

  const title = computed(() => props.blok.title);

  const link = computed(() => {
    if (props.blok.link.id !== '' && props.blok.link.linktype === 'story') {
      return `${props.blok.link.cached_url ?? props.blok.link.url ?? props.blok.link.link}`;
    }
    if (props.blok.link.linktype === 'url') {
      return `${props.blok.link.url ?? props.blok.link.link}`;
    }
    return undefined;
  });

  const target = computed(() => props.blok.link.target);
</script>

<template>
  <HeaderMenuDepartment
    v-editable="blok"
    class="sb-menu-department"
    :title="title"
    :link="link"
    :target="target"
  >
    <component
      :is="$resolveStoryBlokComponent(sub_department)"
      v-for="sub_department in blok.sub_departments"
      :key="sub_department._uid"
      :blok="sub_department"
    />
  </HeaderMenuDepartment>
</template>
