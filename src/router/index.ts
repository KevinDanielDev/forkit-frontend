import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

/**
 * Vue Router initialization and configuration for ForkIt Frontend.
 * 
 * Creates the application router instance with:
 * - Automatic history mode selection (SSR-aware, configurable via environment)
 * - Route definitions from routes.ts
 * - Scroll behavior reset on navigation
 * - Proper base path configuration for deployment
 * 
 * **History Mode Selection**
 * - SSR mode: Uses createMemoryHistory (server-side rendering)
 * - History mode: Uses createWebHistory (clean URLs, requires server support)
 * - Hash mode: Uses createWebHashHistory (default, URLs with #)
 * 
 * Configuration can be changed in `quasar.conf.js`:
 * - `build.vueRouterMode` — Set to 'history' or 'hash'
 * - `build.publicPath` — Set base URL for deployment
 * 
 * @returns {Router} Configured Vue Router instance
 * 
 * @example
 * // In main.ts or boot file:
 * import router from 'src/router';
 * app.use(router);
 * 
 * // The router is automatically configured for:
 * // - Production: Respects build settings
 * // - Development: Uses hash mode by default
 * // - SSR: Uses memory history
 */
export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
