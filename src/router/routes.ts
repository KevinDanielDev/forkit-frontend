import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'auth' },
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'sign-in' },
    component: () => import('layouts/auth/AuthLayout.vue'),
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        component: () => import('pages/auth/SignInPage.vue'),
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: () => import('pages/auth/SignUpPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
