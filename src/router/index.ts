import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: () => import('../views/Home.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
