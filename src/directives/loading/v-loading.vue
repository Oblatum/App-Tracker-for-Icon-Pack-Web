<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const title = ref<string>('');
const emphasis = ref<string>('');
const interval = ref<ReturnType<typeof setInterval>>();

function setTitle(tt: string) {
  title.value = tt;
}

onMounted(() => {
  if (title.value) {
    interval.value = setInterval(() => {
      if (emphasis.value.length < 3) {
        emphasis.value += '.';
      } else {
        emphasis.value = '';
      }
    }, 250);
  }
});

defineExpose({
  setTitle,
});

onUnmounted(() => {
  clearInterval(interval.value);
  interval.value = null;
});
</script>

<template>
  <div class="loading-container" ref="rootRef">
    <img />
    <span class="loading-text" v-if="title" :data-emphasis="emphasis">
      {{ title }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  .loading-text {
    &::after {
      content: attr(data-emphasis);
    }
  }
}
</style>
