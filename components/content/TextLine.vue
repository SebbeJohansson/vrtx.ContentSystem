<script setup lang="ts">

  const props = defineProps({
    textColor: {
      type: String,
      default: '000',
    },
    textAlign: {
      type: String,
      default: 'left',
    },
  });
  const css = computed(() => {
    const cssObject = {} as any;

    if (props.textColor && props.textColor !== '') {
      cssObject.color = props.textColor;
    }

    return cssObject;
  });
  const classes = computed(() => {
    const classesObject = [];

    if (props.textAlign && props.textAlign !== '') {
      classesObject.push(`text-line--text-align-${props.textAlign}`);
    }

    return classesObject;
  });
</script>

<template>
  <div
    class="text-line"
    :class="classes"
    :style="css"
  >
    <slot class="text-line__content" />
  </div>
</template>

<style scoped>
.text-line--text-align-right{
  text-align: right;
}
.text-line--text-align-left{
  text-align: left;
}
.text-line--text-align-center{
  text-align: center;
}
.text-line__content * *:first-child {
  margin-top: 0;
}
.text-line__content * *:last-child {
  margin-bottom: 0;
}
</style>
