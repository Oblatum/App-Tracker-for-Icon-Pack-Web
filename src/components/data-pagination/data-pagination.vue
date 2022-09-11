<script lang="ts" setup>
defineProps<{
  modelValue: number;
}>();
</script>

<template>
  <div class="pagination">
    <button>上页</button>
    <input
      :value="modelValue"
      type="number"
      @input="$emit('update:modelValue')"
      class="page-select"
    />
    <button>下页</button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  .page-select {
    border: 2px solid #4b57ff;
    background-color: #f4f3fc;
    padding: 5px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  }

  button {
    border: 2px solid #4b57ff;
    border-radius: 10px;
    color: #4b57ff;
    padding: 5px;
    background-color: #fff;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  }
}
</style>
