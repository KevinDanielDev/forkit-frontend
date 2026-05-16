import { ref, computed } from 'vue';
import { useQueryClient, useMutation, useQuery } from '@tanstack/vue-query';

import { deleteCustomer, getCustomers } from 'src/infrastructure/parse/customer/customer.service';

import { useNotify } from '../common/useNotify';

export function useCustomer() {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotify();

  const customers = computed(() => {
    const { data } = getCustomersQuery;
    if (!data.value) return [];
    return Array.isArray(data.value) ? data.value : [data.value];
  });

  // Refs
  const searchQuery = ref<string>('');

  // Computed
  const kpiCards = computed(() => [
    { value: customers.value.length, label: 'Clientes Totales', icon: 'people', color: 'primary' },
    {
      value: customers.value.filter((c) => c.company !== '' && c.isActive === true).length,
      label: 'Empresas Vinc.',
      icon: 'business',
      color: 'positive',
    },
    {
      value: customers.value.filter((c) => c.isActive === true).length,
      label: 'Clientes Activos',
      icon: 'check_circle',
      color: 'info',
    },
  ]);
  const filteredCustomers = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return customers.value;

    return customers.value.filter(
      (customer) =>
        customer.firstName.toLowerCase().includes(query) ||
        customer.lastName.toLowerCase().includes(query) ||
        (customer.email && customer.email.toLowerCase().includes(query)) ||
        (customer.company && customer.company.toLowerCase().includes(query)) ||
        (customer.phone && customer.phone.includes(query)),
    );
  });

  // Methods
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCustomersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: async () => await getCustomers(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteCustomer(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customers'] });
      notifySuccess('Éxito', 'Cliente eliminado exitosamente');
    },
    onError: (error: unknown) => {
      notifyError('Error', (error as Error).message);
    },
  });

  const { isPending } = deleteCustomerMutation;

  return {
    kpiCards,
    customers,
    filteredCustomers,
    searchQuery,
    isPending,
    getInitials,
    deleteCustomerMutation,
  };
}
