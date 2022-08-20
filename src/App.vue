<script lang="ts" setup>
import { reactive, ref } from 'vue';
import ItemList from '@/components/item-list/item-list.vue';
import { searchApi } from './services/apis';
import { SearchItemModel } from './models/data';

// const ctxMenuCnf = reactive({

// });

const data = ref<SearchItemModel[]>(null);

const conf = reactive({
  appName: 'QQ',
  id: '114514',
});

async function initData() {
  const { items } = (await searchApi.view(2, 20)).data;
  data.value = items;
}

initData();
</script>

<template>
  <div id="app">
    <item-list v-if="data" :items="data" />
  </div>
</template>
