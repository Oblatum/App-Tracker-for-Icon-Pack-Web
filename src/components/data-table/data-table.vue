<script lang="ts" setup>
import { useStore } from '@/store'
import type { IResultItem } from '@/typings/data'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const store = useStore()
defineProps<{
  data: IResultItem[]
}>()
</script>

<template>
  <el-table v-if="!!store.__LAST_SEARCH_TYPE" :data="data">
    <el-table-column prop="appName" :label="t('app_name')" />
    <el-table-column prop="packageName" :label="t('package_name')" />
    <el-table-column prop="activityName" :label="t('activity_name')"/>
  </el-table>
</template>