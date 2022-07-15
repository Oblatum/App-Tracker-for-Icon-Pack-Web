import { RouteRecordRaw,createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/views/home-page.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router