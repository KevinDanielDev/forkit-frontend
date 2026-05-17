<script setup lang="ts">
/**
 * DashboardPage — Main dashboard overview with business metrics and recent orders.
 *
 * Central dashboard interface displaying:
 * - **KPI Cards** — Key performance indicators (total orders, pending, in-progress, completed, income, receivable)
 * - **Orders Table** — Paginated table of all orders with sorting and filtering
 * - **Multi-Filter Search** — Filter by client name, priority, status, and search text
 * - **Order Management** — Create new orders, view details, and delete orders
 * - **Real-time Data** — Vue Query integration for reactive order updates
 * - **Responsive Layout** — Adapts to mobile and desktop viewports
 *
 * Features:
 * - Currency formatting (Colombian Pesos)
 * - Priority and status color coding
 * - Table pagination and sorting
 * - Order creation dialog with multi-step wizard
 * - Order detail modal with file gallery
 * - Drawer for advanced filtering options
 * - Loading and error states with user feedback
 *
 * The page manages comprehensive order workflow from creation through completion,
 * with real-time financial tracking and status monitoring.
 *
 * @component
 * @example
 * // Main dashboard view accessed after authentication
 * // Displays business overview and operational dashboard
 *
 * @see DashboardLayout - Parent layout component
 * @see OrderCreateDialog - Multi-step order creation
 * @see OrderDetailDialog - Order information display
 * @see useDashboard - Dashboard state and utilities
 * @see useOrder - Order queries and mutations
 */
import { ref } from 'vue';

import { useOrder } from 'src/composables/dashboard/order/useOrder';
import { useDashboard } from 'src/composables/dashboard/useDashboard';

import OrderCreateDialog from 'src/components/dashboard/order/OrderCreateDialog.vue';
import OrderDetailDialog from 'src/components/dashboard/order/OrderDetailDialog.vue';
import { useOrderDetailDialog } from 'src/composables/dashboard/order/useOrderDetailDialog';

import KpiCard from 'src/components/common/KpiCard.vue';

const {
  cards,
  columns,
  priorityMap,
  orders,
  getOrdersQuery,
  filterInput,
  selectedClient,
  selectedPriority,
  selectedStatus,
  multiCriteriaFilter,
  clearAllFilters,
  customerNameOptions,
  tableFilters,
} = useDashboard();

const { deleteOrderMutation } = useOrder();
const { isPending } = deleteOrderMutation;

const { isOpenDetailDialog, openDialog } = useOrderDetailDialog();
const orderCreateDialogRef = ref<InstanceType<typeof OrderCreateDialog> | null>(null);
const priorityOptions = ['Alta', 'Media', 'Baja', 'Urgente'];
const statusOptions = ['Pendiente', 'En Progreso', 'Completado'];
</script>

