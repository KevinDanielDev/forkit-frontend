import { ref, computed } from 'vue';

import { useQuasar } from 'quasar';

import type { ClientStep, FinanceStep, ProjectStep } from 'src/components/dashboard/order/steps';

import type { IClientData, IFinanceData, IProjectData } from 'src/models/interfaces/order';

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

export function useOrderCreateDialog() {
  const $q = useQuasar();

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
    if (step.value === 1) {
      const isValid = await clientStepRef.value?.validateForm();
      if (!clientStepRef.value || !isValid) return;
      step.value++;
      return;
    }

    if (step.value === 2) {
      const isValid = await projectStepRef.value?.validateForm();
      if (!projectStepRef.value || !isValid) return;
      step.value++;
      return;
    }

    if (step.value === 3) {
      const isValid = await financeStepRef.value?.validateForm();
      if (!financeStepRef.value || !isValid) return;
      step.value++;
      return;
    }
  }

  function backStep() {
    if (step.value === 1) {
      clearData();
      closeDialog();
      return;
    }

    step.value--;
  }

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
  };
}
