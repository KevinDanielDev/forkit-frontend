<script setup lang="ts">
import { ref } from 'vue';

import { useDashboard } from 'src/composables/dashboard/useDashboard';
import OrderCreateDialog from 'src/components/dashboard/order/OrderCreateDialog.vue';

const { cards, columns, rows, formatMoney, statusMap } = useDashboard();

const orderCreateDialogRef = ref<InstanceType<typeof OrderCreateDialog> | null>(null);
</script>

<template>
  <q-page padding>
    <div class="row q-col-gutter-lg q-mb-xl">
      <div v-for="(card, index) in cards" :key="index" class="col-12 col-sm-6 col-md-4">
        <q-card flat bordered class="fk-container fk-container--hover">
          <q-card-section class="row items-center no-wrap">
            <div :class="`fk-icon-box-base text-${card.color}`">
              <q-icon :name="card.icon" size="28px" class="relative-position" />
            </div>
            <div class="q-ml-md">
              <div class="text-h5 fk-text-weight-bold fk-text-contrast">{{ card.value }}</div>
              <div class="text-overline text-muted letter-spacing-1 q-mt-xs">{{ card.label }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card flat bordered class="fk-container">
      <q-card-section class="row items-center q-pb-none">
        <div>
          <div class="text-h6 fk-text-weight-bold fk-text-contrast">Órdenes Recientes</div>
          <div class="text-subtitle2 text-muted q-mt-xs">Gestiona tus órdenes de trabajo</div>
        </div>
        <q-space />
        <q-btn
          label="Nueva"
          icon="add"
          color="primary"
          unelevated
          @click="orderCreateDialogRef?.openDialog()"
          class="fk-btn-new text-capitalize q-px-md"
        />
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="client"
          flat
          bordered
          :pagination="{ rowsPerPage: 5 }"
          rows-per-page-label="Registros por página:"
          :pagination-label="(total, start, end) => `${start}-${end} de ${total}`"
          no-data-label="No hay órdenes registradas"
          no-results-label="No se encontraron resultados"
          class="fk-recent-orders-table"
        >
          <template v-slot:body-cell-id="props">
            <q-td :props="props" class="fk-text-weight-bold fk-text-contrast">
              {{ props.row.id }}
            </q-td>
          </template>

          <template v-slot:body-cell-client="props">
            <q-td :props="props" class="fk-text-weight-bold fk-text-contrast">
              {{ props.row.client }}
            </q-td>
          </template>

          <template v-slot:body-cell-total="props">
            <q-td :props="props" class="fk-text-contrast">
              {{ formatMoney(props.row.total) }}
            </q-td>
          </template>

          <template v-slot:body-cell-paymentAmount="props">
            <q-td :props="props">
              <span
                class="text-weight-bold"
                :class="
                  props.row.paymentAmount === props.row.total
                    ? 'text-positive'
                    : props.row.paymentAmount === 0
                      ? 'text-orange'
                      : 'fk-paymentAmount-partial'
                "
              >
                {{ formatMoney(props.row.paymentAmount) }}
              </span>
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <div
                class="fk-status-badge text-caption text-weight-bold"
                :style="{
                  color: `var(--q-${statusMap[props.row.status]?.color})`,
                  backgroundColor: statusMap[props.row.status]?.bg,
                }"
              >
                {{ props.row.status }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat round color="grey-6" icon="visibility" size="sm" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <OrderCreateDialog ref="orderCreateDialogRef" />
  </q-page>
</template>

<style lang="scss">
/* Mantienes tus estilos SCSS actuales igual */
.fk-recent-orders-table {
  border: none;
  thead tr th {
    font-weight: 800 !important;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--q-text-color) !important;
    opacity: 1 !important;
    border-bottom: 2px solid rgba(128, 128, 128, 0.25);
    padding: 16px;
  }
  tbody td {
    height: 64px;
    border-color: rgba(128, 128, 128, 0.08);
  }
  .q-table__bottom {
    border-top: 1px solid rgba(128, 128, 128, 0.12);
    font-size: 0.8rem;
  }
  .q-table__control .q-field__native {
    color: var(--q-primary);
    font-weight: bold;
  }
}

.fk-status-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 100px;
}
.fk-btn-new {
  border-radius: 8px;
}
.letter-spacing-1 {
  letter-spacing: 0.8px;
  line-height: 1.2;
}

.body--light {
  .text-muted {
    color: #666;
  }
  .fk-paymentAmount-partial {
    color: #bf9b30;
  }
  .fk-recent-orders-table thead tr th {
    color: #000000 !important;
  }
}

.body--dark {
  .text-muted {
    color: #999;
  }
  .fk-paymentAmount-partial {
    color: #f2c037;
  }
  .fk-recent-orders-table thead tr th {
    color: #ffffff !important;
  }
}
</style>
