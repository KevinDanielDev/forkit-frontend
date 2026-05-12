<script setup lang="ts">
import { ref } from 'vue';

import { QForm } from 'quasar';

import { useValidationRules } from 'src/composables/common/useValidationRules';
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

// Composables
const { ...rules } = useValidationRules();
const { financeData, pendingAmount } = useOrderCreateDialog();

// Refs
const financeFormRef = ref<InstanceType<typeof QForm> | null>(null);

// Methods
async function validateForm() {
  return financeFormRef.value ? await financeFormRef.value.validate() : false;
}

defineExpose({ validateForm });
</script>

<template>
  <q-form ref="financeFormRef" class="animate-slide-up">
    <div class="fk-section-header q-mb-lg">Presupuesto & Entrega</div>

    <div class="row q-col-gutter-lg items-stretch">
      <div class="col-12 col-md-7">
        <div class="column q-gutter-y-md">
          <div class="fk-input-group">
            <label class="fk-label">Fecha de Inicio</label>
            <q-input
              v-model="financeData.startDate"
              outlined
              dense
              readonly
              placeholder="Seleccionar fecha..."
              class="fk-field q-mt-xs"
              :rules="[rules.required()]"
            >
              <template v-slot:prepend
                ><q-icon name="calendar_today" size="20px" color="primary"
              /></template>
              <q-popup-proxy
                ><q-date v-model="financeData.startDate" mask="YYYY-MM-DD" color="primary"
              /></q-popup-proxy>
            </q-input>
          </div>

          <div class="fk-input-group">
            <label class="fk-label">Fecha de Entrega Final</label>
            <q-input
              v-model="financeData.deliveryDate"
              outlined
              dense
              readonly
              placeholder="Seleccionar fecha..."
              class="fk-field q-mt-xs"
              :rules="[rules.required()]"
            >
              <template v-slot:prepend
                ><q-icon name="calendar_today" size="20px" color="primary"
              /></template>
              <q-popup-proxy
                ><q-date v-model="financeData.deliveryDate" mask="YYYY-MM-DD" color="primary"
              /></q-popup-proxy>
            </q-input>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="fk-label">Monto Total</label>
              <q-input
                v-model.number="financeData.totalAmount"
                outlined
                dense
                type="text"
                prefix="$"
                placeholder="0"
                class="fk-field q-mt-xs"
                :rules="[rules.required()]"
              />
            </div>
            <div class="col-6">
              <label class="fk-label">Abono Inicial</label>
              <q-input
                v-model.number="financeData.depositAmount"
                outlined
                dense
                type="text"
                prefix="$"
                placeholder="0"
                class="fk-field q-mt-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-5">
        <div class="fk-balance-panel full-height column justify-center items-center q-pa-lg">
          <div class="text-overline text-muted q-mb-xs">Saldo Pendiente</div>
          <div class="row items-baseline">
            <span class="text-h3 fk-text-weight-bold fk-text-contrast">
              ${{ pendingAmount.toLocaleString() }}
            </span>
          </div>

          <q-badge
            :color="pendingAmount <= 0 ? 'primary' : 'negative'"
            :class="pendingAmount <= 0 ? 'bg-positive' : 'fk-badge-outline'"
            rounded
            class="q-mt-md q-px-md q-py-xs"
          >
            {{ pendingAmount <= 0 ? 'PAGO CUBIERTO' : 'PAGO PENDIENTE' }}
          </q-badge>
        </div>
      </div>
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
.fk-balance-panel {
  background: rgba(128, 128, 128, 0.05);
  border: 1px solid rgba(128, 128, 128, 0.1);
  border-radius: 24px;
  min-height: 200px;
}
</style>
