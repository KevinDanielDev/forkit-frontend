import { ref, computed } from 'vue';

import type { ICustomer } from 'src/models/interfaces/customer/customer.interface';

export function useCustomer() {
  // Refs
  const clients = ref<ICustomer[]>([
    {
      id: '00001',
      firstName: 'Kevin',
      lastName: 'Fajardo',
      email: 'kevin.fajardo@email.com',
      phone: '3018004367',
      isActive: true,
      createdAt: '2026-05-16',
    },
    {
      id: '00002',
      firstName: 'Alejandro',
      lastName: 'Giraldo',
      email: 'alejandro@diseno.com',
      phone: '3124567890',
      isActive: false,
      createdAt: '2026-05-10',
    },
    {
      id: '00003',
      firstName: 'Beatriz',
      lastName: 'Pinzón',
      email: 'b.pinzon@ecomoda.co',
      phone: '3009876543',
      company: 'Ecomoda S.A.',
      isActive: true,
      createdAt: '2026-05-12',
    },
    {
      id: '00004',
      firstName: 'Carlos',
      lastName: 'Mendoza',
      email: 'carlos.mendoza@email.com',
      phone: '3152223344',
      isActive: true,
      createdAt: '2026-05-15',
    },
  ]);
  const searchQuery = ref('');

  // Computed
  const kpiCards = computed(() => [
    { value: clients.value.length, label: 'Clientes Totales', icon: 'people', color: 'primary' },
    {
      value: clients.value.filter((c) => c.company !== undefined && c.isActive === true).length,
      label: 'Empresas Vinc.',
      icon: 'business',
      color: 'positive',
    },
    {
      value: clients.value.filter((c) => c.isActive === true).length,
      label: 'Clientes Activos',
      icon: 'check_circle',
      color: 'info',
    },
  ]);
  const filteredClients = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return clients.value;

    return clients.value.filter(
      (client) =>
        client.firstName.toLowerCase().includes(query) ||
        client.lastName.toLowerCase().includes(query) ||
        (client.email && client.email.toLowerCase().includes(query)) ||
        (client.company && client.company.toLowerCase().includes(query)),
    );
  });

  // Methods
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return {
    kpiCards,
    filteredClients,
    searchQuery,
    getInitials,
  };
}
