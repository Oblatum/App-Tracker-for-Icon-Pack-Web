<script lang="ts" setup>
import { ref, watch } from 'vue';

const title = ref<string>('yAnrEn]]');
const bodyColor = ref<string>('#ffffff');

function changeTitle() {
  title.value = [...title.value].reverse().join('');
}

const count = ref<number>(1);

watch(
  bodyColor,
  (value) => {
    document.body.style.background = value;
  },
  {
    immediate: true,
  }
);

const blockRef = ref<HTMLElement>(null!);
</script>

<template>
  <div>添加此元素可避免 h1 margin 与 body 重叠</div>
  <h1 style="text-align: center">{{ title }}</h1>
  <h1 style="text-align: center">{{ [...title].reverse().join('') }}</h1>
  <label :style="`background-color: ${bodyColor}`" class="float-color-picker">
    <input v-model="bodyColor" type="color" />
  </label>
  <button style="display: block; margin: auto" @click="changeTitle">反转了</button>
  <button
    @click="
      () => {
        count++;
        ($refs.blockRef as HTMLButtonElement).style.transform = `rotate(${count}deg)`;
      }
    "
    style="background-image: linear-gradient(red, blue); width: 200px"
    :style="`height: ${100 * count}px`"
    ref="blockRef"
  ></button>
</template>

<style lang="scss" scoped>
.float-color-picker {
  border-radius: 50%;
  background-image: url('@images/yydz.png');
  background-size: cover;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 0px 10px 10px rgb(255, 255, 255);
  position: fixed;
  right: 30px;
  top: 30px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: all 0.2s;
    background-color: rgba(0, 0, 0, 0.846);
  }

  & > input[type='color'] {
    opacity: 0;
    cursor: pointer;
  }
}
</style>
