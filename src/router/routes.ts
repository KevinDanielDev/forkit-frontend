import type { RouteRecordRaw } from 'vue-router';
import isAuthGuard from './authGuard';

/**
 * Application route definitions for ForkIt Frontend.
 *
 * Defines the complete route hierarchy with two main sections:
 *
 * **Authentication Routes** (`/auth`)
 * - `/auth/sign-in` — User login page
 * - `/auth/sign-up` — User registration page
 * - Both routes wrapped in AuthLayout component
 * - Public access (no authentication required)
 *
 * **Dashboard Routes** (`/dashboard`)
 * - `/dashboard` — Main dashboard overview
 * - `/dashboard/orders` — Orders management page
 * - `/dashboard/clients` — Clients management page
 * - `/dashboard/reports` — Analytics and reports page
 * - `/dashboard/finances` — Financial reports page
 * - All routes wrapped in DashboardLayout component
 * - Protected by isAuthGuard (requires valid authentication session)
 *
 * **Redirects & Fallbacks**
 * - `/` redirects to `/auth`
 * - `/*` (any undefined route) shows 404 error page
 *
 * @type {RouteRecordRaw[]}
 *
 * @example
 * // Navigating to protected routes
 * import { useRouter } from 'vue-router';
 * const router = useRouter();
 *
 * // Redirects to sign-in if not authenticated
 * router.push({ name: 'dashboard' });
 *
 * // Navigate to specific page
 * router.push({ name: 'orders' });
 */
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
    beforeEnter: isAuthGuard,
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
        component: () => import('pages/dashboard/CustomerPage.vue'),
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
