import { ComponentPublicInstance, createApp, Directive } from 'vue';
import vLoading from './v-loading.vue';

interface ElModel extends HTMLElement {
  instance: ComponentPublicInstance;
}

const loading: Directive = {
  mounted(el, binding) {
    const app = createApp(vLoading);
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;
    if (binding.value) {
      append(el);
    } else {
      remove(el);
    }
    if (binding.arg != null) {
      (instance as any).setTitle(binding.arg);
    }
  },

  updated() {
    console.log('😝 👉', 'updated:v-loading');
  },
};

function append(el: ElModel) {
  el.appendChild(el.instance.$el);
  el.classList.add('relative');
}

function remove(el: ElModel) {
  el.removeChild(el.instance.$el);
  el.classList.remove('relative');
}

export default loading;
