import { ref, computed } from 'vue';

import { useQuasar } from 'quasar';

import type { ClientStep, FinanceStep, ProjectStep } from 'src/components/dashboard/order/steps';

import type { IClientData, IFinanceData, IProjectData } from 'src/models/interfaces/order';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useNotify } from 'src/composables/common/useNotify';
import { createOrder } from 'src/infrastructure/parse/order/order.service';
import type { IOrder } from 'src/models/interfaces/order/order.interface';

// Refs Global
const step = ref<number>(1);
const filesPreview = ref<string[]>([]);
const clientData = ref<IClientData>({
  name: '',
  email: '',
  countryCode: '',
  phone: '',
  company: '',
});
const projectData = ref<IProjectData>({
  title: '',
  priority: 'Media',
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
 *
 * Handles a 3-step order creation process (Client → Project → Finance) with form validation,
 * data persistence across steps, and mobile-responsive UI. Manages dialog state, step navigation,
 * data clearing, and progress tracking.
 *
 * @returns {Object} Dialog state, refs, computed properties, and methods
 * @returns {Ref<number>} .step - Current step number (1-3)
 * @returns {Ref<boolean>} .isDialogOpen - Dialog visibility state
 * @returns {TemplateRef} .clientStepRef - Template ref to ClientStep component
 * @returns {TemplateRef} .projectStepRef - Template ref to ProjectStep component
 * @returns {TemplateRef} .financeStepRef - Template ref to FinanceStep component
 * @returns {Ref<IClientData>} .clientData - Reactive client form data
 * @returns {Ref<IProjectData>} .projectData - Reactive project form data
 * @returns {Ref<IFinanceData>} .financeData - Reactive finance form data
 * @returns {Ref<Array<string>>} .filesPreview - Array of file preview URLs
 * @returns {ComputedRef<number>} .progress - Progress ratio (0-1)
 * @returns {ComputedRef<boolean>} .isMobile - Whether screen is mobile size (< md breakpoint)
 * @returns {ComputedRef<number>} .pendingAmount - Remaining amount to collect (total - deposit)
 * @returns {Function} .openDialog - Toggle dialog visibility
 * @returns {Function} .closeDialog - Close dialog and reset state
 * @returns {Function} .nextStep - Validate current step and advance to next
 * @returns {Function} .backStep - Go to previous step or close dialog if on step 1
 *
 * @example
 * const {
 *   step, isDialogOpen, clientData, projectData, financeData,
 *   openDialog, closeDialog, nextStep, backStep
 * } = useOrderCreateDialog();
 *
 * // Open dialog
 * openDialog();
 *
 * // Progress to next step (with validation)
 * await nextStep();
 *
 * // Go back
 * backStep();
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
  }

  function clearData() {
    clientData.value = {
      name: '',
      email: '',
      countryCode: '',
      phone: '',
      company: '',
    };
    projectData.value = {
      title: '',
      priority: 'Media',
      description: '',
      files: [] as File[],
    };
    financeData.value = {
      startDate: '',
      deliveryDate: '',
      totalAmount: 0,
      depositAmount: 0,
    };
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
      client: clientData.value,
      project: projectData.value,
      finance: financeData.value,
    };

    createOrderMutation.mutate(order);
  }

  function backStep() {
    if (step.value === 1) {
      clearData();
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
      await queryClient.setQueryData(['orders'], []);
      notifySuccess('Éxito', 'Orden creada exitosamente');
      closeDialog();
    },
    onError: (error: unknown) => {
      notifyError('Error', (error as Error).message);
    },
  });

  return {
    // Refs
    step,
    isDialogOpen,
    clientStepRef,
    projectStepRef,
    financeStepRef,
    clientData,
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
  };
}
