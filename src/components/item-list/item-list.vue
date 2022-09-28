<script lang="ts" setup>
import type { SearchItemModel } from '@/models/data';
import type { ListDataRecordModel } from './model';
import { computed, onUpdated, ref } from 'vue';

const props = defineProps<{
  items: SearchItemModel[];
}>();

const overflowScroll = ref(true);

const listBodyRef = ref<HTMLElement>(null);
const menuWidth = 120;
const menuHeight = 167;

const validArea = computed(() => {
  return {
    width: listBodyRef.value.clientWidth,
    height: listBodyRef.value.clientHeight,
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
  currCtxConf.value.target?.classList.remove('active-item-row');

  const target = evt
    .composedPath()
    .filter((v) => v !== window && v !== document)
    .find(
      (v) =>
        (v as HTMLElement).classList.contains('item-row') &&
        !(v as HTMLElement).classList.contains('item-title-row'),
    ) as HTMLElement;

  if (target) {
    let origin = [];
    let x = listBodyRef.value.scrollLeft + (evt as any).layerX;
    let y = listBodyRef.value.scrollTop + (evt as any).layerY;
    if (x + menuWidth > validArea.value.width) {
      x -= menuWidth;
      origin.push('right');
    } else {
      origin.push('left');
    }

    if (y + menuHeight > validArea.value.height) {
      if (y + menuHeight > document.body.clientHeight) {
        y -= menuHeight;
        origin.push('bottom');
      } else {
        origin.push('top');
        overflowScroll.value = false;
      }
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

onUpdated(() => {
  currCtxConf.value.target?.classList.add('active-item-row');
});

defineExpose({ setCurrCtx });
</script>

<template>
  <div
    :style="{ overflowY: overflowScroll ? 'auto' : 'unset' }"
    class="item-list"
  >
    <table
      v-context-menu:[listData]="currCtxConf"
      @contextmenu.prevent="setCurrCtx"
      class="item-list-table"
    >
      <thead class="list-head">
        <tr class="item-title-row">
          <th class="item">应用名</th>
          <th class="item">包名</th>
          <th class="item">启动项</th>
        </tr>
      </thead>
      <tbody ref="listBodyRef" class="list-body">
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="item-row"
          :data-app-id="item.id"
        >
          <td class="item">{{ item.appName }}</td>
          <td class="item">{{ item.packageName }}</td>
          <td class="item">{{ item.activityName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.item-list {
  box-sizing: border-box;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .item-list-table {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    box-sizing: border-box;
    table-layout: fixed;
    border-collapse: collapse;

    .row-base {
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .item-base {
      font-family: Noto Sans SC;
      font-size: 16px;
      line-height: 1.5;
      padding: 5px 0;
      font-size: 14px;
      text-align: left;
    }

    .list-head {
      position: sticky;
      top: 0;
      z-index: 999;
      transform: translateZ(0px);
      box-shadow: 0 0.5px 2px rgba(0, 0, 0, 0.1);

      .item-title-row {
        @extend .row-base;
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(2px);
        width: 100%;

        .item {
          @extend .item-base;
          font-weight: bolder;
          padding: 10px 0;
        }
      }
    }

    .item-row {
      @extend .row-base;
      &:hover,
      &.active-item-row {
        .item {
          color: #f80057;
          text-shadow: 1px 1px #f80057;
        }
      }

      .item {
        @extend .item-base;
        font-family: 'Fira Mono', 'DejaVu Sans Mono', Menlo, Consolas,
          'Liberation Mono', Monaco, 'Lucida Console', monospace;
        color: #363c82;
        transition: color 0.25s, text-shadow 0.25s;
        word-break: break-all;

        &:nth-child(1) {
          width: 100px;
        }
      }
    }
  }
}
</style>
