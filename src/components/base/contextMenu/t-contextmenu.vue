<template>
  <div class="context-menu lt tb rt rb" ref="rootRef" @click="handleClick" @contextmenu.prevent.stop="">
    <div class="context-list">
      <div class="context-item iconwrap">
        <img class="loading" src="/img/placeholder.png" width="36" height="36">
      </div>
    </div>
    <div class="context-list">
      <div class="context-item" :data-action="1">复制 XML</div>
      <div class="context-item" :data-action="2">复制应用名</div>
      <div class="context-item" :data-action="3">复制包名</div>
      <div class="context-item" :data-action="4">复制启动项</div>
      <div class="context-item" :data-action="5">复制 ID</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import emitter from '@/components/mitt'
import { ref } from 'vue'
import { copyItem } from './directive'

const currentTarget = ref<HTMLTableRowElement | null>(null)
const rootRef = ref<HTMLDivElement | null>(null)

emitter.on('contextmenu', (val) => {
  currentTarget.value = val as HTMLTableRowElement
})

function handleClick(evt: MouseEvent) {
  const item = evt.composedPath().find((e) => {
    return (e as HTMLElement).classList.contains('context-item')
  }) as HTMLDivElement
  const actionId = item.dataset['action'] as string


  function makePayload(type: number): string {

    const children = (currentTarget.value as HTMLTableRowElement).children
    switch (type) {
      case 1:
        return `<item component="ComponentInfo{${children[1].textContent}/${children[2].textContent}}" drawable="${children[0].textContent}" />`
      case 2:
        return children[0].textContent as string
      case 3:
        return children[1].textContent as string
      case 4:
        return children[2].textContent as string
      case 5:
        return currentTarget.value?.dataset.appid as string
      default:
        return ''
    }
  }

  switch (+actionId) {
    case 0:

      break
    case 1:
      copyItem(makePayload(1))
      rootRef.value?.remove()
      break
    case 2:
      copyItem(makePayload(2))
      rootRef.value?.remove()

      break
    case 3:
      copyItem(makePayload(3))
      rootRef.value?.remove()

      break
    case 4:
      copyItem(makePayload(4))
      rootRef.value?.remove()
      break
    case 5:
      copyItem(makePayload(5))
      rootRef.value?.remove()
      break
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 120px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  animation: scaling 0.25s;
  transform-origin: 0 0;

  &.lt {
    transform-origin: left top;

    &::after {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      background-color: #4b4b4b;
      clip-path: polygon(100% 0, 0 100%, 0 0);
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  &.lb {
    transform-origin: left bottom;

    &::after {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      background-color: #4b4b4b;
      clip-path: polygon(0 0, 0% 100%, 100% 100%);
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  &.rt {
    transform-origin: right top;

    &::after {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      background-color: #4b4b4b;
      clip-path: polygon(100% 0, 0 0, 100% 100%);
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  &.rb {
    transform-origin: right bottom;

    &::after {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      background-color: #4b4b4b;
      clip-path: polygon(100% 0, 0% 100%, 100% 100%);
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  .context-list {
    padding: 0.3rem;
  }

  .context-list+.context-list {
    border-top: 1px dashed #ddd;
  }

  .context-item {
    color: #4b4b4b;
    padding: 4px;
    font-size: 0.85rem;
    background-color: #fff;
    transition: all 1px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #f1f3f7;
    }
  }

  .iconwrap {
    display: flex;
    justify-content: center;
  }

  .loading {
    animation: rotating 2s infinite;
  }

  @keyframes rotating {
    from {
      transform: rotateY(0deg);
    }

    to {
      transform: rotateY(360deg);
    }
  }

  @keyframes scaling {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }

}
</style>