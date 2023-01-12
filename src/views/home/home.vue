<script lang="ts" setup>
import { ref } from 'vue';
import Alert from './alert.vue';
import Banner from './banner.vue';
import Tracker from './tracker.vue';
import InfoList from './info-list.vue';

const data = ref(null);
const currentPage = ref(1);
const pageSize = ref(20);
const isLoading = ref(false);

const kw = ref('');
const searchType = ref<'keyword' | 'regex'>('keyword');

const trackerRef = ref<InstanceType<typeof Tracker>>(null);
</script>
<template>
  <alert />
  <div class="main-content">
    <banner />
    <tracker
      ref="trackerRef"
      v-model:keyword="kw"
      v-model:search-type="searchType"
      v-model:data="data"
      v-model:current-page="currentPage"
      v-model:is-loading="isLoading"
      class="tracker"
      :page-size="pageSize"
    />
    <info-list
      v-if="data"
      v-model:page-size="pageSize"
      :is-loading="isLoading"
      :current-page="currentPage"
      :data="data"
      @update:current-page="
        currentPage = $event;
        $nextTick(() => trackerRef.fetchData({ kw, searchType }));
      "
      @update:page-size="
        pageSize = $event;
        $nextTick(() => trackerRef.fetchData({ kw, searchType }));
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
}
</style>
