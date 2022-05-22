import { ComponentPublicInstance, createApp, Directive } from "vue";
import Loading from "./t-loading.vue";

const loadingDirective: Directive = {
  mounted(el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if(binding.value) {
      append(el)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

interface El extends HTMLElement {
  instance: ComponentPublicInstance
}

function append(el: El) {
  el.appendChild(el.instance.$el)
}

function remove(el: El) {
  el.removeChild(el.instance.$el)
}

export default loadingDirective
