import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { useNotify } from 'src/composables/common/useNotify';

import { deleteOrder, getOrders } from 'src/infrastructure/parse/order/order.service';

/**
 * Composable for managing orders with server state synchronization via Vue Query.
 * 
 * Provides reactive access to orders data and handles order deletion with
 * automatic cache invalidation, error handling, and user notifications.
 * The query is configured with automatic retry and stale-time for optimal
 * performance and user experience.
 * 
 * @returns {Object} Orders query and mutation operations
 * @returns {UseQueryReturnType<IOrder[]>} .getOrdersQuery - Vue Query hook for fetching all orders
 *   - .data: Array of orders (undefined while loading)
 *   - .isLoading: Boolean indicating fetch status
 *   - .error: Error object if fetch failed
 *   - .refetch: Function to manually refetch orders
 * @returns {UseMutationReturnType<boolean, Error, string>} .deleteOrderMutation - Deletes an order by ID
 *   - .mutate(orderId: string): Triggers deletion
 *   - .isPending: Boolean indicating mutation in progress
 *   - .isError: Boolean indicating mutation failure
 * 
 * @example
 * const { getOrdersQuery, deleteOrderMutation } = useOrder();
 * 
 * // Access orders data
 * const orders = computed(() => getOrdersQuery.data ?? []);
 * 
 * // Delete an order
 * const handleDeleteOrder = (orderId: string) => {
 *   deleteOrderMutation.mutate(orderId);
 * };
 */
export function useOrder() {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotify();

  const getOrdersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: async () => await getOrders(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const deleteOrderMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteOrder(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      notifySuccess('Éxito', 'Orden eliminada exitosamente');
    },
    onError: (error: unknown) => {
      notifyError('Error', (error as Error).message);
    },
  });

  return {
    getOrdersQuery,
    deleteOrderMutation,
  };
}
