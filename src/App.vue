<script lang="ts" setup>
import { ref } from 'vue';
import ItemList from '@/components/item-list/item-list.vue';
import { searchApi } from './services/apis';
import type { SearchItemModel } from './models/data';

const data = ref<SearchItemModel[]>(null);
const kw = ref('');

async function handleSearch(kw: string) {
  const { items } = (await searchApi.search(kw, 1, 20)).data;
  data.value = items;
}
</script>

<template>
  <div class="test">
    <h1>App Tracker For Iconpack!</h1>
    <div class="form">
      <input v-model="kw" type="text" />
      <button @click="handleSearch(kw)">搜索</button>
    </div>
  </div>
  <item-list v-if="data" :items="data" />
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
</style>
