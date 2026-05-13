import { signIn, signUp, logout } from 'src/infrastructure/parse/auth/auth.service';

export function useAuth() {
  // VueQuery
  return {
    signIn,
    signUp,
    logout,
  };
}
