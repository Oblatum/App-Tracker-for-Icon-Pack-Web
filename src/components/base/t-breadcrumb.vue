<template>
  <div class="breadcrumb" v-if="crumbs.length">
    <template v-for="(item, index) in crumbs" :key="index">
      <span class="crumb-item">{{ item }}</span>
      <span v-if="+index !== crumbs.length - 1"><svg t="1653143672977" class="icon" fill="#707070" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="5454" width="14" height="14">
          <path
            d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z"
            p-id="5455"></path>
        </svg></span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import emitter from "../mitt";

const crumbs = ref<string[]>([])
emitter.on('searched', (val) => {
  crumbs.value.splice(0, crumbs.value.length, ...val as string[])
})

</script>

<style lang="scss">
.breadcrumb {
  width: 100%;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0);
  border-radius: 10px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
  padding: 0.25rem 0;
  user-select: none;

  .crumb-item {
    display: inline-block;
    padding: 0.25rem 0;
    color: #707070;
    font-weight: lighter;
  }
}
</style>