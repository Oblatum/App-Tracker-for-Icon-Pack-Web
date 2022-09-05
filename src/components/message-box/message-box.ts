import { createApp, RendererNode, VNode } from 'vue';
import MessageBox from './message-box.vue';

export async function messageAlert(text: string | VNode<RendererNode>) {
  const app = createApp(MessageBox);
  const { setMessage, $el } = app.mount(document.createElement('div')) as any;
  setMessage(text);
  append($el);
  await playEnterAnimation($el);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await playLeaveAnimation($el);
  remove($el);
}

const enterAnimationKeyframes = [
  {
    transform: `translateY(-100%) translateZ(0px)`,
  },
  {
    transform: `translateY(0) translateZ(0px)`,
  },
];

const enterAnimationCnf = {
  duration: 500,
  timing: 200,
};

function append(el: HTMLElement) {
  document.body.appendChild(el);
}

function remove(el: HTMLElement) {
  document.body.removeChild(el);
}

async function playEnterAnimation(el: HTMLElement) {
  return new Promise(
    (resolve) =>
      (el.animate(enterAnimationKeyframes, enterAnimationCnf).onfinish =
        resolve),
  );
}

async function playLeaveAnimation(el: HTMLElement) {
  return new Promise(
    (resolve) =>
      (el.animate(
        enterAnimationKeyframes.slice().reverse(),
        enterAnimationCnf,
      ).onfinish = resolve),
  );
}
