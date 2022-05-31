import { ResultItem } from '@/components/form/fetch'
import { createApp, Directive, reactive } from 'vue'
import TContextMenu from './t-contextmenu.vue'
import emitter from '@/components/mitt'

const contextMenuDirective: Directive = {
  mounted(el, binding) {
    const menuHeight = 184.2
    const menuWidth = 120
    const app = createApp(TContextMenu)
    el.instance = app.mount(document.createElement('div'))
    el.oncontextmenu = (evt: MouseEvent) => {
      evt.preventDefault()
      const trEl = evt.composedPath().find((e) => {
        return (e as HTMLElement).nodeName === 'TR'
      }) as HTMLTableRowElement
      Array.prototype.forEach.call(trEl.parentElement?.children, el => {
        el.classList.remove('active')
      } )
      trEl.classList.add('active')
      emitter.emit('contextmenu', trEl)
      const { width, height } = document.body.getBoundingClientRect()
      const { clientX, clientY } = evt
      const elm = el.instance.$el
      if (clientX + menuWidth > width) {
        if (clientY + menuHeight > height) {
          elm.style.display = 'none'
          elm.style.left = `${clientX - menuWidth}px`
          elm.style.top = `${clientY - menuHeight}px`
          elm.className = 'context-menu rb'
          elm.style.display = ''
        } else {
          elm.style.display = 'none'
          elm.style.left = `${clientX - menuWidth}px`
          elm.style.top = `${clientY}px`
          elm.className = 'context-menu rt'
          elm.style.display = ''
        }
      } else {
        if (clientY + menuHeight > height) {
          elm.style.display = 'none'
          elm.style.left = `${clientX}px`
          elm.style.top = `${clientY - menuHeight}px`
          elm.className = 'context-menu lb'
          elm.style.display = ''
        } else {
          elm.style.display = 'none'
          elm.style.left = `${clientX}px`
          elm.style.top = `${clientY}px`
          elm.className = 'context-menu lt'
          elm.style.display = ''
        }
      }
      el.append(el.instance.$el)
    }
  },
}

export function copyItem(text: string) {
  return navigator.clipboard.writeText(text)
}

const contextMenuData = reactive<ContextMenuData>({
  left: undefined,
  top: undefined,
  origin: undefined,
  contextData: {
    appName: undefined,
    packageName: undefined,
    activityName: undefined,
    id: undefined,
  },
})

interface ContextMenuData {
  left?: string
  top?: string
  origin?: string
  contextData: ResultItem
}

export default contextMenuDirective
