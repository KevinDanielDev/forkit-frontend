import type { RouteLocationNormalized } from 'vue-router';

import { isValidSessionToken } from 'src/infrastructure/parse/auth/auth.service';

/**
 * Route guard that protects dashboard routes from unauthenticated access.
 *
 * Validates the current user's session token before allowing access to protected routes.
 * If the session is invalid or expired, redirects the user to the authentication page.
 *
 * This guard is applied to the `/dashboard` route and all its children, ensuring
 * that only authenticated users can access dashboard pages.
 *
 * @async
 * @param {RouteLocationNormalized} _to - Target route information (unused, required by Vue Router)
 * @returns {Promise<boolean|Object>}
 *   - `true` if session is valid (allows navigation)
 *   - `{ name: 'auth', replace: true }` if session is invalid (redirects to auth)
 * @throws {Parse.Error} If session validation fails due to network or database errors
 *
 * @example
 * // In routes configuration:
 * const routes = [
 *   {
 *     path: '/dashboard',
 *     component: DashboardLayout,
 *     beforeEnter: isAuthGuard, // Applied here
 *     children: [...]
 *   }
 * ]
 *
 * // User flow:
 * // 1. User tries to access /dashboard/orders
 * // 2. Guard checks isValidSessionToken()
 * // 3. If invalid → Redirects to /auth/sign-in
 * // 4. If valid → Allows navigation to /dashboard/orders
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isAuthGuard = async (_to: RouteLocationNormalized) => {
  const isValidSession = await isValidSessionToken();

  if (!isValidSession) {
    return { name: 'auth', replace: true };
  }

  return true;
};

export default isAuthGuard;
