<template>
  <div class="banner" ref="rootRef">
    <div class="content">
      <slot></slot>
    </div>
    <div class="x" ref="closeRef">
      <svg t="1653135439551" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4661" width="32" height="32"><path fill="#3e54fe" d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="4662"></path></svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const rootRef = ref<HTMLElement|null>(null)
const closeRef = ref<HTMLElement|null>(null)

onMounted(() => {
  (closeRef.value as HTMLElement).addEventListener('click', () => {
    (rootRef.value as HTMLElement).remove()
  }, {once: true})
})

</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(115, 255, 162, 0.8);
  border-bottom: 1px solid rgba(87, 241, 87, 0.8);
  box-shadow: 0 3px 5px rgba(32, 255, 106, 0.8);
  text-align: center;

  .content {
    flex-grow: 1;
    color: #3e54fe;
    padding: 0.5rem;
    text-shadow: 
    0 0 5px #3a8bfc,
    0 0 20px #79aaff,
    0 0 25px #acf3ff
    ;
  }
  .x {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}
</style>