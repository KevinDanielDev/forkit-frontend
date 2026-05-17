import { ref, computed } from 'vue';

import { useQuasar } from 'quasar';

import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { useNotify } from 'src/composables/common/useNotify';

import { createOrder } from 'src/infrastructure/parse/order/order.service';

import type { ClientStep, FinanceStep, ProjectStep } from 'src/components/dashboard/order/steps';

import type { IOrder } from 'src/models/interfaces/order/order.interface';
import type { IFinanceData, IProjectData } from 'src/models/interfaces/order';
import type { ICustomerData } from 'src/models/interfaces/customer/customer-data.interface';

// Refs Global
const step = ref<number>(1);
const filesPreview = ref<string[]>([]);

// clientData adaptado exactamente a lo que consumen los q-inputs del paso de orden
const customerData = ref<ICustomerData>({
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '',
  phone: '',
  company: '',
  isActive: true,
});

const projectData = ref<IProjectData>({
  title: '',
  priority: 'Media',
  status: 'Pendiente',
  description: '',
  files: [] as File[],
});

const financeData = ref<IFinanceData>({
  startDate: '',
  deliveryDate: '',
  totalAmount: 0,
  depositAmount: 0,
});

// Const Global
const totalSteps = 3;

/**
 * Composable for managing the multi-step order creation dialog state and navigation.
 */
export function useOrderCreateDialog() {
  const $q = useQuasar();
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotify();

  // Refs
  const isDialogOpen = ref<boolean>(false);
  const clientStepRef = ref<InstanceType<typeof ClientStep> | null>(null);
  const projectStepRef = ref<InstanceType<typeof ProjectStep> | null>(null);
  const financeStepRef = ref<InstanceType<typeof FinanceStep> | null>(null);

  // Computed
  const isMobile = computed(() => $q.screen.lt.md);
  const progress = computed(() => step.value / totalSteps);
  const pendingAmount = computed(() => {
    return financeData.value.totalAmount - financeData.value.depositAmount;
  });

  // Methods
  function openDialog() {
    isDialogOpen.value = !isDialogOpen.value;
  }

  function closeDialog() {
    isDialogOpen.value = false;
    clearData();
    step.value = 1;
  }

  function clearData() {
    customerData.value = {
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '',
      phone: '',
      company: '',
      isActive: true,
    };
    projectData.value = {
      title: '',
      priority: 'Media',
      status: 'Pendiente',
      description: '',
      files: [] as File[],
    };
    financeData.value = {
      startDate: '',
      deliveryDate: '',
      totalAmount: 0,
      depositAmount: 0,
    };
    filesPreview.value = [];
  }

  async function nextStep() {
    const stepRefs = {
      1: clientStepRef,
      2: projectStepRef,
      3: financeStepRef,
    };

    const currentRef = stepRefs[step.value as keyof typeof stepRefs];

    if (!currentRef?.value) return;

    const isValid = await currentRef.value.validateForm();

    if (!isValid) return;

    if (step.value < totalSteps) {
      step.value++;
      return;
    }

    const order: IOrder = {
      customer: customerData.value,
      project: projectData.value,
      finance: financeData.value,
    };

    createOrderMutation.mutate(order);
  }

  function backStep() {
    if (step.value === 1) {
      closeDialog();
      return;
    }

    step.value--;
  }

  const createOrderMutation = useMutation({
    mutationKey: ['create-order'],
    mutationFn: async (order: IOrder) => {
      return await createOrder(order);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      notifySuccess('Éxito', 'Orden creada exitosamente');
      closeDialog();
    },
    onError: (error: unknown) => {
      notifyError('Error', (error as Error).message);
    },
  });

  const { isPending } = createOrderMutation;

  return {
    // Refs
    step,
    isDialogOpen,
    clientStepRef,
    projectStepRef,
    financeStepRef,
    customerData,
    projectData,
    financeData,
    filesPreview,

    // Computed
    progress,
    isMobile,
    pendingAmount,

    // Methods
    openDialog,
    closeDialog,
    nextStep,
    backStep,
    createOrderMutation,
    isPending,
  };
}
