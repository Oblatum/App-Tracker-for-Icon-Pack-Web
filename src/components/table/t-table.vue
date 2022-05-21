<template>
  <table class="table" ref="rootRef">
    <thead>
      <tr>
        <th>应用名</th>
        <th>包名</th>
        <th>启动项</th>
      </tr>
    </thead>
    <tbody :style="tbStyle">
      <tr>
        <td>QQ</td>
        <td>com.tencent.im.qq</td>
        <td>activity.main.im.tencent.qq</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    height: Number
  },
  computed: {
    tbStyle() {
      return `max-height: ${this.$props.height}px;`
    }
  },
  setup(props, context) {
    const rootRef = ref<HTMLTableElement | null>(null)
    onMounted(() => {
      context.emit('mounted', parseInt(getComputedStyle(document.body).height) - (rootRef.value as HTMLElement).offsetTop - 120)
    })

    return {
      rootRef
    }
  }
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