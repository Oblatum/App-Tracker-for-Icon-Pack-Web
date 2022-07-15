<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

</script>

<template>
  <div class="home" v-text="t('hello')">
  </div>
</template>
