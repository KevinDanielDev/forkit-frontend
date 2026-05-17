import { ref, computed } from 'vue';

import { useQuasar } from 'quasar';

import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { useNotify } from 'src/composables/common/useNotify';

import { createOrder } from 'src/infrastructure/parse/order/order.service';

import type { ClientStep, FinanceStep, ProjectStep } from 'src/components/dashboard/order/steps';

import type { IOrder } from 'src/models/interfaces/order/order.interface';
import type { IFinanceData, IProjectData } from 'src/models/interfaces/order';
import type { ICustomerData } from 'src/models/interfaces/customer/customer-data.interface';

// Type for step component reference with validateForm method
interface StepComponent {
  validateForm(): Promise<boolean>;
}

// Refs Global
const step = ref<number>(1);
const filesPreview = ref<string[]>([]);

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
 * Multi-step order creation dialog state management and validation.
 *
 * Manages the complete order creation workflow including:
 * - **Multi-Step Navigation**: Navigate through client, project, and finance steps
 * - **Form Validation**: Validate each step before advancing (using step components' validateForm)
 * - **Data Aggregation**: Collect customer, project, and finance data across steps
 * - **File Management**: Handle file uploads and preview management
 * - **Mutation Handling**: Create order with Vue Query mutation and cache invalidation
 * - **Responsive Behavior**: Adapt layout for mobile/desktop screens
 * - **Progress Tracking**: Compute progress percentage for visual indicators
 *
 * The composable manages global refs for customer, project, and finance data that are
 * modified directly by child step components via template refs (clientStepRef, projectStepRef, financeStepRef).
 * Upon successful validation of all steps, it triggers the createOrderMutation which persists to Parse.
 *
 * @returns {Object} Dialog state, computed properties, and control methods
 * @returns {Ref<number>} .step - Current step number (1, 2, or 3)
 * @returns {Ref<boolean>} .isDialogOpen - Whether dialog is visible
 * @returns {Ref<InstanceType>} .clientStepRef - Reference to ClientStep component
 * @returns {Ref<InstanceType>} .projectStepRef - Reference to ProjectStep component
 * @returns {Ref<InstanceType>} .financeStepRef - Reference to FinanceStep component
 * @returns {Ref<ICustomerData>} .customerData - Current customer information
 * @returns {Ref<IProjectData>} .projectData - Current project information
 * @returns {Ref<IFinanceData>} .financeData - Current finance information
 * @returns {Ref<string[]>} .filesPreview - Array of file preview URLs
 * @returns {Computed<number>} .progress - Completion percentage (0 to 1)
 * @returns {Computed<boolean>} .isMobile - True if viewport width is less than medium (md)
 * @returns {Computed<number>} .pendingAmount - Remaining balance (totalAmount - depositAmount)
 * @returns {Function} .openDialog - Toggle dialog visibility
 * @returns {Function} .closeDialog - Close dialog and reset state
 * @returns {Function} .nextStep - Validate current step and advance to next
 * @returns {Function} .backStep - Return to previous step or close if on step 1
 * @returns {Object} .createOrderMutation - Vue Query mutation for order creation
 * @returns {Ref<boolean>} .isPending - True while order is being saved
 *
 * @example
 * // In a Vue component using the multi-step dialog
 * const {
 *   step,
 *   isDialogOpen,
 *   customerData,
 *   projectData,
 *   financeData,
 *   progress,
 *   isMobile,
 *   openDialog,
 *   nextStep,
 *   backStep,
 *   isPending
 * } = useOrderCreateDialog();
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

    if (!currentRef || !currentRef.value) return;

    const isValid = await (currentRef.value as StepComponent).validateForm();

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
