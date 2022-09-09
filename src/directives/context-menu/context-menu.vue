<script lang="ts" setup>
import type { ListDataInfoRecordModel } from '@/components/item-list/model';
import type { ContextMenuConfModel } from './model';
import { copyText, downloadFile } from '@/helpers/utils';
import { reactive, ref } from 'vue';
import { messageAlert } from '@/components/message-box/message-box';
import AppIcon from './components/app-icon.vue';
import { iconApi } from '@/services/apis';
import { deactivate } from './directive';

const rootRef = ref(null);
const itemData = ref<ListDataInfoRecordModel>(null);
const iconBinding = reactive<{ src: string }>({
  src: '',
});

function setData(data: ListDataInfoRecordModel) {
  itemData.value = data;
  fetchIcon();
}

async function fetchIcon() {
  iconBinding.src = '';
  const imgRawSrc = (await iconApi.meta(itemData.value.packageName)).data.image;
  iconBinding.src = imgRawSrc;
}

const conf: ContextMenuConfModel = [
  {
    label: AppIcon,
    binding: iconBinding,
    onclick: () => {
      if (iconBinding.src) {
        downloadFile(iconBinding.src, itemData.value.packageName).then(() => {
          deactivate(rootRef.value);
        });
      }
    },
    type: 'custom',
  },
  {
    title: '复制选项',
    items: [
      {
        label: '复制 应用名',
        onclick: () => copyAppInfo('appName'),
      },
      {
        label: '复制 包名',
        onclick: () => copyAppInfo('packageName'),
      },
      {
        label: '复制 启动项',
        onclick: () => copyAppInfo('activityName'),
      },
      {
        label: '复制 XML',
        onclick: () => copyAppInfo('appFilter'),
      },
    ],
  },
];

function copyAppInfo(key: keyof ListDataInfoRecordModel) {
  copyText(itemData.value[key]).then(() => {
    console.log(
      '%c' + itemData.value[key] + '%ccopy success!',
      'color: #ffffff;background-color: #4b57ff;padding: 5px;',
      'color: #ffffff; background-color: #333333;padding: 5px;',
    );
    messageAlert(`复制成功 ${itemData.value[key]}`);
  });
}

defineExpose({
  setData,
});
</script>

<template>
  <div ref="rootRef" class="context-menu">
    <template v-for="(item, index) in conf" :key="index">
      <div v-if="'title' in item" class="context-menu-group">
        <div class="context-menu-group-title">{{ item.title }}</div>
        <div class="context-menu-group-items">
          <div
            v-for="(it, i) in item.items"
            :key="i"
            @click="it.onclick"
            :type="it.type"
            class="context-menu-item"
          >
            <template v-if="typeof it.label === 'string'">
              {{ it.label }}
            </template>
            <template v-else>
              <component :is="it.label" v-bind="it.binding" />
            </template>
          </div>
        </div>
      </div>
      <div
        v-else
        @click="item.onclick"
        :type="item.type"
        class="context-menu-item"
      >
        <template v-if="typeof item.label === 'string'">
          {{ item.label }}
        </template>
        <template v-else>
          <component :is="item.label" v-bind="item.binding" />
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  left: 100px;
  top: 100px;
  width: 120px;
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
    width: 4px;
    height: 4px;
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
    font-size: 12px;
    color: #333333;
    padding: 4px 6px;
    transition: background-color 0.2s;

    &:hover {
      color: #4b57ff;
      background-color: #e1e5ff;
    }
  }
}
</style>
