<script lang="ts" setup></script>

<template>
  <el-alert type="success" center effect="dark">
    <template #title>
      <span class="alert"
        >两分钟时间，下载 Android 客户端帮助我们丰富数据库
        <a
          href="https://github.com/Oblatum/App-Tracker-for-Icon-Pack-Client-Side-Android-Version/releases/latest"
          target="_blank"
          >Github</a
        >
        <a href="http://www.coolapk.com/apk/ren.imyan.app_tracker" target="_blank">酷安</a>
      </span>
    </template>
  </el-alert>
</template>

<style lang="scss" scoped>
.alert {
  font-size: 14px;
  line-height: 1.5;

  a {
    color: #fff;
    text-underline-offset: 2px;
    text-decoration: underline;
    transition: all 0.2s;
    padding-right: 5px;

    &:hover {
      text-shadow: 0 0 5px rgba($color: #ffffff, $alpha: 0.7);
    }
  }
}
</style>
