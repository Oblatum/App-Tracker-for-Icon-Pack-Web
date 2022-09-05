<script lang="ts" setup>
import { h, ref } from 'vue';
import ItemList from '@/components/item-list/item-list.vue';
import DataPagination from '@/components/data-pagination/data-pagination.vue';
import TypeSelect from './components/type-select/type-select.vue';
import InputBox from './components/input-box/input-box.vue';
import { searchApi } from './services/apis';
import type { SearchItemModel } from './models/data';
import { messageAlert } from './components/message-box/message-box';

const data = ref<SearchItemModel[]>([]);
const kw = ref('');
const loadingText = ref('loading');
const loading = ref(false);
const typeSelectCnf = [
  {
    value: 'keyword',
    label: '关键词',
  },
  {
    value: 'regexp',
    label: '正则表达式',
  },
  {
    value: 'view',
    label: '浏览全部',
  },
  {
    value: 'signature',
    label: '签名搜索',
  },
];

const searchType = ref(typeSelectCnf[0].value);

async function handleSearch(kw: string) {
  loading.value = true;
  const { items } = (await searchApi.search(kw, 1, 20)).data;
  data.value = items;
  loading.value = false;
}
</script>

<template>
  <div class="test">
    <h1>App Tracker For Iconpack!</h1>
    <div class="form">
      <type-select v-model="searchType" :options="typeSelectCnf" />
      <input-box
        v-model="kw"
        @enter="handleSearch(kw)"
        placeholder="Keyword"
        type="text"
      />
      <button @click="handleSearch(kw)">搜索</button>
    </div>
  </div>
  <div v-loading:[loadingText]="loading">
    <item-list v-if="!loading && data.length" :items="data" class="res-list" />
  </div>
  <data-pagination />
  <button @click="messageAlert(h('h1', null, h('a', null, '有内鬼')))">
    弹出消息
  </button>
</template>

<style lang="scss" scoped>
.test {
  display: flex;
  justify-content: center;
  flex-direction: column;
  h1 {
    font-size: 30px;
    text-align: center;
  }

  .form {
    display: flex;
    justify-content: center;
    flex-direction: row;

    input,
    button {
      padding: 10px;
    }
  }
}

.res-list {
  max-height: calc(100vh - 180px);
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 20px;
  background-color: #f4f3fc;
  background-origin: content-box;
}
</style>
