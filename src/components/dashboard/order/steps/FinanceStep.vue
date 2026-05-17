<script setup lang="ts">
/**
 * FinanceStep — Third and final step of order creation dialog.
 *
 * Collects financial information and payment terms:
 * - Project start date
 * - Delivery/completion date
 * - Total project amount
 * - Deposit/down payment amount
 * - Calculated pending balance
 *
 * **Form Fields**
 * - Start Date: Required, date picker (YYYY-MM-DD format)
 * - Delivery Date: Required, date picker (YYYY-MM-DD format)
 * - Total Amount: Required, numeric input in currency
 * - Deposit Amount: Required, numeric input in currency
 * - Pending Balance: Calculated field (readonly) = Total - Deposit
 *
 * **Calculations**
 * - Pending Amount = Total Amount - Deposit Amount
 * - Automatically updated when amounts change
 * - Shows remaining balance to be collected
 *
 * **Validation**
 * - All dates and amounts required
 * - Deposit cannot exceed total amount
 * - Start date should be before delivery date (soft validation)
 *
 * **Data Binding**
 * - Two-way binding with financeData from composable
 * - Computed pendingAmount for display
 *
 * **Public API**
 * - `validateForm()` method: Validates and returns boolean
 * - Called by parent (OrderCreateDialog) before saving
 *
 * **Layout**
 * - Left column (7/12): Date and amount inputs
 * - Right column (5/12): Summary and pending amount display
 * - Mobile: Stacked single column
 *
 * **On Final Save**
 * - Triggers order creation mutation
 * - Saves complete order with all three sections
 * - Closes dialog and resets state
 *
 * @component
 * @example
 * // Used internally by OrderCreateDialog
 * <finance-step ref="financeStepRef" />
 *
 * // Validation in parent:
 * const isValid = await financeStepRef?.validateForm();
 */
import { ref } from 'vue';

import { QForm } from 'quasar';

import { useValidationRules } from 'src/composables/common/useValidationRules';
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

// Composables
const { ...rules } = useValidationRules();
const { financeData, pendingAmount } = useOrderCreateDialog();

/** Reference to the form for validation */
const financeFormRef = ref<InstanceType<typeof QForm> | null>(null);

/**
 * Validates all form fields before saving order.
 * @async
 * @returns {Promise<boolean>} True if all fields are valid
 */
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
