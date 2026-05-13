<script setup lang="ts">
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

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
