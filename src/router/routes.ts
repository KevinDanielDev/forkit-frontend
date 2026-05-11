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
    path: '/dashboard',
    redirect: { name: 'dashboard' },
    component: () => import('layouts/dashboard/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/dashboard/DashboardPage.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('pages/dashboard/OrderPage.vue'),
      },
      {
        path: 'clients',
        name: 'clients',
        component: () => import('pages/dashboard/ClientPage.vue'),
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('pages/dashboard/ReportPage.vue'),
      },
      {
        path: 'finances',
        name: 'finances',
        component: () => import('pages/dashboard/FinancePage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
