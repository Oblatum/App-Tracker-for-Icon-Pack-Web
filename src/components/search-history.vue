<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';

defineProps<{
  data: string[]
}>()
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in data" :key="index">{{ item }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>