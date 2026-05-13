import type { RouteLocationNormalized } from 'vue-router';

import { isValidSessionToken } from 'src/infrastructure/parse/auth/auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isAuthGuard = async (_to: RouteLocationNormalized) => {
  const isValidSession = await isValidSessionToken();

  if (!isValidSession) {
    return { name: 'auth', replace: true };
  }

  return true;
};

export default isAuthGuard;
