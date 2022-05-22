<template>
  <table class="table" ref="rootRef" v-if="length">
    <thead>
      <tr>
        <th>应用名</th>
        <th>包名</th>
        <th>启动项</th>
      </tr>
    </thead>
    <tbody :style="tbStyle">
      <tr v-for="(item, index) in tableItems" :key="index">
        <td>{{ item.appName }}</td>
        <td>{{ item.packageName }}</td>
        <td>{{ item.activityName }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, defineProps, defineEmits, nextTick } from "vue";
import { ResultData, ResultItem } from "../form/fetch";
import emitter from "../mitt";

const rootRef = ref<HTMLTableElement | null>(null)
let tableItems = reactive<ResultItem[]>([])

const length = ref(0)

const props = defineProps<{
  height: number
}>()

const emits = defineEmits(['mounted'])

const tbStyle = computed(() => {
  return `max-height: ${props.height}px;`
})

emitter.on('update', async (e) => {
  const data = await (e as ResultData)
  const len = tableItems.length
  tableItems.splice(0, len, ...data.items)
  length.value = data.metadata.total
  await nextTick()
  emits('mounted', parseInt(getComputedStyle(document.body).height) - (rootRef?.value?.offsetTop as number) - 120)

})

</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  box-shadow: 3px 3px #eb6565,
    6px 6px #0d8f6e,
    9px 9px #6666e4,
    12px 12px #ddd,
    15px 15px #ddd;
  color: #3b3b3b;

  thead {
    width: 100%;
    background-color: rgba(255, 28, 206, 0.247);
  }

  tbody {
    display: block;
    width: 100%;
    overflow-y: auto;
  }

  thead tr {
    border: 0;

    th {
      user-select: none;
    }
  }

  tr {
    width: 100%;
    display: table;
    table-layout: fixed;
    border-collapse: collapse;
    border-bottom: 0.5px solid #b2b2b2;
    background-color: rgba(255, 255, 255, 0.507);

    &>td,
    th {
      display: table-cell;
      padding: 0.5rem 0.25rem;
      word-break: break-all;
      text-align: left;
      user-select: all;
      font-family: "Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace;
    }

    td {}
  }
}
</style>