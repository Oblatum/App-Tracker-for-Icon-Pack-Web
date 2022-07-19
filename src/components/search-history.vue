<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';

const props = defineProps<{
  data: string[]
}>()

const realData = props.data.filter(v => !!v)
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in realData" :key="index">{{ item }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>