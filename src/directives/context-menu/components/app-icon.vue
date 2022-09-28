<script lang="ts" setup>
defineProps<{
  src: string;
}>();
</script>

<template>
  <div class="app-icon">
    <img v-if="src" :src="src" />
  </div>
</template>

<style lang="scss" scoped>
.app-icon {
  width: 100%;
  height: 40px;

  img {
    display: block;
    width: 40px;
    height: 40px;
    margin: auto;
  }
}
</style>
