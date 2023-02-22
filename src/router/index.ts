import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/home/home.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
