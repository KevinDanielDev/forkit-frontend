<script setup lang="ts">
/**
 * ClientStep — First step of order creation dialog.
 *
 * Collects client contact information:
 * - Client Name
 * - Email address
 * - Country code (phone prefix)
 * - Phone number
 * - Optional company name
 *
 * **Form Fields**
 * - Name: Required, client company or person name
 * - Email: Required, valid email format
 * - Country code: Required (e.g., +57, +1, +34)
 * - Phone: Required, format depends on country code
 * - Company: Optional, company name if different from name
 *
 * **Validation**
 * - All fields required except company
 * - Email must be valid format
 * - Phone must match country code format
 *
 * **Data Binding**
 * - Two-way binding with clientData from composable
 * - Persists across step navigation
 *
 * **Public API**
 * - `validateForm()` method: Validates and returns boolean
 * - Called by parent (OrderCreateDialog) before proceeding
 *
 * **Layout**
 * - Two-column grid on desktop, single column on mobile
 * - Form icons for visual clarity (person, email, phone)
 *
 * @component
 * @example
 * // Used internally by OrderCreateDialog
 * <client-step ref="clientStepRef" />
 *
 * // Validation in parent:
 * const isValid = await clientStepRef?.validateForm();
 */
import { ref } from 'vue';

import { QForm } from 'quasar';

import { useValidationRules } from 'src/composables/common/useValidationRules';
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

// Composables
const { clientData } = useOrderCreateDialog();
const { ...rules } = useValidationRules();

/** Reference to the form for validation */
const clientFormRef = ref<InstanceType<typeof QForm> | null>(null);

/**
 * Validates all form fields before proceeding to next step.
 * @async
 * @returns {Promise<boolean>} True if all fields are valid
 */
async function validateForm() {
  if (clientFormRef.value) {
    return await clientFormRef.value.validate();
  }
  return false;
}

defineExpose({ validateForm });
</script>

<template>
  <q-form ref="clientFormRef">
    <div class="fk-section-header q-mb-md">Información del Cliente</div>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <label class="fk-label">Nombre</label>
        <q-input
          v-model="clientData.name"
          placeholder="John Doe"
          outlined
          dense
          class="fk-field"
          lazy-rules
          :rules="[rules.required()]"
        >
          <template v-slot:prepend
            ><q-icon name="person" color="primary" class="opacity-50"
          /></template>
        </q-input>
      </div>
      <div class="col-12 col-md-6">
        <label class="fk-label">Email</label>
        <q-input
          v-model="clientData.email"
          placeholder="john.doe@gmail.com"
          outlined
          dense
          class="fk-field"
        >
          <template v-slot:prepend
            ><q-icon name="alternate_email" color="primary" class="opacity-50"
          /></template>
        </q-input>
      </div>

      <div class="col-12 col-md-6">
        <div class="row q-col-gutter-md">
          <div class="col-4">
            <label class="fk-label">Código</label>
            <q-input
              v-model="clientData.countryCode"
              placeholder="+57"
              outlined
              dense
              class="fk-field"
            >
              <template v-slot:prepend
                ><q-icon name="phone" color="primary" class="opacity-50" />
              </template>
            </q-input>
          </div>
          <div class="col-8">
            <label class="fk-label">Número</label>
            <q-input
              v-model="clientData.phone"
              placeholder="312 123 4567"
              outlined
              dense
              class="fk-field"
              lazy-rules
              :rules="rules.requiredPhone"
            >
              <template v-slot:prepend
                ><q-icon name="phone" color="primary" class="opacity-50"
              /></template>
            </q-input>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <label class="fk-label">Empresa</label>
        <q-input
          v-model="clientData.company"
          placeholder="Forkit Studio"
          outlined
          dense
          class="fk-field"
        >
          <template v-slot:prepend
            ><q-icon name="business" color="primary" class="opacity-50"
          /></template>
        </q-input>
      </div>
    </div>
  </q-form>
</template>
