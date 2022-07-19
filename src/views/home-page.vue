<script lang="ts" setup>
import LangSwitch from '@/components/lang-switch.vue'
import MessageAlert from '@/components/message-alert.vue'
import HBanner from '@/components/h-banner.vue'
import DataForm from '@/components/data-form'
import SearchHistory from '@/components/search-history.vue'

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
    <search-history :data="['sousuo', 'bab']"/>
    <lang-switch />
  </div>
</template>

<style lang="scss" scoped>

</style>