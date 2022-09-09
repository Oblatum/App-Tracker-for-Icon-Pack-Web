import { createApp, Directive } from 'vue';
import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import ScrollBar from '@better-scroll/scroll-bar';

import VScroll from './v-scroll.vue';

BScroll.use(MouseWheel).use(ScrollBar);

const scroll: Directive = {
  mounted(el, binding) {
    const app = createApp(VScroll);
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;
    const bs = new BScroll(el, {
      bounce: true,
      probeType: 3,
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300,
      },
      scrollY: true,
      scrollbar: true,
    });

    el.bs = bs;
  },

  updated(el) {
    el.bs.refresh();
  },
};

export default scroll;
