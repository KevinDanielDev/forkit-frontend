import { computed, ref } from 'vue';
import type { QTableColumn } from 'quasar';
import { useOrder } from './order/useOrder';
import type { IOrder } from 'src/models/interfaces/order/order.interface';
import { useCustomer } from './customer/useCustomer';

/**
 * Composable for managing dashboard data, display configurations, and multi-criteria filters.
 */
export function useDashboard() {
  const { getOrdersQuery } = useOrder();
  const { data } = getOrdersQuery;
  const { customers } = useCustomer();

  const filterInput = ref<string>('');
  const selectedClient = ref<string | null>(null);
  const selectedPriority = ref<string | null>(null);
  const selectedStatus = ref<string | null>(null);

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

  const customerNameOptions = computed(() => {
    const names = customers.value
      .map((row) => {
        const firstName = row.firstName || '';
        const lastName = row.lastName || '';
        return `${firstName} ${lastName}`.trim();
      })
      .filter(Boolean);

    return [...new Set(names)];
  });

  const tableFilters = computed(() => ({
    text: filterInput.value,
    client: selectedClient.value,
    priority: selectedPriority.value,
    status: selectedStatus.value,
  }));

  const filteredOrders = computed(() => {
    return orders.value.filter((row) => {
      if (selectedClient.value) {
        const customerName =
          `${row.customer?.firstName || ''} ${row.customer?.lastName || ''}`.trim();
        if (customerName !== selectedClient.value) return false;
      }
      return true;
    });
  });

  const cards = computed(() => {
    const currentOrders = filteredOrders.value;

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
          currentOrders.reduce((acc, order) => {
            const isCompleted = order.project.status === 'Completado';
            const income = isCompleted ? order.finance.totalAmount : order.finance.depositAmount;
            return acc + income;
          }, 0),
        ),
        label: 'Ingresos Totales',
        color: 'info',
      },
      {
        icon: 'assignment_turned_in',
        value: formatMoney(
          currentOrders
            .filter((order) => order.project.status !== 'Completado')
            .reduce(
              (acc, order) => acc + (order.finance.totalAmount - order.finance.depositAmount),
              0,
            ),
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
      name: 'customer',
      label: 'Cliente',
      field: (row) => `${row.customer.firstName} ${row.customer.lastName}`,
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
      field: (row) => row.customer.phone,
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

  function multiCriteriaFilter(
    rows: readonly IOrder[],
    terms: {
      text: string;
      client: string;
      priority: string;
      status: string;
    },
  ): IOrder[] {
    return rows.filter((row) => {
      if (terms.text) {
        const cleanText = terms.text.toLowerCase().trim();
        const projectTitle = row.project?.title?.toLowerCase() || '';
        if (!projectTitle.includes(cleanText)) return false;
      }

      if (terms.client) {
        const customerName =
          `${row.customer?.firstName || ''} ${row.customer?.lastName || ''}`.trim();
        if (customerName !== terms.client) return false;
      }
      if (terms.priority) {
        const priority = row.project?.priority || '';
        if (priority !== terms.priority) return false;
      }

      if (terms.status) {
        const status = row.project?.status || '';
        if (status !== terms.status) return false;
      }

      return true;
    });
  }

  function clearAllFilters() {
    filterInput.value = '';
    selectedClient.value = null;
    selectedPriority.value = null;
    selectedStatus.value = null;
  }

  return {
    cards,
    columns,
    priorityMap,
    getOrdersQuery,
    orders,
    filterInput,
    selectedClient,
    selectedPriority,
    selectedStatus,
    customerNameOptions,
    tableFilters,
    formatMoney,
    multiCriteriaFilter,
    clearAllFilters,
  };
}
