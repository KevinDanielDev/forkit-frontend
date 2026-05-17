import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { useNotify } from 'src/composables/common/useNotify';

import { signIn, signUp, logout } from 'src/infrastructure/parse/auth/auth.service';

import type { IUser } from 'src/models/interfaces/user/user.interface';
import type { ISignUp } from 'src/models/interfaces/auth/sign-up.interface';

/**
 * Composable for managing user authentication operations with Vue Query.
 *
 * Handles sign-in, sign-up, and logout mutations with integrated error handling,
 * notifications, and automatic navigation. Manages authentication state through
 * TanStack Vue Query for reactive state management and caching.
 *
 * @returns {Object} Authentication mutations and state
 * @returns {UseMutationReturnType} .signInMutation - Sign-in mutation (requires {email: string, password: string})
 * @returns {UseMutationReturnType} .signUpMutation - Sign-up mutation (requires ISignUp object)
 * @returns {UseMutationReturnType} .logoutMutation - Logout mutation (no parameters required)
 *
 * @example
 * const { signInMutation, signUpMutation, logoutMutation } = useAuth();
 *
 * // Sign in
 * await signInMutation.mutate({
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 *
 * // Sign up
 * await signUpMutation.mutate({
 *   name: 'John',
 *   lastName: 'Doe',
 *   email: 'john@example.com',
 *   countryCode: '+1',
 *   phone: '5551234567',
 *   password: 'SecurePass123!'
 * });
 */
export function useAuth() {
  const $router = useRouter();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotify();

  const signInMutation = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await signIn(email, password);
    },
    onSuccess: async (res: IUser) => {
      await queryClient.invalidateQueries({ queryKey: ['current-user'] });
      await queryClient.setQueryData(['current-user'], res);
      notifySuccess('Éxito', 'Sesión iniciada exitosamente');
      void $router.replace({ name: 'dashboard' });
    },
    onError: (error: unknown) => {
      notifyError('Error', (error as Error).message);
    },
  });

  const signUpMutation = useMutation({
    mutationKey: ['sign-up'],
    mutationFn: async (user: ISignUp) => {
      return await signUp(user);
    },
    onSuccess: async (res: IUser) => {
      await queryClient.invalidateQueries({ queryKey: ['current-user'] });
      await queryClient.setQueryData(['current-user'], res);
      notifySuccess('Éxito', 'Usuario registrado exitosamente');
      void $router.replace({ name: 'dashboard' });
    },
    onError: (error: unknown) => {
      notifyError('Error', (error as Error).message);
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      queryClient.clear();
      notifySuccess('Éxito', 'Sesión cerrada exitosamente');
      void $router.replace({ name: 'sign-in' });
    },
    onError: (error: unknown) => {
      notifyError('Error', (error as Error).message);
    },
  });

  return {
    signInMutation,
    signUpMutation,
    logoutMutation,
  };
}
