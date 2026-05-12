import { ref } from 'vue';
import type { QTableColumn } from 'quasar';

export function useDashboard() {
  const cards = [
    { icon: 'receipt', value: '5', label: 'Total Órdenes', color: 'primary' },
    { icon: 'pending_actions', value: '1', label: 'Pendientes', color: 'orange' },
    { icon: 'description', value: '2', label: 'En Progreso', color: 'primary' },
    { icon: 'done_all', value: '2', label: 'Completadas', color: 'positive' },
    { icon: 'account_balance', value: '$14,800.00', label: 'Ingresos Totales', color: 'info' },
    { icon: 'assignment_turned_in', value: '$7,200.00', label: 'Por Cobrar', color: 'negative' },
  ];

  const columns: QTableColumn[] = [
    { name: 'id', label: '#', field: 'id', align: 'left' },
    { name: 'client', label: 'Cliente', field: 'client', align: 'left', sortable: true },
    { name: 'job', label: 'Trabajo', field: 'job', align: 'left' },
    { name: 'total', label: 'Total', field: 'total', align: 'right', sortable: true },
    { name: 'paymentAmount', label: 'Abono', field: 'paymentAmount', align: 'right' },
    { name: 'delivery', label: 'Entrega', field: 'delivery', align: 'right' },
    { name: 'status', label: 'Estado', field: 'status', align: 'center' },
    { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' },
  ];

  const rows = ref([
    {
      id: 1,
      client: 'María García',
      job: 'Diseño de Logo',
      total: 1500,
      paymentAmount: 800,
      delivery: '14 may 2026',
      status: 'En Progreso',
    },
    {
      id: 2,
      client: 'Carlos Rodríguez',
      job: 'Sitio Web',
      total: 5000,
      paymentAmount: 2000,
      delivery: '29 may 2026',
      status: 'En Progreso',
    },
    {
      id: 3,
      client: 'Ana Martínez',
      job: 'Fotografía de Producto',
      total: 800,
      paymentAmount: 800,
      delivery: '9 may 2026',
      status: 'Completado',
    },
    {
      id: 4,
      client: 'Luis Fernández',
      job: 'Video Promocional',
      total: 3500,
      paymentAmount: 0,
      delivery: '24 may 2026',
      status: 'Pendiente',
    },
    {
      id: 5,
      client: 'Sofía Mendoza',
      job: 'Branding Completo',
      total: 4000,
      paymentAmount: 4000,
      delivery: '4 may 2026',
      status: 'Entregado',
    },
  ]);

  // Función de formateo (ahora utilizada en el template)
  const formatMoney = (v: number) => '$' + v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  const statusMap: Record<string, { color: string; bg: string }> = {
    'En Progreso': { color: 'primary', bg: 'rgba(var(--q-primary), 0.15)' },
    Completado: { color: 'positive', bg: 'rgba(var(--q-positive), 0.15)' },
    Pendiente: { color: 'negative', bg: 'rgba(var(--q-negative), 0.15)' },
    Entregado: { color: 'info', bg: 'rgba(var(--q-info), 0.15)' },
  };

  return {
    cards,
    columns,
    rows,
    formatMoney,
    statusMap,
  };
}
