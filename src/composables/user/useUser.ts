import { useQuery } from '@tanstack/vue-query';
import { getCurrentUser } from 'src/infrastructure/parse/user/user.service';

export function useUser() {
  const getCurrentUserQuery = useQuery({
    queryKey: ['current-user'],
    queryFn: () => getCurrentUser(),
    staleTime: 5 * 60 * 1000,
  });
  return {
    getCurrentUserQuery,
  };
}
