import { appendEl, removeEl } from '@/helpers/dom';
import { createApp, Directive, DirectiveBinding } from 'vue';
import vLoading from './v-loading.vue';

const loading: Directive = {
  mounted(el, binding) {
    const app = createApp(vLoading);
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;
    if (binding.value) {
      activate(el, instance, binding);
    }
  },

  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? activate(el, el.instance, binding) : deactive(el);
    }
  },
};

function activate(el: HTMLElement, instance: any, binding: DirectiveBinding) {
  appendEl(instance.$el, el);
  if (binding.arg) {
    (instance as any).setTitle(binding.arg);
  }

  if (!matchPosition(el)) {
    el.classList.add('relative');
  }
}

function deactive(el: HTMLElement) {
  removeEl((el as any).instance.$el, el);
}

function matchPosition(el: HTMLElement) {
  const parent = el.parentElement;
  return ~['relative', 'absolute', 'fixed'].indexOf(
    getComputedStyle(parent).position,
  );
}

export default loading;
