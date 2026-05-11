import { defineStore, acceptHMRUpdate } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: true as boolean,
  }),

  getters: {},

  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}
