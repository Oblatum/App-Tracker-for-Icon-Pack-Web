<script lang="ts" setup>
import { GetAppInfoResponse } from '@/api/app-info';
import { ElMessage } from 'element-plus';
import { appfilter } from './utils';

defineProps<{
  data: GetAppInfoResponse;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
}>();

defineEmits<{
  (name: 'update:current-page', event: number): void;
  (name: 'update:page-size', event: number): void;
}>();

async function copy(text: string) {
  await navigator.clipboard.writeText(text);
  ElMessage.success('复制成功');
}
</script>

<template>
  <div class="info-list">
    <el-table v-loading="isLoading" :data="data.items" height="500">
      <el-table-column prop="appName" label="应用名" width="200" />
      <el-table-column prop="packageName" label="包名" width="200" />
      <el-table-column prop="activityName" label="启动项" width="300" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="copy(appfilter(row.appName, row.packageName, row.activityName))"
          >
            复制 appfilter
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="data.metadata.total"
      @current-change="$emit('update:current-page', $event)"
      @size-change="$emit('update:page-size', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.info-list {
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
}
</style>
