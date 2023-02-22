<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import RegexSelect from './regex-select.vue';
import { ref } from 'vue';

const inputRef = ref<HTMLInputElement>(null);
const isFocus = ref(false);
const isRegex = ref(false);
</script>

<template>
  <br />
  <div role="option" style="width: 500px" class="search-box">
    <regex-select v-model="isRegex" class="regex" :class="{ active: false }" @click="isRegex = !isRegex" />
    <div class="input-box" :class="{ focus: isFocus }">
      <input ref="inputRef" type="text" @focus="isFocus = true" @blur="isFocus = false" />
      <icon class="search-icon" icon="ic:outline-search" height="24" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;

  .input-box {
    display: flex;
    align-items: center;
    border-radius: 2px;
    box-shadow: 1px 2px 5px var(--color-gray-shadow);
    transition: all 0.2s;
    box-sizing: border-box;
    padding: 0 5px;
    flex: 1;

    &.focus {
      transform: scale(1.02);
      box-shadow: 1px 2px 8px var(--color-primary-light);
      background-color: var(--color-primary);
      color: var(--color-white-text);
    }

    input {
      background-color: rgba(0, 0, 0, 0);
      font-size: 14px;
      border: 0;
      height: 30px;
      flex: 1;
      outline: 0;
      padding: 2px 5px;
      padding-right: 10px;
      color: inherit;
    }

    .search-icon {
      cursor: pointer;
    }
  }
}
</style>
