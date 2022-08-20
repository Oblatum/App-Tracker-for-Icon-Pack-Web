<script lang="ts" setup>
import { SearchItemModel } from '@/models/data';
import { ref } from 'vue';

const currCtx = ref(null);

function onCtxMenu(evt: MouseEvent) {
  currCtx.value = evt
    .composedPath()
    .find((v) => (v as HTMLElement).classList.contains('item-row'));
}

defineProps<{
  items: SearchItemModel[];
}>();
</script>

<template>
  <div
    v-context-menu="currCtx"
    @contextmenu.prevent="onCtxMenu"
    class="item-list"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="item-row"
      :data-app-name="item.appName"
      :data-package-name="item.packageName"
      :data-activity-name="item.activityName"
      :data-app-id="item.id"
    >
      <div class="item">{{ item.appName }}</div>
      <div class="item">{{ item.packageName }}</div>
      <div class="item">{{ item.activityName }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-row {
  display: flex;
  flex-direction: row;

  .item {
    flex-basis: 100px;
    flex-grow: 1;
    flex-shrink: 1;
  }
}
</style>
