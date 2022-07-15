<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import MessageAlert from '@/components/message-alert.vue'
import HBanner from '@/components/h-banner.vue'
import DataForm from '@/components/data-form'

</script>

<template>
  <div class="home">
    <message-alert />
    <h-banner />
    <el-row>
      <el-col :offset="4" :span="16">
        <data-form />
      </el-col>
    </el-row>

  </div>
</template>

<style lang="scss" scoped>

</style>