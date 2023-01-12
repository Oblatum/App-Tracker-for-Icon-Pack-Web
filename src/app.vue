<script lang="ts" setup>
import { ref } from "vue";

const text = ref("就就就，小飞棍来no");

async function fetchData() {
  const rsp = await import("@/assets/others/hehe.txt");
  text.value = rsp.default;
}
</script>

<template>
  <h1>Ha ha ha ...</h1>
  <h2>{{ text }}</h2>
  <button @click="fetchData">呃呃</button>
</template>
