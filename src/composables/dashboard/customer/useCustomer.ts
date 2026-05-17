import { ref, computed, watch } from 'vue';
import { useQueryClient, useMutation, useQuery } from '@tanstack/vue-query';

import { deleteCustomer, getCustomers } from 'src/infrastructure/parse/customer/customer.service';
import { useNotify } from 'src/composables/common/useNotify';
import type { ICustomerFilterOptions } from 'src/models/interfaces/customer/filter-customer';

export function useCustomer() {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotify();

  // 1. REFS (Definidas al inicio para evitar errores de referencia temporal)
  const searchQuery = ref<string>('');
  const selectedCustomer = ref(null);
  const filterOptions = ref<ICustomerFilterOptions[]>([]);

  // 2. QUERIES DE BASE (Se cargan antes de mapear la data dependiente)
  const getCustomersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: async () => await getCustomers(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  // 3. COMPUTEDS (Datos calculados limpios en base a la Query)
  const customers = computed(() => {
    const { data } = getCustomersQuery;
    if (!data.value) return [];
    return Array.isArray(data.value) ? data.value : [data.value];
  });

  const customersOptions = computed(() => {
    return customers.value.map((c) => ({
      objectId: c.objectId || '',
      label: `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'Cliente sin nombre',
      value: c.objectId || '',
      email: c.email || '',
      lastName: c.lastName || '',
      countryCode: c.countryCode || '+57',
      phone: c.phone || '',
      company: c.company || '',
    }));
  });

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

  // 4. WATCHERS
  watch(
    customersOptions,
    (newOptions) => {
      filterOptions.value = newOptions;
    },
    { immediate: true },
  );

  // 5. MÉTODOS Y FUNCIONES SÍNCRONAS
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  function filterFn(val: string, update: (callback: () => void) => void) {
    if (val === '') {
      update(() => {
        filterOptions.value = customersOptions.value;
      });
      return;
    }

    update(() => {
      const needle = val.toLowerCase();
      filterOptions.value = customersOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1,
      );
    });
  }

  // 6. MUTACIONES Y OPERACIONES DE ESCRITURA
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

  // Retorno de datos mapeados
  return {
    kpiCards,
    customers,
    filteredCustomers,
    searchQuery,
    isPending,
    getInitials,
    deleteCustomerMutation,
    selectedCustomer,
    filterOptions,
    customersOptions,
    filterFn,
    isLoadingCustomers: getCustomersQuery.isLoading,
  };
}
