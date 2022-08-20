import { createApp, Directive } from 'vue';
import ContextMenu from './context-menu.vue';

const contextMenu: Directive = {
  mounted(el, binding) {
    const app = createApp(ContextMenu);
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;
    if (binding.value) {
      document.body.append(el.instance.$el);
      addBlurListener(el);
    }
  },

  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      removeBlurListener();
      if (binding.value) {
        document.body.append(el.instance.$el);
        // TODO set Pos
        addBlurListener(el.instance.$el);
      } else {
        document.body.removeChild(el.instance.$el);
        removeBlurListener();
        enableWheel();
      }
    } else {
      document.body.append(el.instance.$el);
    }
  },
};

function blurHandler(evt: MouseEvent, el: HTMLElement) {
  if (evt.composedPath().indexOf(el) === -1) {
    console.log('😝 👉', '卸载', evt.composedPath(), el);
    // TODO 移除
    document.body.removeChild(el);
    removeBlurListener();
  }
}

function addBlurListener(el: HTMLElement) {
  window.onmousedown = (evt: MouseEvent) => {
    blurHandler(evt, el);
  };
}

function removeBlurListener() {
  window.onmousedown = null;
}

function preventDefault(e: Event) {
  e.preventDefault();
}

function disableWheel() {
  window.addEventListener('wheel', preventDefault, {
    passive: false,
  });
}

function enableWheel() {
  window.removeEventListener('wheel', preventDefault);
}

export default contextMenu;