<template>
  <q-page padding>
    <KpiCard :kpi-cards="cards" />
    <div class="row q-col-gutter-y-md">
      <div
        v-if="!getOrdersQuery.isLoading.value && !getOrdersQuery.isError.value"
        class="col-12 fk-filters-bar"
      >
        <div class="fk-filters-inner">
          <div class="fk-filter-item">
            <q-input
              v-model="filterInput"
              outlined
              dense
              placeholder="Buscar proyecto..."
              class="fk-filter-component"
            >
              <template #prepend>
                <q-icon name="search" size="xs" class="text-grey-5" />
              </template>
            </q-input>
          </div>

          <div class="fk-filter-item">
            <q-select
              v-model="selectedClient"
              :options="customerNameOptions"
              outlined
              dense
              clearable
              label="Cliente"
              class="fk-filter-component"
            >
              <template #prepend>
                <q-icon name="person" size="xs" class="text-grey-5" />
              </template>
            </q-select>
          </div>

          <div class="fk-filter-item fk-filter-item--small">
            <q-select
              v-model="selectedPriority"
              :options="priorityOptions"
              outlined
              dense
              clearable
              label="Prioridad"
              class="fk-filter-component"
            >
              <template #prepend>
                <q-icon name="flag" size="xs" class="text-grey-5" />
              </template>
            </q-select>
          </div>

          <div class="fk-filter-item">
            <q-select
              v-model="selectedStatus"
              :options="statusOptions"
              outlined
              dense
              clearable
              label="Estado"
              class="fk-filter-component"
            >
              <template #prepend>
                <q-icon name="hourglass_empty" size="xs" class="text-grey-5" />
              </template>
            </q-select>
          </div>

          <div
            v-if="filterInput || selectedClient || selectedPriority || selectedStatus"
            class="fk-filter-reset"
          >
            <q-btn flat round dense color="grey-5" icon="filter_alt_off" @click="clearAllFilters">
              <q-tooltip class="bg-dark text-caption">Limpiar filtros</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>

      <div class="col-12">
        <q-card flat bordered class="fk-container">
          <q-card-section
            class="row items-center justify-between q-px-md q-pt-md q-pb-none q-mb-md"
          >
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
              class="fk-btn-new text-capitalize q-px-md text-weight-bold"
            />
          </q-card-section>

          <q-card-section class="q-pa-none overflow-hidden">
            <div v-if="getOrdersQuery.isLoading.value" class="text-center q-py-xl">
              <q-spinner color="primary" size="50px" />
              <div class="text-subtitle2 q-mt-md">Cargando órdenes...</div>
            </div>

            <div v-else-if="getOrdersQuery.isError.value" class="text-center q-py-xl">
              <q-icon name="error" size="50px" color="negative" />
              <div class="text-subtitle2 q-mt-md text-negative">Error al cargar las órdenes</div>
            </div>

            <q-table
              v-else
              :rows="orders"
              :columns="columns"
              row-key="objectId"
              flat
              :filter="tableFilters"
              :filter-method="multiCriteriaFilter"
              :pagination="{ rowsPerPage: 5 }"
              rows-per-page-label="Registros por página:"
              :pagination-label="(total, start, end) => `${start}-${end} de ${total}`"
              no-data-label="No hay órdenes registradas"
              no-results-label="No se encontraron coincidencias para los criterios de filtrado"
              class="fk-recent-orders-table full-width"
            >
              <template v-slot:body-cell-customer="props">
                <q-td :props="props">
                  <div class="text-weight-bold fk-text-contrast">
                    {{ props.row.customer?.firstName }} {{ props.row.customer?.lastName }}
                  </div>
                  <div class="text-caption text-muted">
                    {{ props.row.customer?.company || 'Sin Empresa' }}
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-priority="props">
                <q-td :props="props">
                  <div
                    class="fk-status-badge text-caption text-weight-bold"
                    :style="{
                      color: `var(--q-${priorityMap[props.row.project?.priority]?.color})`,
                      backgroundColor: priorityMap[props.row.project?.priority]?.bg,
                    }"
                  >
                    <q-badge
                      :color="priorityMap[props.row.project?.priority]?.color"
                      :label="props.row.project?.priority"
                      text-color="black"
                      class="text-capitalize q-pa-sm"
                    />
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-status="props">
                <q-td :props="props" class="text-capitalize">
                  <q-chip
                    dense
                    outline
                    :color="
                      props.row.project?.status === 'Completado' ||
                      props.row.project?.status === 'Completada'
                        ? 'positive'
                        : props.row.project?.status === 'En Progreso'
                          ? 'warning'
                          : 'grey-6'
                    "
                    class="text-weight-medium text-caption q-px-sm"
                  >
                    {{ props.row.project?.status || 'Pendiente' }}
                  </q-chip>
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="text-center">
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="visibility"
                    size="sm"
                    @click="openDialog(props.row.objectId)"
                  />
                  <q-btn
                    flat
                    round
                    color="negative"
                    :icon="isPending ? '' : 'delete'"
                    size="sm"
                    :loading="isPending"
                    @click="deleteOrderMutation.mutate(props.row.objectId)"
                  />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <OrderCreateDialog ref="orderCreateDialogRef" />
    <OrderDetailDialog v-model="isOpenDetailDialog" />
  </q-page>
</template>

<style lang="scss">
.fk-recent-orders-table {
  background-color: transparent !important;

  .q-table__middle {
    max-width: 100% !important;
    overflow-x: auto !important;

    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(128, 128, 128, 0.15);
      border-radius: 10px;
    }
  }

  .q-table {
    min-width: 960px !important;
  }

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

.fk-filters-bar {
  width: 100%;
  padding: 4px 2px;
}

.fk-filters-inner {
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  width: 100%;
}

.fk-filter-item {
  flex: 1 1 210px;
  max-width: 240px;
  min-width: 140px;

  &--small {
    flex: 1 1 140px;
    max-width: 160px;
    min-width: 100px;
  }
}

.fk-filter-component {
  width: 100%;
  :deep(.q-field__control) {
    border-radius: 8px !important;
    background: rgba(128, 128, 128, 0.03);
  }
}

.fk-filter-reset {
  display: flex;
  align-items: center;
  align-self: center;
  flex-shrink: 0;
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
  .fk-recent-orders-table thead tr th {
    color: #000000 !important;
  }
}

.body--dark {
  .text-muted {
    color: #999;
  }
  .fk-recent-orders-table thead tr th {
    color: #ffffff !important;
  }
}

@media (max-width: 1260px) {
  .fk-filters-bar {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 8px;

    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(128, 128, 128, 0.2);
      border-radius: 10px;
    }
  }
  .fk-filters-inner {
    width: max-content;
  }
  .fk-filter-item {
    flex: 0 0 200px;
    width: 200px;
    &--small {
      flex: 0 0 130px;
      width: 130px;
    }
  }
}

@media (max-width: 599px) {
  .fk-filters-bar {
    overflow-x: visible;
  }
  .fk-filters-inner {
    flex-direction: column;
    width: 100%;
  }
  .fk-filter-item {
    flex: 1 1 100%;
    width: 100%;
    max-width: 100%;

    &--small {
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>
