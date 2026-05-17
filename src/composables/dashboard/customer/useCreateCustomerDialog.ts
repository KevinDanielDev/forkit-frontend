import { ref } from 'vue';

import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { createCustomer } from 'src/infrastructure/parse/customer/customer.service';

import { useNotify } from 'src/composables/common/useNotify';

import type { ICustomerData } from 'src/models/interfaces/customer/customer-data.interface';

// Refs
const customerData = ref<ICustomerData>({
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '',
  phone: '',
  company: '',
  isActive: true,
});
const isDialogOpen = ref<boolean>(false);

export function useCreateCustomerDialog() {
  const queryClient = useQueryClient();

  // Composables
  const { notifyError, notifySuccess } = useNotify();

  // Methods
  function openDialog() {
    isDialogOpen.value = !isDialogOpen.value;
  }

  function closeDialog() {
    isDialogOpen.value = !isDialogOpen.value;
    clearCustomerData();
  }

  function clearCustomerData() {
    customerData.value = {
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '',
      phone: '',
      company: '',
      isActive: true,
    };
  }

  const createCustomerMutation = useMutation({
    mutationKey: ['create-customer'],
    mutationFn: async (customer: ICustomerData) => {
      return await createCustomer(customer);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customers'] });
      notifySuccess('Éxito', 'Cliente creado exitosamente');
      closeDialog();
    },
    onError: (error: unknown) => {
      notifyError('Error', (error as Error).message);
    },
  });

  return {
    isDialogOpen,
    customerData,
    openDialog,
    closeDialog,
    createCustomerMutation,
  };
}
