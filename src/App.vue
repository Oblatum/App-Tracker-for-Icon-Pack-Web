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
const typeSelectCnf: {
  value: keyof typeof searchApi;
  label: string;
}[] = [
  {
    value: 'keyword',
    label: '关键词',
  },
  {
    value: 'regex',
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
  let items = {} as SearchItemModel[];
  switch (searchType.value) {
    case 'keyword':
      items = (await searchApi.keyword(kw, 1, 30)).data.items;
      break;
    case 'regex':
      items = (await searchApi.regex(kw, 1, 30)).data.items;
      break;
    case 'view':
      items = (await searchApi.view(1, 30)).data.items;
      break;
    // case 'signature':
    //   break;
    default:
      break;
  }
  data.value = items;
  loading.value = false;
}
</script>

<template>
  <div class="test">
    <h1 class="app-title">App Tracker For Iconpack!</h1>
    <div class="form">
      <type-select
        class="search-type"
        v-model="searchType"
        :options="typeSelectCnf"
      />
      <input-box
        v-model="kw"
        @enter="handleSearch(kw)"
        placeholder="Keyword"
        type="text"
      />
      <button class="submit-btn" @click="handleSearch(kw)">搜索</button>
    </div>
  </div>
  <div class="list-wrapper" v-loading:[loadingText]="loading">
    <item-list v-if="!loading && data.length" :items="data" class="res-list" />
  </div>
  <data-pagination />
  <button @click="messageAlert(h('h1', null, h('a', null, '哈哈')))">
    弹出消息
  </button>
  <footer>©2022-2022&nbsp;Indusy&nbsp;Oblatum&nbsp;反馈群：868795356</footer>
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

  .app-title {
    color: #6f79ff;
  }

  .form {
    display: flex;
    justify-content: center;
    flex-direction: row;

    input,
    button {
      padding: 10px;
    }

    .submit-btn {
      background-color: #858dff;
      border: 0;
      color: #ffffff;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}

.list-wrapper {
  box-sizing: border-box;
  padding: 10px;
  .res-list {
    max-height: calc(100vh - 180px);
    // background-color: rgb(250, 249, 255);
  }
}
</style>
