import Parse from 'parse';
import type { IUser } from 'src/models/interfaces/user/user.interface';

/**
 * Fetches the currently authenticated Parse User.
 *
 * This function retrieves the current user session and returns the Parse User
 * object. It is used to access user-specific data such as username, email,
 * and role permissions across the application.
 *
 * @returns {Promise<Parse.User | null>} A promise that resolves to the current Parse User object or null if not logged in
 * @throws {Error} If the Parse SDK is not initialized or if the user session is invalid
 *
 * @example
 * // Get the current user
 * const user = await getCurrentUser();
 *
 * // Access user data
 * if (user) {
 *   console.log('Username:', user.get('username'));
 *   console.log('Email:', user.get('email'));
 * }
 */
export function getCurrentUser() {
  try {
    const parseUser = Parse.User.current();
    if (!parseUser) {
      throw new Error('No user logged in');
    }
    const user: IUser = {
      id: parseUser.id,
      name: parseUser.get('firstName'),
      lastName: parseUser.get('lastName'),
      email: parseUser.get('email'),
      countryCode: parseUser.get('countryCode'),
      phone: parseUser.get('phone'),
    };
    return user;
  } catch (error) {
    throw error as Parse.Error;
  }
}
