<template>
  <div class="form-wrap">
    <form class="form" @submit.prevent="handleSubmit">
      <select ref="selectRef" v-model="currentType" @change="changeDisabled">
        <option v-for="item in searchType" :key="item.value" :value="item.value">{{ item.text }}</option>
      </select>
      <input type="text" v-model="keyword" :required="!inputDisabled" :disabled="inputDisabled" :placeholder="currentPlaceholder" >
      <button class="btn" type="submit"><svg t="1653130909358" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="1458" width="16" height="16">
          <path
            d="M900.3008 850.2784l-131.9424-127.488c58.5728-65.4336 94.3104-151.7568 94.3104-246.272 0-203.776-165.7856-369.5616-369.5616-369.5616S123.4944 272.7424 123.4944 476.5184s165.7856 369.5616 369.5616 369.5616c83.456 0 160.512-27.8528 222.464-74.7008l134.9632 130.4064a35.7888 35.7888 0 0 0 24.8832 10.0864c9.3696 0 18.7392-3.6352 25.7536-10.9568 13.824-14.1824 13.4144-36.864-0.8192-50.6368z m-705.1264-373.76c0-164.2496 133.632-297.8816 297.8816-297.8816s297.8816 133.632 297.8816 297.8816-133.632 297.8816-297.8816 297.8816-297.8816-133.632-297.8816-297.8816z"
            fill="#34332E" p-id="1459"></path>
        </svg></button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { getAll, getRegex, getSearch, getSignature } from './fetch';
import emitter from '../mitt'

const searchType = reactive([
  {
    value: 1,
    text: "搜索",
    placeholder: "Keywords..."
  },
  {
    value: 2,
    text: "正则",
    placeholder: "Regex..."
  },
  {
    value: 3,
    text: "来源",
    placeholder: "Signature..."
  },
  {
    value: 4,
    text: "浏览",
    placeholder: "Browse all"
  }
])

const currentType = ref(1)
const inputDisabled = ref(false)

function changeDisabled() {
  if (currentType.value == 4)
    inputDisabled.value = true
  else
    inputDisabled.value = false
}

const currentPlaceholder = computed(() => {
  return searchType.find((v) => {
    return v.value === currentType.value
  })?.placeholder
})

function debounce<T, K>(func: (...args: unknown[]) => T, delay = 300, immediate = true) {
  let timer = 0
  return function (this: K) {
    if (immediate && !timer) {
      func.apply(this, Array.prototype.slice.call(arguments))
      timer = setTimeout(() => {
        timer = 0
      }, delay)
    } else {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, Array.prototype.slice.call(arguments))
        timer = 0
      }, delay)
    }
  }
}

const keyword = ref<string>('')
const selectRef = ref<HTMLSelectElement | null>(null)

const handleSubmit = debounce<void, Event>(submitForm)

function emitSearch() {
  emitter.emit('searched', ['搜索结果', searchType.find(val => {
        return +selectRef!.value!.value === val.value
      })?.text.trim(), keyword.value])
}

function submitForm() {
  switch (currentType.value) {
    case 1:
      emitSearch()
      emitter.emit('update', getSearch({q: encodeURIComponent(keyword.value.trim())}))
      break
    case 2:
      emitSearch()
      emitter.emit('update', getRegex({regex: encodeURIComponent(keyword.value.trim())}))
      break
    case 3:
      emitSearch()
      emitter.emit('update', getSignature({signature: encodeURIComponent(keyword.value.trim())}))
      break
    case 4:
      emitSearch()
      emitter.emit('update', getAll())
      break
  }
}

</script>

<style lang="scss" scoped>
.form-wrap {
  display: flex;
  justify-content: center;
}

.form {
  display: flex;
  width: fit-content;
  height: fit-content;
  box-shadow: 3px 3px #eb6565,
    6px 6px #0d8f6e,
    9px 9px #6666e4,
    12px 12px #ddd,
    15px 15px #ddd;
  ;
  flex-wrap: wrap;

  &>* {
    height: 2rem;
    border: 0;
    outline: 0;
    color: #9d9d9d;
  }

  &>input {
    flex-grow: 1;
    max-width: 30rem;
    min-width: 15rem;
    padding-left: 1rem;
    box-sizing: border-box;
  }

  &>select {
    width: 4rem;
  }

  &>button {
    width: 2rem;
  }
}

.btn {
  cursor: pointer;
  transition: all 0.5s;

  &:active {
    background-color: rgb(215, 215, 215);

    svg {
      padding: 2px 0px 0px 2px;
    }
  }
}
</style>
