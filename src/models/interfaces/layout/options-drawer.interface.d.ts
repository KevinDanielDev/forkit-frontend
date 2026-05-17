/**
 * Represents a single navigation menu option.
 *
 * Contains navigation and action information for menu items displayed in the dashboard navigation drawer.
 *
 * @interface IMenuOption
 * @property {string} icon - Quasar icon name (e.g., 'dashboard', 'people', 'logout')
 * @property {string} label - Display label for the menu item
 * @property {string} route - Route path to navigate to when clicked
 * @property {string} [action] - Optional: Action to perform (e.g., 'logout') instead of route navigation
 */
interface IMenuOption {
  icon: string;
  label: string;
  route: string;
  action?: string;
}

/**
 * Represents a group of related navigation menu items.
 *
 * Groups multiple menu options under a common category (e.g., "Gestión", "Análisis").
 * Used to organize the navigation menu structure in the dashboard sidebar.
 *
 * @interface IMenuGroup
 * @property {string} title - Group title or category name
 * @property {IMenuOption[]} items - Array of menu options in this group
 *
 * @example
 * const gestión: IMenuGroup = {
 *   title: 'Gestión',
 *   items: [
 *     { icon: 'receipt_long', label: 'Órdenes', route: '/dashboard/orders' },
 *     { icon: 'people', label: 'Clientes', route: '/dashboard/clients' }
 *   ]
 * };
 */
export interface IMenuGroup {
  title: string;
  items: IMenuOption[];
}
