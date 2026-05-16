<script setup lang="ts">
/**
 * ClientStep — Dialogo / Step de creación de cliente en Forkit.
 * Estructura de inputs organizada en pares simétricos (de a dos campos).
 */

import { useValidationRules } from 'src/composables/common/useValidationRules';
import { useCreateCustomerDialog } from 'src/composables/customer/useCreateCustomerDialog';

// Composables
const { ...rules } = useValidationRules();
const { isDialogOpen, closeDialog, customerData, createCustomerMutation } =
  useCreateCustomerDialog();
</script>

<template>
  <q-dialog
    v-model="isDialogOpen"
    persistent
    backdrop-filter="blur(6px)"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="fk-dialog-xl fk-dialog-surface">
      <q-card-section class="q-px-lg q-pt-lg q-pb-none">
        <div class="fk-section-header q-mb-xs">Información del Cliente</div>
        <div class="text-caption text-muted">
          Ingresa los datos de contacto para registrar al cliente en el sistema.
        </div>
      </q-card-section>

      <q-card-section class="q-px-lg q-py-md scroll animate-slide-up">
        <q-form
          @submit.prevent="createCustomerMutation.mutate(customerData)"
          class="row q-col-gutter-lg"
        >
          <div class="col-12 col-md-6">
            <label class="fk-label block q-mb-xs">Nombre *</label>
            <q-input
              v-model="customerData.firstName"
              placeholder="John"
              outlined
              dense
              class="fk-field"
              lazy-rules
              :rules="[rules.required()]"
              hide-bottom-space
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" class="opacity-50" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-md-6">
            <label class="fk-label block q-mb-xs">Apellido *</label>
            <q-input
              v-model="customerData.lastName"
              placeholder="Doe"
              outlined
              dense
              class="fk-field"
              hide-bottom-space
              lazy-rules
              :rules="[rules.required()]"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" class="opacity-50" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-md-6">
            <label class="fk-label block q-mb-xs">Correo electrónico</label>
            <q-input
              v-model="customerData.email"
              placeholder="john.doe@gmail.com"
              outlined
              dense
              class="fk-field"
              hide-bottom-space
            >
              <template v-slot:prepend>
                <q-icon name="alternate_email" color="primary" class="opacity-50" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-md-6">
            <label class="fk-label block q-mb-xs">Empresa / Negocio</label>
            <q-input
              v-model="customerData.company"
              placeholder="Forkit Studio"
              outlined
              dense
              class="fk-field"
              hide-bottom-space
            >
              <template v-slot:prepend>
                <q-icon name="business" color="primary" class="opacity-50" />
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
                  class="fk-field"
                  hide-bottom-space
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" color="primary" class="opacity-50" />
                  </template>
                </q-input>
              </div>
              <div class="col-8">
                <label class="fk-label block q-mb-xs">Número *</label>
                <q-input
                  v-model="customerData.phone"
                  placeholder="312 123 4567"
                  outlined
                  dense
                  class="fk-field"
                  lazy-rules
                  :rules="rules.requiredPhone"
                  hide-bottom-space
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" color="primary" class="opacity-50" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <label class="fk-label block q-mb-xs">Estado Inicial</label>
            <q-toggle
              v-model="customerData.isActive"
              icon="toggle_on"
              color="primary"
              label="Activo"
            />
          </div>

          <div class="col-12 q-mt-lg row q-gutter-xs q-pa-md justify-end">
            <q-btn label="Cancelar" no-caps flat class="fk-btn-nav q-mr-xs" @click="closeDialog" />
            <q-btn
              label="Guardar Cliente"
              no-caps
              type="submit"
              unelevated
              color="primary"
              class="fk-btn-action"
              :loading="createCustomerMutation.isPending.value"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.fk-dialog-xl {
  width: 95vw;
  max-width: 680px;
  border-radius: 16px !important;
  display: flex !important;
  flex-direction: column !important;
  max-height: 90vh;
  overflow: hidden;
}

.fk-section-header {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--q-text-color, #ffffff);
}

.fk-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--q-text-color);
  opacity: 0.9;
}

.fk-btn-action {
  font-weight: 700;
  padding: 8px 24px;
  border-radius: 8px;
}

.fk-btn-nav {
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 8px;
}

.opacity-50 {
  opacity: 0.5;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.body--light {
  .fk-dialog-surface {
    background-color: #ffffff !important;
  }
  .bg-footer-dialog {
    background-color: #f8fafc !important;
    border-top: 1px solid #e2e8f0;
  }
  .text-muted {
    color: #64748b;
  }
  .fk-btn-nav {
    border: 1px solid #cbd5e1;
    background-color: #f1f5f9;
    color: #334155;
  }
}

.body--dark {
  .fk-dialog-surface {
    background-color: #111317 !important;
  }
  .bg-footer-dialog {
    background-color: #0d0e12 !important;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }
  .text-muted {
    color: #8a8f98;
  }
  .fk-btn-nav {
    border: 1px solid rgba(255, 255, 255, 0.06);
    background-color: rgba(255, 255, 255, 0.02);
    color: #c9cdd3;
  }
  .fk-field :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.02);
  }
}

@media (max-width: 600px) {
  .fk-dialog-xl {
    margin: 8px;
    border-radius: 14px !important;
  }
}
</style>
