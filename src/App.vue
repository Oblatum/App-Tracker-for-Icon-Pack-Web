<script lang="ts" setup>
import { ref } from 'vue';
import { downloadFile, printFeatures } from '@/helpers/utils';
import { iconApi, searchApi } from './services/apis';
import type { SearchItemModel } from '@/models/data';

const loadingText = ref('loading');
printFeatures();
// downloadFile(
//   ,
// );

const testData = ref<SearchItemModel[]>(null);
const keyword = ref<string>('');

function search() {
  searchApi.search(keyword.value, 1).then(({ data }) => {
    testData.value = data.items;
  });
}

function loadIcon(evt: MouseEvent, packageName: string) {
  const el = evt.currentTarget as HTMLImageElement;
  iconApi.meta(packageName).then(({ data }) => {
    el.src = data.image;
  });
}

async function testDownload(packageName: string) {
  const { data } = await iconApi.meta(packageName);
  downloadFile(data.image, packageName);
}
</script>

<template>
  <div id="app">
    <h1>App Tracker For Iconpack</h1>
    <input v-model="keyword" type="text" />
    <button @click="search">搜索</button>
    <div
      class="line"
      v-loading:[loadingText]="true"
      v-for="(item, index) in testData"
      :key="index"
    >
      <div class="app-name">{{ item.appName }}</div>
      <div class="package-name">{{ item.packageName }}</div>
      <div class="activity-name">{{ item.activityName }}</div>
      <img
        class="app-icon"
        @click="loadIcon($event, item.packageName)"
        src="@/assets/vue.svg"
      />
      <button @click="testDownload(item.packageName)">下载图片</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin: 0;
}

.line {
  display: flex;
  justify-content: flex-start;
  font-size: 24px;
  border-bottom: 1px dashed black;
  column-gap: 20px;

  & > * {
    &::after {
      content: '|';
    }
  }
}

.app-icon {
  height: 30px;
}
</style>
