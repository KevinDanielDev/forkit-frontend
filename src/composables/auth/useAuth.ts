import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { useNotify } from 'src/composables/common/useNotify';

import { signIn, signUp, logout } from 'src/infrastructure/parse/auth/auth.service';

import type { IUser } from 'src/models/interfaces/user/user.interface';
import type { ISignUp } from 'src/models/interfaces/auth/sign-up.interface';

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
