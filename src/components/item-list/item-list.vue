<script lang="ts" setup>
import type { SearchItemModel } from '@/models/data';
import type { ListDataRecordModel } from './model';
import { computed, ref } from 'vue';

const props = defineProps<{
  items: SearchItemModel[];
}>();

const listRef = ref<HTMLElement>(null);
const menuWidth = 150;
const menuHeight = 199.5;

const validArea = computed(() => {
  return {
    width: listRef.value.clientWidth,
    height: listRef.value.clientHeight,
  };
});

const initConf = {
  target: null as any,
  x: 0,
  y: 0,
  origin: 'left top',
};

const currCtxConf = ref(Object.assign({}, initConf));

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
  const target = evt
    .composedPath()
    .filter((v) => v !== window && v !== document)
    .find((v) =>
      (v as HTMLElement).classList.contains('item-row'),
    ) as HTMLElement;

  if (target) {
    let origin = [];
    let x = listRef.value.scrollLeft + (evt as any).layerX;
    let y = listRef.value.scrollTop + (evt as any).layerY;
    if (x + menuWidth > validArea.value.width) {
      x -= menuWidth;
      origin.push('right');
    } else {
      origin.push('left');
    }

    if (y + menuHeight > validArea.value.height) {
      y -= menuHeight;
      origin.push('bottom');
    } else {
      origin.push('top');
    }
    currCtxConf.value = {
      target,
      x,
      y,
      origin: origin.join(' '),
    };
  } else {
    currCtxConf.value = Object.assign({}, initConf);
  }
}

defineExpose({ setCurrCtx });
</script>

<template>
  <div
    ref="listRef"
    v-context-menu:[listData]="currCtxConf"
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
  overflow: hidden;

  .item-row {
    display: flex;
    flex-direction: row;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    transition: transform 0.5s, box-shadow 0.25s;
    cursor: pointer;

    &:hover {
      // background-color: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }

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
