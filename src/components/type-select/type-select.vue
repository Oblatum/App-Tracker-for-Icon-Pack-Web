<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  options: {
    label: string;
    value: string;
  }[];
}>();

const emit = defineEmits(['update:modelValue']);

const selectRef = ref<HTMLSelectElement>(null);

function updateModel() {
  emit('update:modelValue', props.options[selectRef.value.selectedIndex].value);
}
</script>

<template>
  <select ref="selectRef" @input="updateModel">
    <option v-for="item in options" :value="item.value" :key="item.value">
      {{ item.label }}
    </option>
  </select>
</template>
