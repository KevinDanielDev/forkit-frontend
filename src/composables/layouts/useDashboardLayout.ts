import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useThemeStore } from 'src/stores/theme-store';
import type { IMenuGroup } from 'src/models/interfaces/layout/options-drawer.interface';

/**
 * Composable for managing dashboard layout state and theme switching.
 * 
 * Manages the dashboard sidebar drawer, theme toggling (light/dark mode),
 * and navigation menu structure. Integrates with Pinia theme store and Quasar's
 * dark mode system to provide persistent theme preferences.
 * 
 * @returns {Object} Layout state, menu configuration, and control methods
 * @returns {Ref<boolean>} .leftDrawerOpen - Left sidebar visibility state
 * @returns {Function} .toggleTheme - Toggle between dark and light theme
 * @returns {Function} .toggleLeftDrawer - Toggle left sidebar visibility
 * @returns {Array<IMenuGroup>} .menuGroups - Navigation menu structure with grouped items
 * 
 * @example
 * const { leftDrawerOpen, toggleTheme, toggleLeftDrawer, menuGroups } = useDashboardLayout();
 * 
 * // Toggle sidebar
 * toggleLeftDrawer();
 * 
 * // Switch theme
 * toggleTheme();
 * 
 * // Iterate menu groups
 * menuGroups.forEach(group => {
 *   console.log(group.title); // "Inicio", "Gestión", etc.
 * });
 */
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

  const menuGroups: IMenuGroup[] = [
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
      items: [{ icon: 'logout', label: 'Cerrar Sesión', route: '/', action: 'logout' }],
    },
  ];

  return {
    leftDrawerOpen,
    toggleTheme,
    toggleLeftDrawer,
    menuGroups,
  };
}
