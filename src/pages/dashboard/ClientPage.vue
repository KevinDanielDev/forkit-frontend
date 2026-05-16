<script setup lang="ts">
import KpiCard from 'src/components/common/KpiCard.vue';

import { useCustomer } from 'src/composables/customer/useCustomer';

const { kpiCards, filteredClients, searchQuery, getInitials } = useCustomer();
</script>

<template>
  <q-page padding>
    <kpi-card :kpi-cards="kpiCards" />

    <q-card flat bordered class="fk-container q-pa-sm">
      <q-card-section class="row items-center q-pb-none q-mb-md">
        <div>
          <div class="text-h6 fk-text-weight-bold fk-text-contrast">Directorio de Clientes</div>
          <div class="text-subtitle2 text-muted q-mt-xs">
            Visualiza y gestiona los contactos de ForkIt
          </div>
        </div>
        <q-space />

        <div class="row items-center q-gutter-sm">
          <q-input
            v-model="searchQuery"
            outlined
            dense
            placeholder="Buscar cliente..."
            class="custom-search-input"
          >
            <template #prepend>
              <q-icon name="search" size="xs" class="text-grey-5" />
            </template>
          </q-input>

          <q-btn
            label="Nueva"
            icon="add"
            color="primary"
            unelevated
            class="fk-btn-new text-capitalize q-px-md text-weight-bold"
          />
        </div>
      </q-card-section>

      <q-card-section
        v-if="filteredClients.length === 0"
        class="column items-center justify-center text-center q-pa-xl fk-empty-box"
      >
        <q-icon name="person_search" size="xl" class="text-grey-5 q-mb-sm" />
        <div class="text-subtitle1 text-weight-bold fk-text-contrast">
          No se encontraron clientes
        </div>
        <div class="text-caption text-muted">
          Prueba con otro término o registra un nuevo cliente.
        </div>
      </q-card-section>

      <q-card-section v-else>
        <div class="row q-col-gutter-md">
          <div
            v-for="client in filteredClients"
            :key="client.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div class="fk-premium-card-item q-pa-md column justify-between">
              <div>
                <div class="row items-center justify-between no-wrap q-mb-md">
                  <span class="client-id-badge">#{{ client.id }}</span>
                  <q-btn flat round dense icon="more_horiz" size="xs" color="grey-5">
                    <q-menu auto-close>
                      <q-list dense style="min-width: 100px">
                        <q-item clickable><q-item-section>Editar</q-item-section></q-item>
                        <q-item clickable class="text-negative"
                          ><q-item-section>Eliminar</q-item-section></q-item
                        >
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>

                <div class="row items-center no-wrap q-gutter-x-sm q-mb-sm">
                  <q-avatar
                    size="28px"
                    color="blue-9"
                    text-color="blue-2"
                    class="text-weight-bold text-caption"
                  >
                    {{ getInitials(client.firstName + ' ' + client.lastName) }}
                  </q-avatar>
                  <div class="text-body1 text-weight-bold fk-text-contrast ellipsis">
                    {{ client.firstName + ' ' + client.lastName }}
                  </div>
                </div>

                <div class="row items-center no-wrap q-gutter-x-xs q-mb-md">
                  <q-icon name="business" size="16px" class="text-grey-5 shrink-0" />
                  <span class="text-caption text-muted ellipsis q-pl-xs">
                    {{ client.company || 'Sin Empresa asignada' }}
                  </span>
                </div>
              </div>

              <div class="contact-section q-pt-sm">
                <div
                  class="row items-center no-wrap q-gutter-x-xs text-caption text-muted ellipsis q-mb-xs"
                >
                  <q-icon name="smartphone" size="16px" class="text-grey-5 shrink-0" />
                  <span class="select-all q-pl-xs">{{ client.phone }}</span>
                </div>
                <div
                  class="row items-center no-wrap q-gutter-x-xs text-caption text-muted ellipsis"
                >
                  <q-icon name="mail" size="16px" class="text-grey-5 shrink-0" />
                  <span class="select-all q-pl-xs">{{ client.email }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped>
.fk-premium-card-item {
  border-radius: 10px;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.body--dark {
  .fk-premium-card-item {
    background-color: #121214;
    border: 1px solid rgba(255, 255, 255, 0.08);

    &:hover {
      border-color: rgba(255, 255, 255, 0.16);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }
  }
  .client-id-badge {
    color: #a1a1aa;
    background-color: rgba(255, 255, 255, 0.05);
  }
  .contact-section {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
  .fk-empty-box {
    border: 2px dashed rgba(255, 255, 255, 0.06);
  }
  .forkit-modal {
    background-color: #121214;
    border: 1px solid #27272a;
  }
}

.body--light {
  .fk-premium-card-item {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;

    &:hover {
      border-color: #cbd5e1;
      box-shadow: 0 8px 24px rgba(148, 163, 184, 0.12);
    }
  }
  .client-id-badge {
    color: #475569;
    background-color: #f1f5f9;
  }
  .contact-section {
    border-top: 1px solid #f1f5f9;
  }
  .fk-empty-box {
    border: 2px dashed #cbd5e1;
  }
  .forkit-modal {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
  }
}

.client-id-badge {
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
}

.custom-search-input :deep(.q-field__control) {
  border-radius: 8px !important;
  max-width: 240px;
}

.fk-empty-box {
  border-radius: 12px;
}

.shrink-0 {
  flex-shrink: 0;
}
.fk-btn-new {
  border-radius: 8px;
}
.letter-spacing-1 {
  letter-spacing: 0.8px;
}
</style>
