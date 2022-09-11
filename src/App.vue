<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import ItemList from '@/components/item-list/item-list.vue';
// import DataPagination from '@/components/data-pagination/data-pagination.vue';
import TypeSelect from './components/type-select/type-select.vue';
import InputBox from './components/input-box/input-box.vue';
import { searchApi } from './services/apis';
import type { SearchItemModel } from './models/data';
import { debounce } from 'lodash-es';

const data = ref<SearchItemModel[]>([]);
const kw = ref('');
// const page = ref(1);
const itemListWrapRef = ref<HTMLElement>(null);

const vh = ref(document.documentElement.clientHeight);
const listOffsetTop = ref(0);
const loadingText = ref('loading');
const loading = ref(false);
const listHeight = computed(() => vh.value - listOffsetTop.value - 50);
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

function setResizeListener() {
  window.onresize = debounce(
    () => {
      listOffsetTop.value = itemListWrapRef.value?.offsetTop;
      vh.value = document.documentElement.clientHeight;
    },
    300,
    {
      trailing: true,
    },
  );
}

async function handleSearch(kw: string) {
  loading.value = true;
  let items = {} as SearchItemModel[];
  switch (searchType.value) {
    case 'keyword':
      items = (await searchApi.keyword(kw, 1, 2147483647)).data.items;
      break;
    case 'regex':
      items = (await searchApi.regex(kw, 1, 2147483647)).data.items;
      break;
    case 'view':
      items = (await searchApi.view(1, 2147483647)).data.items;
      break;
    case 'signature':
      items = (await searchApi.signature(kw, 2147483647)).data.items;
      break;
    default:
      break;
  }
  data.value = items;
  loading.value = false;
}

onMounted(() => {
  listOffsetTop.value = itemListWrapRef.value.offsetTop;
  setResizeListener();
});
</script>

<template>
  <div class="main-content">
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
        :placeholder="searchType"
        :disabled="searchType === 'view'"
        type="text"
      />
      <button class="submit-btn" @click="handleSearch(kw)">搜索</button>
    </div>
  </div>
  <div
    ref="itemListWrapRef"
    class="list-wrapper"
    v-loading:[loadingText]="loading"
  >
    <item-list
      v-if="!loading && data.length"
      :style="{ height: `${listHeight}px` }"
      :items="data"
      class="res-list"
    />
  </div>
  <!-- <data-pagination v-model="page" v-if="!loading && data.length" /> -->
  <!-- <button @click="messageAlert(h('h1', null, h('a', null, '哈哈')))">
    弹出消息
  </button> -->
  <footer class="footer">
    <span class="footer-split">
      ©2022-2022 Indusy
      <a href="https://github.com/Oblatum/App-Tracker-for-Icon-Pack-Web">
        Oblatum
      </a>
    </span>
    <span class="footer-split">
      App 下载
      <a href="">酷安</a>
      <a href="">Github</a>
    </span>
    <span class="footer-split">反馈群：868795356</span>
  </footer>
</template>

<style lang="scss" scoped>
.main-content {
  display: flex;
  justify-content: center;
  flex-direction: column;

  .app-title {
    font-size: 30px;
    text-align: center;
    text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
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
  padding: 10px 20px;
}
.footer {
  width: 100%;
  text-align: center;
  .footer-split {
    margin-right: 10px;
    a {
      color: #4955fc;
      padding: 0 2px;
    }

    &:nth-last-child(1) {
      margin: unset;
    }
  }
}
</style>
