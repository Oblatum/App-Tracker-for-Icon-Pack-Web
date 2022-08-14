<script lang="ts" setup>
import { printFeatures } from '@/helpers/utils';
import { ref } from 'vue';
import { iconApi, searchApi } from './services/apis';
printFeatures();

const testData = ref<string>(null);
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
</script>

<template>
  <div id="app">
    <h1>App Tracker For Iconpack</h1>
    <input v-model="keyword" type="text" />
    <button @click="search">搜索</button>
    <div class="line" v-for="item in testData" :key="item">
      <div class="app-name">{{ item.appName }}</div>
      <div class="package-name">{{ item.packageName }}</div>
      <div class="activity-name">{{ item.activityName }}</div>
      <img
        class="app-icon"
        @click="loadIcon($event, item.packageName)"
        src="@/assets/vue.svg"
      />
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
