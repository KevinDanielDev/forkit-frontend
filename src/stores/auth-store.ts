import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface IAuthUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  id?: string;
  token?: string;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<IAuthUser | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  // Actions
  const signUp = (formData: IAuthUser): boolean => {
    isLoading.value = true;
    error.value = null;

    try {
      // Phase 4: Replace with actual API call
      // const response = await api.post('/auth/sign-up', formData);
      // user.value = response.data.user;

      // Mock: Simulate successful signup
      user.value = {
        ...formData,
        id: `user-${Date.now()}`,
        token: `token-${Date.now()}`,
      };

      // Store token in localStorage
      if (user.value.token) {
        localStorage.setItem('auth_token', user.value.token);
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
      error.value = errorMessage;
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const signIn = (email: string, password: string): boolean => {
    isLoading.value = true;
    error.value = null;

    try {
      // Phase 4: Replace with actual API call
      // const response = await api.post('/auth/sign-in', { email, password });
      // user.value = response.data.user;

      console.log('Sign in request:', { email, password });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      error.value = errorMessage;
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    error.value = null;
    localStorage.removeItem('auth_token');
  };

  const clearError = () => {
    error.value = null;
  };

  // Check if user is authenticated on app load
  const checkAuthStatus = () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Phase 4: Validate token with backend
      // For now, assume token is valid
      console.log('Auth token found, user is authenticated');
    }
  };

  return {
    // State
    user,
    isLoading,
    error,
    isAuthenticated,

    // Actions
    signUp,
    signIn,
    logout,
    clearError,
    checkAuthStatus,
  };
});
