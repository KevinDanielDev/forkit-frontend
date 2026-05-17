<script setup lang="ts">
import { ref } from 'vue';
import { QForm } from 'quasar';

import { useCustomer } from 'src/composables/dashboard/customer/useCustomer';
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

import type { ICustomerFilterOptions } from 'src/models/interfaces/customer/filter-customer';

const { customerData } = useOrderCreateDialog();
const { selectedCustomer, filterOptions, filterFn } = useCustomer();

const clientFormRef = ref<InstanceType<typeof QForm> | null>(null);

function onCustomerSelect(customer: ICustomerFilterOptions | null) {
  if (!customer) {
    customerData.value.objectId = '';
    customerData.value.firstName = '';
    customerData.value.lastName = '';
    customerData.value.email = '';
    customerData.value.countryCode = '';
    customerData.value.phone = '';
    customerData.value.company = '';
    return;
  }

  customerData.value.objectId = customer.objectId;
  customerData.value.firstName = customer.label;
  customerData.value.lastName = customer.lastName;
  customerData.value.email = customer.email;
  customerData.value.countryCode = customer.countryCode;
  customerData.value.phone = customer.phone;
  customerData.value.company = customer.company;
}

async function validateForm() {
  return clientFormRef.value ? await clientFormRef.value.validate() : false;
}
defineExpose({ validateForm });
</script>

<template>
  <q-form ref="clientFormRef">
    <div class="row q-mb-lg">
      <div class="col-12">
        <div class="fk-section-header q-pa-md row items-center no-wrap rounded-lg">
          <q-icon name="contacts" size="sm" color="blue-4" class="q-mr-md" />
          <div>
            <div class="text-subtitle1 text-weight-bold text-white line-height-none tracking-tight">
              Información del Cliente
            </div>
            <div class="text-caption text-blue-1 q-mt-xs text-weight-medium">
              Asocia un cliente de tu directorio para esta orden.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-12">
        <label class="fk-label block q-mb-xs">Buscar o Seleccionar Cliente *</label>
        <q-select
          v-model="selectedCustomer"
          :options="filterOptions"
          use-input
          clearable
          fill-input
          hide-selected
          input-debounce="100"
          placeholder="Escribe el nombre del cliente..."
          outlined
          dense
          class="fk-field custom-select-glow"
          @filter="filterFn"
          @update:model-value="onCustomerSelect"
          :rules="[(val) => !!val || 'Debes asociar un cliente para continuar']"
          hide-bottom-space
        >
          <template v-slot:prepend>
            <q-icon name="search" color="primary" class="opacity-50" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey-6 text-caption">
                No hay resultados. Crea el cliente primero en el directorio.
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>

    <div class="row q-col-gutter-lg animate-slide-up">
      <div class="col-12 col-md-6">
        <label class="fk-label block q-mb-xs">Nombre asignado</label>
        <q-input
          v-model="customerData.firstName"
          placeholder="Autocompletado..."
          outlined
          dense
          readonly
          class="fk-field fk-field-readonly"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="primary" class="opacity-40" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-6">
        <label class="fk-label block q-mb-xs">Apellido asignado</label>
        <q-input
          v-model="customerData.lastName"
          placeholder="Autocompletado..."
          outlined
          dense
          readonly
          class="fk-field fk-field-readonly"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="primary" class="opacity-40" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-6">
        <label class="fk-label block q-mb-xs">Correo electrónico</label>
        <q-input
          v-model="customerData.email"
          placeholder="Autocompletado..."
          outlined
          dense
          readonly
          class="fk-field fk-field-readonly"
        >
          <template v-slot:prepend>
            <q-icon name="alternate_email" color="primary" class="opacity-40" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-6">
        <div class="row q-col-gutter-sm">
          <div class="col-4">
            <label class="fk-label block q-mb-xs">Código</label>
            <q-input
              v-model="customerData.countryCode"
              placeholder="+57"
              outlined
              dense
              readonly
              class="fk-field fk-field-readonly"
            >
              <template v-slot:prepend>
                <q-icon name="phone" color="primary" class="opacity-40" />
              </template>
            </q-input>
          </div>
          <div class="col-8">
            <label class="fk-label block q-mb-xs">Número de Teléfono</label>
            <q-input
              v-model="customerData.phone"
              placeholder="Autocompletado..."
              outlined
              dense
              readonly
              class="fk-field fk-field-readonly"
            >
              <template v-slot:prepend>
                <q-icon name="smartphone" color="primary" class="opacity-40" />
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <label class="fk-label block q-mb-xs">Empresa vinculada</label>
        <q-input
          v-model="customerData.company"
          placeholder="Autocompletado..."
          outlined
          dense
          readonly
          class="fk-field fk-field-readonly"
        >
          <template v-slot:prepend>
            <q-icon name="business" color="primary" class="opacity-40" />
          </template>
        </q-input>
      </div>
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
.fk-section-header {
  min-height: 70px;
}

.rounded-lg {
  border-radius: 12px;
}

.fk-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--q-text-color);
  opacity: 0.9;
}

.opacity-50 {
  opacity: 0.5;
}
.opacity-40 {
  opacity: 0.4;
}

.line-height-none {
  line-height: 1.1;
}
.tracking-tight {
  letter-spacing: -0.015em;
}

.animate-slide-up {
  animation: slideUp 0.35s ease-out;
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

.body--dark {
  .fk-section-header {
    background-color: rgba(33, 150, 243, 0.06);
    border: 1px solid rgba(33, 150, 243, 0.1);
  }
  .fk-field-readonly :deep(.q-field__control) {
    background-color: rgba(255, 255, 255, 0.01) !important;
    border-color: rgba(255, 255, 255, 0.04) !important;
    opacity: 0.6;
  }
  .custom-select-glow :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.02);
  }
}

.body--light {
  .fk-section-header {
    background-color: rgba(33, 150, 243, 0.04);
    border: 1px solid rgba(33, 150, 243, 0.08);
    .text-white {
      color: var(--q-text-color, #0f172a) !important;
    }
    .text-blue-1 {
      color: #1d4ed8 !important;
      opacity: 0.9;
    }
  }
  .fk-field-readonly :deep(.q-field__control) {
    background-color: #f8fafc !important;
    border-color: #e2e8f0 !important;
    opacity: 0.7;
  }
}
</style>
