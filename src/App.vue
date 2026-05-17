<script setup lang="ts">
/**
 * App — Root Vue component for ForkIt Frontend application.
 *
 * Serves as the main application entry point that renders:
 * - Router views (layouts and pages)
 * - Vue Query DevTools for debugging
 *
 * **Features**
 * - Routes all application pages via `<router-view />`
 * - Includes Vue Query DevTools for development debugging
 * - Global scope for application-level setup
 *
 * **Router Integration**
 * - RouterView renders the current route's component
 * - Routes defined in src/router/routes.ts
 * - Includes AuthLayout and DashboardLayout based on current route
 *
 * **Vue Query DevTools**
 * - Debugging panel for Vue Query (TanStack Query)
 * - Shows query state, mutations, cache
 * - Only active in development (auto-disabled in production)
 * - Can be toggled with keyboard shortcut (Ctrl+;)
 *
 * **Lifecycle**
 * - Mounted by main.ts during app initialization
 * - Children: All layouts and pages
 *
 * **Theme & Styling**
 * - Global Quasar configuration applied via quasar.conf.ts
 * - Dark mode handled in layouts (AuthLayout, DashboardLayout)
 * - CSS variables available globally
 *
 * @component
 * @example
 * // In main.ts:
 * import App from './App.vue'
 *
 * const app = createApp(App)
 * app.use(router)
 * app.mount('#app')
 *
 * @see router - Route definitions
 * @see AuthLayout - Authentication layout
 * @see DashboardLayout - Dashboard layout
 */
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <router-view />
  <VueQueryDevtools />
</template>
