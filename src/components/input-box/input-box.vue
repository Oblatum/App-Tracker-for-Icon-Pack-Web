<script lang="ts" setup>
defineProps<{
  placeholder?: string;
  modelValue: string;
}>();

defineEmits(['update:modelValue', 'enter']);
</script>

<template>
  <div class="input-box">
    <input
      :value="modelValue"
      @keypress.enter="$emit('enter')"
      @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      type="text"
    />
  </div>
</template>

<style lang="scss" scoped>
.input-box {
  height: 40px;
  width: 200px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;

  input {
    width: 100%;
    height: 100%;
    outline: none;
    padding: 10px;
    border: 0;
    box-sizing: border-box;
    background-color: #f4f3fc;

    &::placeholder {
      color: #848297;
    }
  }
}
</style>
