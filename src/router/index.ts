import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home/home.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
