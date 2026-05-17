import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';

/**
 * TypeScript module augmentation for Vue component global properties.
 *
 * Makes `$axios` and `$api` instances available on all Vue components
 * when using the Options API. This provides IDE autocomplete and type safety.
 *
 * @example
 * // In Vue components (Options API):
 * this.$axios.get('/data')
 * this.$api.post('/orders', payload)
 */
declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

/**
 * HTTP client initialization and configuration.
 *
 * Sets up two Axios instances for API communication:
 * - `axios` — Standard Axios for general HTTP requests
 * - `api` — Preconfigured instance with baseURL for API calls
 *
 * **Configuration**
 * - `baseURL: 'https://api.example.com'`
 *   - Default base URL for all `api` instance requests
 *   - Override with `api.create()` or pass full URL for specific requests
 *   - Update this URL to your actual API endpoint
 *
 * **Singleton Warning (SSR)**
 * This creates a Singleton instance, which works fine for SPA mode.
 * For SSR (Server-Side Rendering), consider moving instance creation
 * inside the boot function to prevent cross-request state pollution.
 *
 * **Usage**
 * - **Options API**: `this.$axios` or `this.$api`
 * - **Composition API**: Import and use directly
 *
 * @example
 * // In Composition API:
 * import { api } from 'src/boot/axios';
 *
 * const fetchData = async () => {
 *   const response = await api.get('/orders');
 *   return response.data;
 * };
 *
 * // In Options API:
 * methods: {
 *   async fetchOrders() {
 *     const response = await this.$api.get('/orders');
 *   }
 * }
 */
const api = axios.create({ baseURL: 'https://api.example.com' });

export default defineBoot(({ app }) => {
  // Register axios for use inside Vue files (Options API) through this.$axios
  app.config.globalProperties.$axios = axios;

  // Register preconfigured api instance for use inside Vue files through this.$api
  app.config.globalProperties.$api = api;
});

/** @type {AxiosInstance} Preconfigured Axios instance with baseURL for API requests */
export { api };
