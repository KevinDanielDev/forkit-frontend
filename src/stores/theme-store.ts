import { defineStore, acceptHMRUpdate } from 'pinia';

/**
 * Theme state management store using Pinia.
 *
 * Manages the application's theme state, specifically the dark/light mode toggle.
 * The store persists theme preference and provides reactive state for all components.
 *
 * **State**
 * - `isDark` — Boolean flag indicating if dark theme is active (default: true)
 *
 * **Usage**
 * Theme switching is typically handled by the `useDashboardLayout` composable,
 * which updates this store and applies Quasar's setDarkMode utility.
 *
 * @example
 * // In any component:
 * import { useThemeStore } from 'src/stores/theme-store';
 *
 * const themeStore = useThemeStore();
 *
 * // Access current theme
 * console.log(themeStore.isDark); // true or false
 *
 * // Update theme (usually done by useDashboardLayout)
 * themeStore.isDark = !themeStore.isDark;
 *
 * @see useDashboardLayout - Composable that manages theme switching
 * @see App.vue - Global dark mode application
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    /** @type {boolean} Dark theme enabled state (true = dark mode, false = light mode) */
    isDark: true as boolean,
  }),

  getters: {},

  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}
