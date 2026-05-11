import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/auth/sign-up',
  },
  {
    path: '/auth',
    redirect: '/auth/sign-up',
  },
  {
    path: '/auth/sign-up',
    component: () => import('pages/auth-page.vue'),
  },
  {
    path: '/auth/sign-in',
    component: () => import('pages/auth-page.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
