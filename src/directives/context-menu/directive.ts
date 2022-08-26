import type {
  ListDataInfoRecordModel,
  ListDataRecordModel,
} from '@/components/item-list/model';
import { createApp, Directive, DirectiveBinding } from 'vue';
import ContextMenu from './context-menu.vue';
import type { ElPosModel } from './model';

const contextMenu: Directive = {
  mounted(el, binding) {
    const app = createApp(ContextMenu);
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;
    if (binding.value) {
      activate(instance.$el, instance, binding, {
        x: 0,
        y: 0,
        origin: 'left top',
      });
    } else {
      deactivate(el.instance.$el);
    }
  },

  updated(el, binding) {
    if (binding.value) {
      activate(el.instance.$el, el.instance, binding, {
        x: 0,
        y: 0,
        origin: 'left top',
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
  instance: unknown,
  binding: DirectiveBinding,
  { x, y, origin }: ElPosModel,
) {
  // TODO 设置上下文菜单位置
  appendEl(el);
  setTransformOrigin(el, origin);
  playEnterAnimation(el);
  (instance as any).setData(
    matchItem(
      (binding.value as HTMLElement).dataset.appId,
      binding.arg as unknown as ListDataRecordModel[],
    ),
  );
  el.addEventListener('click', handleItemClick);
  el.addEventListener('contextmenu', preventDefault);
  addCtxBlurHandler(el, binding);
}

async function deactivate(el: HTMLElement) {
  await playLeaveAnimation(el);
  el.removeEventListener('contextmenu', preventDefault);
  removeEl(el);
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

function addCtxBlurHandler(el: Element, binding: DirectiveBinding) {
  const handleCtxBlur = function () {
    el.removeEventListener('click', handleCtxBlur);
    const { setCurrCtx } = binding.instance as any;
    setCurrCtx(new Event('click'));
    deactivate(el as HTMLElement);
  };
  el.removeEventListener('click', handleCtxBlur);
  document.addEventListener('click', handleCtxBlur, { capture: false });
}

function appendEl(el: HTMLElement) {
  document.body.appendChild(el);
}

function removeEl(el: HTMLElement) {
  if (Array.prototype.find.call(document.body.children, (v) => v === el))
    document.body.removeChild(el);
}

function preventDefault(evt: Event) {
  evt.preventDefault();
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

function setTransformOrigin(
  el: HTMLElement,
  origin: [number, number] | string,
) {
  if (typeof origin === 'string') {
    el.style.transformOrigin = origin;
  } else {
    el.style.transformOrigin = origin.map((v) => v + 'px').join(' ');
  }
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
