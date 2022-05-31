<template>
  <router-view />
</template>

<script lang="ts" setup>

import vhCheck from 'vh-check'
import { onMounted } from 'vue'

onMounted(() => {
  document.documentElement.style.setProperty('--vh-offset', vhCheck().offset + 'px')
})
</script>