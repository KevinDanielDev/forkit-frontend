import { ref, computed } from 'vue';
import { useDashboard } from 'src/composables/dashboard/useDashboard';

const isOpenDetailDialog = ref(false);
const showGallery = ref(false);
const selectedOrderId = ref<string | null>(null);

export function useOrderDetailDialog() {
  const { priorityMap, orders } = useDashboard();

  const order = computed(() => {
    if (!selectedOrderId.value) return null;
    return orders.value.find((o) => o.objectId === selectedOrderId.value) || null;
  });

  const displayIndex = computed(() => {
    const index = orders.value.findIndex((o) => o.objectId === selectedOrderId.value);
    return index !== -1 ? `${String(index + 1).padStart(5, '0')}` : '00000';
  });

  const images = computed(() => {
    const filesData = order.value?.project?.files;
    if (!filesData) return [];
    return (Array.isArray(filesData) ? filesData : []).map((img: unknown) => ({
      url: (img as { _url: string; url: string })._url,
    }));
  });

  const priorityColor = computed(() => {
    const p = order.value?.project?.priority;
    if (!p || !priorityMap[p]) return { color: 'grey-7', bg: 'rgba(128,128,128,0.1)' };
    return priorityMap[p];
  });

  const statusColor = computed(() => {
    const status = order.value?.project?.status;
    if (status === 'Pendiente') return 'orange';
    if (status === 'En Progreso') return 'primary';
    if (status === 'Completado') return 'positive';
    return 'grey';
  });

  const openDialog = (orderId: string) => {
    selectedOrderId.value = orderId;
    isOpenDetailDialog.value = true;
    showGallery.value = false;
  };

  const closeDialog = () => {
    isOpenDetailDialog.value = false;
  };

  return {
    isOpenDetailDialog,
    showGallery,
    selectedOrderId,

    order,
    displayIndex,
    images,
    priorityColor,
    statusColor,

    openDialog,
    closeDialog,
  };
}
