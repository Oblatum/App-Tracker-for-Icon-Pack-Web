<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

const currentLocale = computed(() => (locale.value === 'zh-CN' ? zhCn : en));
locale.value = window.navigator.language === 'zh-CN' ? 'zh-CN' : 'en';
</script>

<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>
