import { computed } from 'vue';

import type { QTableColumn } from 'quasar';

import { useOrder } from './order/useOrder';

import type { IOrder } from 'src/models/interfaces/order/order.interface';

/**
 * Composable for managing dashboard data and display configuration.
 *
 * Provides dashboard statistics cards, table columns configuration, reactive order data from Vue Query,
 * and formatting utilities. Integrates with Vue Query for data fetching and caching.
 *
 * @returns {Object} Dashboard data and utilities
 * @returns {Array<Object>} .cards - Array of statistic cards with icon, value, label, and color
 * @returns {Array<QTableColumn>} .columns - Quasar table column definitions for orders
 * @returns {ComputedRef<Array>} .orders - Reactive array of orders from Vue Query
 * @returns {Function} .formatMoney - Utility function to format numbers as currency strings
 * @returns {Object} .statusMap - Map of order statuses to color and background styling
 * @returns {Object} .getOrderQuery - Vue Query object with loading, error, and data states
 *
 * @example
 * const { cards, columns, orders, formatMoney, statusMap, getOrderQuery } = useDashboard();
 *
 * // Access orders reactively
 * const allOrders = orders.value;
 *
 * // Format currency
 * const formatted = formatMoney(1500); // Returns: "$1,500.00"
 *
 * // Check loading state
 * if (getOrderQuery.isLoading.value) { ... }
 */
export function useDashboard() {
  const { getOrdersQuery } = useOrder();
  const { data } = getOrdersQuery;

  const orders = computed(() => {
    if (!data.value) return [];
    return Array.isArray(data.value) ? data.value : [data.value];
  });

  const formatMoney = (v: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(v);
  };

  const cards = computed(() => {
    const currentOrders = orders.value;

    return [
      { icon: 'receipt', value: currentOrders.length, label: 'Total Órdenes', color: 'primary' },
      {
        icon: 'pending_actions',
        value: currentOrders.filter((order) => order.project.status === 'Pendiente').length,
        label: 'Pendientes',
        color: 'orange',
      },
      {
        icon: 'description',
        value: currentOrders.filter((order) => order.project.status === 'En Progreso').length,
        label: 'En Progreso',
        color: 'primary',
      },
      {
        icon: 'done_all',
        value: currentOrders.filter((order) => order.project.status === 'Completado').length,
        label: 'Completadas',
        color: 'positive',
      },
      {
        icon: 'account_balance',
        value: formatMoney(
          currentOrders.reduce((acc, order) => acc + order.finance.totalAmount, 0),
        ),
        label: 'Ingresos Totales',
        color: 'info',
      },
      {
        icon: 'assignment_turned_in',
        value: formatMoney(
          currentOrders.reduce((acc, order) => acc + order.finance.depositAmount, 0),
        ),
        label: 'Por Cobrar',
        color: 'negative',
      },
    ];
  });

  const columns: QTableColumn<IOrder>[] = [
    {
      name: 'id',
      label: '#',
      field: (row) => `0000${orders.value.indexOf(row) + 1}`,
      align: 'left',
      sortable: true,
    },
    {
      name: 'clientName',
      label: 'Cliente',
      field: (row) => row.client.name,
      align: 'left',
      sortable: true,
    },
    {
      name: 'projectName',
      label: 'Proyecto',
      field: (row) => row.project.title,
      align: 'left',
      sortable: true,
    },
    {
      name: 'clientPhone',
      label: 'Teléfono',
      field: (row) => row.client.phone,
      align: 'left',
      sortable: true,
    },
    {
      name: 'total',
      label: 'Total',
      field: (row) => formatMoney(row.finance.totalAmount),
      align: 'left',
      sortable: true,
    },
    {
      name: 'paymentAmount',
      label: 'Abono',
      field: (row) => formatMoney(row.finance.depositAmount),
      align: 'left',
      sortable: true,
    },
    {
      name: 'balance',
      label: 'Saldo',
      field: (row) => formatMoney(row.finance.totalAmount - row.finance.depositAmount),
      align: 'left',
      sortable: true,
    },
    {
      name: 'delivery',
      label: 'Entrega',
      field: (row) => row.finance.deliveryDate,
      align: 'left',
      sortable: true,
    },
    {
      name: 'priority',
      label: 'Prioridad',
      field: (row) => row.project.priority,
      align: 'left',
      sortable: true,
    },
    {
      name: 'status',
      label: 'Estado',
      field: (row) => row.project.status,
      align: 'left',
      sortable: true,
    },
    {
      name: 'actions',
      label: 'Acciones',
      field: () => '',
      align: 'left',
    },
  ];

  const priorityMap: Record<string, { color: string; bg: string }> = {
    Baja: { color: 'positive', bg: 'rgba(var(--q-positive), 0.15)' },
    Media: { color: 'warning', bg: 'rgba(var(--q-warning), 0.15)' },
    Alta: { color: 'negative', bg: 'rgba(var(--q-negative), 0.15)' },
    Urgente: { color: 'orange', bg: 'rgba(var(--q-orange-12), 0.15)' },
  };

  return {
    cards,
    columns,
    formatMoney,
    priorityMap,
    getOrdersQuery,
    orders,
  };
}
