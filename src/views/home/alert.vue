<script lang="ts" setup>
import AtAlert from '@/components/at-alert.vue';
</script>

<template>
  <at-alert center type="primary" effect="dark">
    <template #title>
      <span class="alert-message"
        >两分钟时间，下载 Android 客户端帮助我们丰富数据库
        <a
          href="https://github.com/Oblatum/App-Tracker-for-Icon-Pack-Client-Side-Android-Version/releases/latest"
          target="_blank"
          >Github</a
        >
        <a href="http://www.coolapk.com/apk/ren.imyan.app_tracker" target="_blank">酷安</a>
      </span>
    </template>
  </at-alert>
</template>

<style lang="scss" scoped>
.alert-message {
  a {
    color: white;
    margin-left: 4px;

    &:hover {
      color: #ff8ed4;
    }
  }
}
</style>
