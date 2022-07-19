<script lang="ts" setup>
import LangSwitch from '@/components/lang-switch.vue';
import MessageAlert from '@/components/message-alert.vue';
import HBanner from '@/components/h-banner.vue';
import DataForm from '@/components/data-form';
import SearchHistory from '@/components/search-history.vue';
import DataTable from '@/components/data-table/data-table.vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/store';
import { reactive, ref } from 'vue';
const { t } = useI18n();
const store = useStore();
const tableData = ref(store.__LAST_RESULT_DATA.items);
store.$onAction(({ name, store, after }) => {
  if (name === 'updateSearchOptions') {
    after(() => {
      tableData.value = store.__LAST_RESULT_DATA.items;
      
    });
  }
});
const breadData = reactive([
        t('search_result'),
        t(store.__LAST_SEARCH_TYPE),
        store.__LAST_SIGNATURE,
        store.__LAST_KEYWORD,
      ])
</script>

<template>
  <div class="home">
    <message-alert />
    <h-banner />
    <el-row>
      <el-col :offset="2" :span="20">
        <data-form />
      </el-col>
    </el-row>
    <search-history
      v-if="!!store.__LAST_SEARCH_TYPE"
      :data="breadData"
    />
    <data-table :data="tableData" />
    <lang-switch />
  </div>
</template>

<style lang="scss" scoped></style>
