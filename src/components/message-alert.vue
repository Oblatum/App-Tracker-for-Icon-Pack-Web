<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <el-alert type="success" center effect="dark">
    <template #title>
      <span class="alert"
        >{{ t('top_message') }}
        <a
          href="https://github.com/Oblatum/App-Tracker-for-Icon-Pack-Client-Side-Android-Version/releases/latest"
          target="_blank"
          >Github</a
        >
        <a
          href="http://www.coolapk.com/apk/ren.imyan.app_tracker"
          target="_blank"
          >{{ t('coolapk') }}</a
        >
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
