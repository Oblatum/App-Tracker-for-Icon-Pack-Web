<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { appInfo, GetAppInfoResponse } from '@/api/app-info';

const props = defineProps<{
  data: GetAppInfoResponse;
  currentPage: number;
  pageSize: number;
  keyword: string;
  searchType: string;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (name: 'update:data', event: GetAppInfoResponse): void;
  (name: 'update:current-page', event: number): void;
  (name: 'update:keyword', event: string): void;
  (name: 'update:search-type', event: string): void;
  (name: 'update:is-loading', event: boolean): void;
}>();

const newSearchType = ref<'keyword' | 'regex'>('keyword');
const newKeyword = ref('');

const searchOptions: {
  label: string;
  value: 'keyword' | 'regex';
}[] = [
  {
    label: '关键词',
    value: 'keyword',
  },
  {
    label: '正则',
    value: 'regex',
  },
];

async function fetchData(config?: { kw?: string; searchType?: 'keyword' | 'regex' }) {
  let kw: string;
  let searchType: 'keyword' | 'regex';
  if (config) {
    kw = config.kw;
    searchType = config.searchType;
  }
  kw ??= newKeyword.value;
  searchType ??= newSearchType.value;
  emit('update:is-loading', true);
  await nextTick();
  const { data } = await appInfo.getAppInfo(
    searchType === 'keyword'
      ? { q: kw, per: props.pageSize, page: props.currentPage }
      : {
          regex: kw,
          per: props.pageSize,
          page: props.currentPage,
        }
  );
  emit('update:is-loading', false);
  emit('update:data', data);
}

async function submit() {
  if (newKeyword.value === '') throw '请填写信息';
  if (newKeyword.value === props.keyword && newSearchType.value === props.searchType) return;
  emit('update:current-page', 1);
  await nextTick();
  await fetchData();
  emit('update:keyword', newKeyword.value);
  emit('update:search-type', newSearchType.value);
}

defineExpose({
  fetchData,
});
</script>

<template>
  <div class="tracker">
    <el-select v-model="newSearchType" style="width: 150px" placement="bottom">
      <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-model="newKeyword" @keypress.enter="submit" />
    <el-button type="primary" :icon="Search" @click="submit" />
  </div>
</template>

<style lang="scss" scoped>
.tracker {
  display: inline-flex;
  column-gap: 5px;
}
</style>
