<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const languages = reactive([
  {
    label: 'en',
    value: 'en'
  },
  {
    label: '简体中文',
    value: 'zh-CN'
  }
]);

const currentLanguage = ref(locale.value)

const handleLangChange = () => {
  locale.value = currentLanguage.value
}
</script>

<template>
  <el-select v-model="currentLanguage" @change="handleLangChange">
    <el-option v-for="lang in languages" :label="lang.label" :value="lang.value" :key="lang.value"></el-option>
  </el-select>
</template>
