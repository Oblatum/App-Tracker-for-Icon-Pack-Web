<script lang="ts" setup>
import type { SearchItemModel } from '@/models/data';
import type { ListDataRecordModel } from './model';
import { computed, ref } from 'vue';

const props = defineProps<{
  items: SearchItemModel[];
}>();

const currCtx = ref(null);
const listData = computed<ListDataRecordModel[]>(() => {
  return props.items.map((v) => {
    return {
      id: v.id,
      info: {
        appName: v.appName,
        packageName: v.packageName,
        activityName: v.activityName,
        id: v.id,
        appFilter: `<item component="ComponentInfo{${v.packageName}/${v.activityName}}" drawable="${v.appName}" />`,
      },
    };
  });
});

function setCurrCtx(evt: MouseEvent) {
  currCtx.value = null;
  currCtx.value = evt
    .composedPath()
    .filter((v) => v !== window && v !== document)
    .find((v) => (v as HTMLElement).classList.contains('item-row'));
}

defineExpose({ setCurrCtx });
</script>

<template>
  <div
    v-context-menu:[listData]="currCtx"
    @contextmenu.prevent="setCurrCtx"
    class="item-list"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="item-row"
      :data-app-id="item.id"
    >
      <div class="item">{{ item.appName }}</div>
      <div class="item">{{ item.packageName }}</div>
      <div class="item">{{ item.activityName }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  box-sizing: border-box;
  .item-row {
    display: flex;
    flex-direction: row;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    transition: transform 0.5s, background-color 0.5s;

    // &:hover {
    //   background-color: rgb(230, 230, 230);
    //   transform: scale(1.005) translate(2px, 2px);
    // }

    .item {
      flex-basis: 100px;
      flex-grow: 1;
      flex-shrink: 1;
      font-family: Noto Sans SC;
      font-size: 16px;
      color: #1a202c;
    }
  }
}
</style>
