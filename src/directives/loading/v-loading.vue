<script lang="ts" setup>
import { onUnmounted, ref, watch } from 'vue';

const title = ref<string>('');
const emphasis = ref<string>('');
const interval = ref<ReturnType<typeof setInterval>>(null);

function setTitle(tt: string) {
  title.value = tt;
}

watch(title, () => {
  if (title.value) {
    interval.value = setInterval(() => {
      if (emphasis.value.length < 3) {
        emphasis.value += '.';
      } else {
        emphasis.value = '';
      }
    }, 300);
  } else {
    interval.value = null;
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 100;

  .loading-text {
    font-size: 30px;
    font-weight: 900;
    &::after {
      content: attr(data-emphasis);
    }
  }
}
</style>
