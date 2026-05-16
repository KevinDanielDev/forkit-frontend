<script setup lang="ts">
/**
 * OrderCreateDialog — Multi-step order creation dialog component.
 * 
 * Renders a responsive modal dialog with three sequential steps for creating new orders:
 * 1. **Client Step** - Collect client contact information
 * 2. **Project Step** - Define project details and scope
 * 3. **Finance Step** - Set financial terms and payment schedule
 * 
 * **Features**
 * - Multi-step workflow with validation at each step
 * - Step progress indicator at top
 * - Back/Next navigation buttons
 * - Mobile-responsive (full-width on mobile, sized on desktop)
 * - Slide-up/down animations
 * - Glassmorphism backdrop effect
 * - Persistent modal (can't dismiss without completing)
 * 
 * **Dialog Structure**
 * - **Header**: Title "Nueva Orden" with icon and progress indicator
 * - **Body**: Dynamic step content (scrollable on mobile)
 * - **Footer**: Navigation buttons (Back/Cancel, Next/Save)
 * 
 * **Step Validation**
 * - Each step validates form data before proceeding
 * - Client Step: Client name, email, phone required
 * - Project Step: Project title, priority, status required
 * - Finance Step: Dates and amounts required, calculates pending balance
 * 
 * **Data Handling**
 * - Collects data hierarchically (client, project, finance)
 * - Final step saves order to Parse database
 * - Shows success notification on completion
 * - Closes dialog and resets state after save
 * 
 * **Responsive Design**
 * - **Mobile** (<= sm): Full-width, max-height 70vh, responsive padding
 * - **Desktop** (> sm): Fixed-width card, max-height 55vh, xl padding
 * 
 * **API**
 * - Public method `openDialog()` exposed via defineExpose
 * - Called from DashboardPage or parent components
 * - Usage: `orderCreateDialogRef?.openDialog()`
 * 
 * @component
 * @example
 * // In parent component:
 * import OrderCreateDialog from 'src/components/dashboard/order/OrderCreateDialog.vue';
 * 
 * const orderDialogRef = ref<InstanceType<typeof OrderCreateDialog> | null>(null);
 * 
 * // In template:
 * <OrderCreateDialog ref="orderDialogRef" />
 * <q-btn @click="orderDialogRef?.openDialog()" label="Create Order" />
 * 
 * @see useOrderCreateDialog - Composable managing dialog state and logic
 * @see ClientStep - First step component
 * @see ProjectStep - Second step component
 * @see FinanceStep - Third step component
 * @see OrderStepProgress - Progress indicator component
 */
import { ClientStep, FinanceStep, ProjectStep, OrderStepProgress } from './steps';

import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

/** Dialog state and navigation management */
const {
  step,
  isMobile,
  isDialogOpen,
  clientStepRef,
  projectStepRef,
  financeStepRef,
  openDialog,
  nextStep,
  backStep,
} = useOrderCreateDialog();

// Expose public API for parent components
defineExpose({ openDialog });
</script>

<template>
  <q-dialog
    v-model="isDialogOpen"
    persistent
    backdrop-filter="blur(16px)"
    transition-show="slide-up"
    transition-hide="slide-down"
    :full-width="isMobile"
  >
    <q-card class="fk-container fk-dialog-xl fk-dialog-surface no-shadow">
      <q-card-section :class="$q.screen.gt.sm ? 'q-pa-xl' : 'q-pa-lg'" class="bg-surface-header">
        <div class="row items-center justify-between">
          <div class="row items-center no-wrap">
            <div class="fk-icon-box-base text-primary q-mr-md shadow-sm" v-if="$q.screen.gt.xs">
              <q-icon name="add_task" size="28px" />
            </div>
            <div>
              <div class="fk-text-weight-bold" :class="$q.screen.gt.sm ? 'text-h5' : 'text-h6'">
                Nueva Orden
              </div>
              <div class="text-caption text-muted opacity-80" v-if="$q.screen.gt.xs">
                Registro de nuevo proyecto
              </div>
            </div>
          </div>
        </div>

        <order-step-progress />
      </q-card-section>

      <q-card-section
        class="scroll fk-dialog-body"
        :class="$q.screen.gt.sm ? 'q-px-xl q-py-md' : 'q-px-lg q-py-md'"
        :style="isMobile ? 'max-height: 70vh' : 'max-height: 55vh'"
      >
        <div v-if="step === 1" class="animate-slide-up">
          <client-step ref="clientStepRef" />
        </div>

        <div v-if="step === 2" class="animate-slide-up">
          <project-step ref="projectStepRef" />
        </div>

        <div v-if="step === 3" class="animate-slide-up">
          <finance-step ref="financeStepRef" />
        </div>
      </q-card-section>

      <q-card-actions
        :class="$q.screen.gt.sm ? 'q-pa-xl' : 'q-pa-lg'"
        class="bg-footer-dialog justify-between border-top"
      >
        <q-btn
          :label="step === 1 ? 'Cancelar' : 'Atrás'"
          @click="backStep()"
          class="fk-btn-nav"
          no-caps
        />
        <q-btn
          unelevated
          :label="step === 3 ? 'Crear Orden' : 'Continuar'"
          color="primary"
          @click="nextStep()"
          class="fk-btn-action"
          no-caps
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.fk-dialog-xl {
  width: 95vw;
  max-width: 750px;
  border-radius: 28px;
  display: flex !important;
  flex-direction: column !important;
  max-height: 90vh;
  overflow: hidden;
}

.fk-dialog-surface {
  background-color: var(--q-bg-color) !important;
}

.fk-btn-action {
  font-weight: 700;
  padding: 10px 35px;
  border-radius: 12px;
  min-width: 140px;
}

.fk-btn-nav {
  font-weight: 600;
  padding: 10px 25px;
  border-radius: 12px;
  border: 1px solid rgba(128, 128, 128, 0.25);
  background-color: rgba(128, 128, 128, 0.1);
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out;
}
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.opacity-50 {
  opacity: 0.5;
}

.body--light {
  .fk-dialog-surface,
  .bg-footer-dialog {
    background-color: #ffffff !important;
  }
}

.body--dark {
  .fk-dialog-surface,
  .bg-footer-dialog {
    background-color: #111317 !important;
  }
  .fk-field :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.03);
  }
}

@media (max-width: 600px) {
  .fk-dialog-xl {
    margin: 10px;
    border-radius: 24px;
  }
  .fk-btn-action {
    min-width: 100px;
    padding: 10px 20px;
  }
}
</style>
