<script lang="ts" setup>
import SearchBox from './components/search-box.vue';
import InfoList from './components/info-list.vue';
import AppFooter from './components/app-footer.vue';
</script>

<template>
  <div class="home">
    <h1>App Tracker For Icon Pack<span class="blink_">_</span></h1>
    <search-box></search-box>
    <info-list style="margin-top: 20px"></info-list>
    <app-footer></app-footer>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  .blink_ {
    animation: blink 1s steps(1) infinite;
  }
}

@keyframes blink {
  50% {
    color: transparent;
  }
}
</style>
