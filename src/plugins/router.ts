// 创建路由对象
import { createRouter, createWebHistory } from 'vue-router';

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/case/index.vue'),
    },
    {
      path: '/case/:id',
      component: () => import('@/views/case/detail.vue'),
    },
  ],
});

export default router;
