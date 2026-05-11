import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useThemeStore } from 'src/stores/theme-store';

export function useDashboardLayout() {
  const $q = useQuasar();
  const themeStore = useThemeStore();

  $q.dark.set(themeStore.isDark);

  const leftDrawerOpen = ref(true);

  const toggleTheme = () => {
    themeStore.isDark = !themeStore.isDark;
    $q.dark.set(themeStore.isDark);
  };

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  const menuGroups = [
    {
      title: 'Inicio',
      items: [{ icon: 'dashboard', label: 'Dashboard', route: '/dashboard' }],
    },
    {
      title: 'Gestión',
      items: [
        { icon: 'receipt_long', label: 'Órdenes', route: '/dashboard/orders' },
        { icon: 'people', label: 'Clientes', route: '/dashboard/clients' },
      ],
    },
    {
      title: 'Análisis',
      items: [
        { icon: 'analytics', label: 'Reportes', route: '/dashboard/reports' },
        { icon: 'account_balance', label: 'Finanzas', route: '/dashboard/finances' },
      ],
    },
    {
      title: 'Otros',
      items: [{ icon: 'logout', label: 'Cerrar Sesión', route: '/' }],
    },
  ];

  return {
    leftDrawerOpen,
    toggleTheme,
    toggleLeftDrawer,
    menuGroups,
  };
}
