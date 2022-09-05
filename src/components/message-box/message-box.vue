<script lang="ts" setup>
import { ref, RendererNode, VNode } from 'vue';

const currentContent = ref<string | VNode<RendererNode>>(null);

function setMessage(content: string | VNode<RendererNode>) {
  currentContent.value = content;
}

defineExpose({
  setMessage,
});
</script>
<template>
  <div class="message-box">
    <template v-if="typeof currentContent === 'string'">
      {{ currentContent }}
    </template>
    <template v-else>
      <component :is="currentContent" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.message-box {
  width: 100vw;
  box-sizing: border-box;
  background-color: rgb(127, 102, 219);
  padding: 8px 5px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
