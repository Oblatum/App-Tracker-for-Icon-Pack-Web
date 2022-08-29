<script lang="ts" setup>
import type { ListDataInfoRecordModel } from '@/components/item-list/model';
import type { ContextMenuConfModel } from './model';
import { copyText } from '@/helpers/utils';
import { reactive, ref } from 'vue';

const itemData = ref<ListDataInfoRecordModel>(null);

function setData(data: ListDataInfoRecordModel) {
  itemData.value = data;
}

const conf = reactive<ContextMenuConfModel>([
  {
    label: '图标 placeholder',
    action: () => 0,
  },
  {
    title: '复制选项',
    items: [
      {
        label: '复制 应用名',
        action: () => copyAppInfo('appName'),
      },
      {
        label: '复制 包名',
        action: () => copyAppInfo('packageName'),
      },
      {
        label: '复制 启动项',
        action: () => copyAppInfo('activityName'),
      },
      {
        label: '复制 XML',
        action: () => copyAppInfo('appFilter'),
      },
    ],
  },
]);

function copyAppInfo(key: keyof ListDataInfoRecordModel) {
  copyText(itemData.value[key]).then(() => {
    console.log(
      '%c' + itemData.value[key] + '%ccopy success!',
      'color: #ffffff;background-color: #4b57ff;padding: 5px;',
      'color: #ffffff; background-color: #333333;padding: 5px;',
    );
  });
}

defineExpose({
  setData,
});
</script>

<template>
  <div class="context-menu">
    <template v-for="(item, index) in conf" :key="index">
      <div v-if="'title' in item" class="context-menu-group">
        <div class="context-menu-group-title">{{ item.title }}</div>
        <div class="context-menu-group-items">
          <div
            v-for="(it, i) in item.items"
            :key="i"
            @click="it.action"
            class="context-menu-item"
          >
            {{ it.label }}
          </div>
        </div>
      </div>
      <div v-else @click="item.action" class="context-menu-item">
        {{ item.label }}
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  left: 100px;
  top: 100px;
  width: 150px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 4px 4px 20px rgba($color: #000000, $alpha: 0.2);
  padding: 5px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  &.left-top {
    &::after {
      left: 0;
      top: 0;
      clip-path: polygon(100% 0, 0 0, 0 100%);
    }
  }

  &.left-bottom {
    &::after {
      left: 0;
      bottom: 0;
      clip-path: polygon(0 0, 0 100%, 100% 100%);
    }
  }

  &.right-top {
    &::after {
      right: 0;
      top: 0;
      clip-path: polygon(0 0, 100% 100%, 100% 0);
    }
  }

  &.right-bottom {
    &::after {
      right: 0;
      bottom: 0;
      clip-path: polygon(0 100%, 100% 0, 100% 100%);
    }
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #4b57ff;
  }

  &-group {
    &-title {
      padding: 6px 6px;
      font-size: 10px;
      color: #000000;
      font-weight: 600;
    }
  }

  &-item {
    cursor: pointer;
    font-size: 14px;
    color: #333333;
    padding: 6px 6px;
    transition: background-color 0.2s;

    &:hover {
      color: #4b57ff;
      background-color: #e1e5ff;
    }
  }
}
</style>
