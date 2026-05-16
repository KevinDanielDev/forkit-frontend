<script setup lang="ts">
/**
 * OrderStepProgress — Progress indicator component for multi-step dialog.
 * 
 * Displays visual indication of:
 * - Linear progress bar (0-100%)
 * - Three step labels (1. Cliente, 2. Proyecto, 3. Finanzas)
 * - Current step highlight in primary color
 * - "Requerido" (Required) subtitle for all steps
 * 
 * **Features**
 * - Progress bar fills as user advances through steps
 * - Step 1: 33%, Step 2: 66%, Step 3: 100%
 * - Active step (current and completed) shown in primary color (blue)
 * - Inactive steps shown in gray
 * - Responsive layout (larger spacing on desktop)
 * 
 * **Progress Calculation**
 * - Computed from step number: step / 3
 * - Updated reactively as user navigates
 * - Step 1: progress = 0.33
 * - Step 2: progress = 0.66
 * - Step 3: progress = 1.0
 * 
 * **Visual Design**
 * - Thin progress bar (4px height)
 * - Step labels with icon numbers
 * - Required tag for all steps
 * - Matches ForkIt design system
 * 
 * **Responsive**
 * - Larger margins on desktop (q-mt-xl)
 * - Smaller margins on mobile (q-mt-md)
 * 
 * @component
 * @example
 * // Used internally by OrderCreateDialog
 * <order-step-progress />
 */
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

/** Dialog state for step tracking and progress calculation */
const { step, progress } = useOrderCreateDialog();
</script>

<template>
  <div :class="$q.screen.gt.sm ? 'q-mt-xl' : 'q-mt-md'">
    <q-linear-progress :value="progress" color="primary" class="fk-progress-thin" />
    <div class="row justify-between q-mt-sm">
      <div class="column items-center">
        <span class="fk-step-label" :class="{ 'text-primary fk-text-weight-bold': step >= 1 }">
          1. Cliente
        </span>
        <span
          class="text-caption text-muted opacity-60"
          style="font-size: 0.65rem; margin-top: -2px; font-weight: bold"
        >
          Requerido
        </span>
      </div>

      <div class="column items-center">
        <span class="fk-step-label" :class="{ 'text-primary fk-text-weight-bold': step >= 2 }">
          2. Proyecto
        </span>
        <span
          class="text-caption text-muted opacity-60"
          style="font-size: 0.65rem; margin-top: -2px; font-weight: bold"
        >
          Requerido
        </span>
      </div>

      <div class="column items-center">
        <span class="fk-step-label" :class="{ 'text-primary fk-text-weight-bold': step >= 3 }">
          3. Finanzas
        </span>
        <span
          class="text-caption text-muted opacity-60"
          style="font-size: 0.65rem; margin-top: -2px; font-weight: bold"
        >
          Requerido
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fk-progress-thin {
  height: 4px;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.1);
}

.fk-step-label {
  font-size: 0.75rem;
  color: #888;
}
</style>
