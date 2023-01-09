<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  type: 'success' | 'warning' | 'info' | 'error' | 'primary';
}>();

const realType = computed(() => (props.type === 'primary' ? 'info' : props.type));
</script>

<template>
  <el-alert :type="realType" :class="{ 'el-alert--primary': type === 'primary' }" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </el-alert>
</template>

<style lang="scss" scoped>
.el-alert--primary {
  --el-alert-bg-color: var(--el-color-primary-light-9);
}

.el-alert--primary.is-light {
  background-color: var(--el-alert-bg-color);
  color: var(--el-color-primary);
}

.el-alert--primary.is-dark {
  background-color: var(--el-color-primary);
  color: var(--el-color-white);
}
</style>
