<script setup lang="ts">
import { ref } from 'vue';

import { QForm } from 'quasar';

import { useValidationRules } from 'src/composables/common/useValidationRules';
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

// Composables
const { clientData } = useOrderCreateDialog();
const { ...rules } = useValidationRules();

const clientFormRef = ref<InstanceType<typeof QForm> | null>(null);

// Methods
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
          lazy-rules
          :rules="rules.requiredEmail"
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
              lazy-rules
              :rules="[rules.required()]"
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
          lazy-rules
          :rules="[rules.required()]"
        >
          <template v-slot:prepend
            ><q-icon name="business" color="primary" class="opacity-50"
          /></template>
        </q-input>
      </div>
    </div>
  </q-form>
</template>
