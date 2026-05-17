import { boot } from 'quasar/wrappers';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

/**
 * TanStack Vue Query (React Query for Vue) initialization and configuration.
 *
 * Sets up the Vue Query plugin with default query options for optimal caching,
 * refetching, and error handling behavior across the application.
 *
 * **Default Query Options**
 * - `staleTime: 5 * 60 * 1000` (5 minutes)
 *   - Data is considered fresh for 5 minutes after fetching
 *   - Fresh data is not automatically refetched
 *   - Improves performance by reducing unnecessary API calls
 *
 * - `gcTime: 5 * 60 * 1000` (5 minutes)
 *   - Garbage collection time for unused cache entries
 *   - Cached data is cleaned up 5 minutes after the last use
 *   - Balances memory usage with cache availability
 *
 * - `retry: 1`
 *   - Failed queries are retried once automatically
 *   - After 1 retry, errors are propagated to the application
 *   - Handles transient network errors gracefully
 *
 * - `refetchOnWindowFocus: false`
 *   - Disabled automatic refetch when window regains focus
 *   - Prevents unnecessary API calls on tab switching
 *   - User can manually refetch using query.refetch()
 *
 * **Usage**
 * Used for server state management in composables:
 * - useAuth() — Authentication state and mutations
 * - useOrder() — Order queries and mutations
 * - useDashboard() — Dashboard data queries
 *
 * @example
 * // In composables:
 * import { useQuery, useMutation } from '@tanstack/vue-query';
 *
 * const { data, isLoading } = useQuery({
 *   queryKey: ['orders'],
 *   queryFn: async () => await getOrders(),
 *   // Uses default options from this configuration
 * });
 *
 * @see useAuth - Authentication composable using Vue Query
 * @see useOrder - Order management composable using Vue Query
 */
export default boot(({ app }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        /** @type {number} Time in ms before data is considered stale (5 minutes) */
        staleTime: 5 * 60 * 1000,
        /** @type {number} Garbage collection time for unused cache (5 minutes) */
        gcTime: 5 * 60 * 1000,
        /** @type {number} Number of automatic retries on failed queries */
        retry: 1,
        /** @type {boolean} Whether to refetch on window focus */
        refetchOnWindowFocus: false,
      },
    },
  });

  app.use(VueQueryPlugin, { queryClient });
});
