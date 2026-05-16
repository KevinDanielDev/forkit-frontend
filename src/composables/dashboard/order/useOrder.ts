import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { useNotify } from 'src/composables/common/useNotify';

import { deleteOrder, getOrders } from 'src/infrastructure/parse/order/order.service';

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
