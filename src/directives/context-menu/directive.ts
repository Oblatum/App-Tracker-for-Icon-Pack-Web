import type {
  ListDataInfoRecordModel,
  ListDataRecordModel,
} from '@/components/item-list/model';
import { appendEl, preventDefault, removeEl } from '@/helpers/dom';
import { createApp, Directive, DirectiveBinding } from 'vue';
import ContextMenu from './context-menu.vue';
import type { ElPosModel } from './model';

const contextMenu: Directive = {
  mounted(el, binding) {
    const app = createApp(ContextMenu);
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;
    if (binding.value.target) {
      activate(el, instance, binding, {
        x: binding.value.x,
        y: binding.value.y,
        origin: 'left top',
      });
    } else {
      deactivate(el.instance.$el);
    }
  },

  updated(el, binding) {
    if (binding.value.target) {
      activate(el, el.instance, binding, {
        x: binding.value.x,
        y: binding.value.y,
        origin: binding.value.origin,
      });
    } else {
      deactivate(el.instance.$el);
    }
  },

  unmounted(el, binding) {
    deactivate(el.instance.$el);
  },
};

function activate(
  el: HTMLElement,
  instance: any,
  binding: DirectiveBinding,
  { x, y, origin }: ElPosModel,
) {
  setPos(instance.$el, x, y);
  appendEl(instance.$el, el);
  if (!matchPosition(el)) {
    el.classList.add('relative');
  }
  setTransformOrigin(instance.$el, origin);
  playEnterAnimation(instance.$el);
  instance.setData(
    matchItem(
      (binding.value.target as HTMLElement).dataset.appId,
      binding.arg as unknown as ListDataRecordModel[],
    ),
  );
  instance.$el.addEventListener('click', handleItemClick);
  instance.$el.addEventListener('contextmenu', preventDefault);
  addCtxBlurHandler(instance.$el, binding);
}

async function deactivate(el: HTMLElement) {
  await playLeaveAnimation(el);
  el.removeEventListener('contextmenu', preventDefault);
  removeEl(el, el.parentElement);
}

function matchPosition(el: HTMLElement) {
  return ~['relative', 'absolute', 'fixed'].indexOf(
    getComputedStyle(el).position,
  );
}

function setPos(el: HTMLElement, x: number, y: number) {
  el.style.position = 'absolute';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
}

function handleItemClick(evt: MouseEvent) {
  evt.stopPropagation();
  if (
    evt
      .composedPath()
      .filter((v) => v !== window && v !== document)
      .find((v) => (v as HTMLElement).classList.contains('context-menu-item'))
  )
    deactivate(evt.currentTarget as HTMLElement);
  else evt.preventDefault();
}

function addCtxBlurHandler(el: HTMLElement, binding: DirectiveBinding) {
  const handleCtxBlur = function () {
    document.removeEventListener('click', handleCtxBlur);
    const { setCurrCtx } = binding.instance as any;
    setCurrCtx(new Event('click'));
    deactivate(el);
  };
  document.removeEventListener('click', handleCtxBlur);
  document.addEventListener('click', handleCtxBlur, { capture: false });
}

function matchItem(
  id: string,
  list: ListDataRecordModel[],
): ListDataInfoRecordModel {
  return list?.find((v) => v.id === id).info;
}

const enterAnimationKeyframes = [
  {
    transform: `scale(0)`,
    opacity: `0`,
  },
  {
    transform: `scale(1)`,
    opacity: `1`,
  },
];

const enterTiming = {
  duration: 350,
  easing: 'ease-in-out',
};

function setTransformOrigin(el: HTMLElement, origin: string) {
  el.style.transformOrigin = origin;
  el.className = '';
  el.classList.add(`${origin.replace(' ', '-')}`);
  el.classList.add(`context-menu`);
}

async function playEnterAnimation(el: HTMLElement) {
  return new Promise<void>((resolve) => {
    const enteringUI = el.animate(enterAnimationKeyframes, enterTiming);
    enteringUI.onfinish = () => {
      resolve();
    };
  });
}

const leaveAnimationKeyframes = [
  {
    opacity: '1',
  },
  {
    opacity: '0',
  },
];

const leaveAnimationTiming = {
  duration: 150,
  easing: 'ease-in-out',
};

async function playLeaveAnimation(el: HTMLElement) {
  return new Promise<void>((resolve) => {
    const leavingUI = el.animate(leaveAnimationKeyframes, leaveAnimationTiming);
    leavingUI.onfinish = () => {
      resolve();
    };
  });
}

export default contextMenu;
