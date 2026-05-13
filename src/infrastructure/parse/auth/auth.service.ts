import Parse from 'parse';

import type { IUser } from 'src/models/interfaces/user/user.interface';
import type { ISignUp } from 'src/models/interfaces/auth/sign-up.interface';

/**
 * Authenticates a user with Parse SDK using email and password credentials.
 * 
 * Establishes a session with the Parse server and retrieves the authenticated user's profile data.
 * The session is stored locally and can be validated with {@link isValidSessionToken}.
 * 
 * @param {string} email - User's email address (must be registered in Parse)
 * @param {string} password - User's plaintext password
 * @returns {Promise<IUser>} User profile object containing name, lastName, email, phone, and countryCode
 * @throws {Parse.Error} If credentials are invalid, user doesn't exist, or network connection fails
 * 
 * @example
 * try {
 *   const user = await signIn('user@example.com', 'password123');
 *   console.log(user.name); // User's first name
 * } catch (error) {
 *   console.error('Login failed:', error.message);
 * }
 */
async function signIn(email: string, password: string) {
  try {
    const parseUser = await Parse.User.logIn(email, password);
    const userResponse: IUser = {
      name: parseUser.get('firstName'),
      lastName: parseUser.get('lastName'),
      email: parseUser.get('email'),
      phone: parseUser.get('phone'),
      countryCode: parseUser.get('countryCode'),
    };

    return userResponse;
  } catch (error) {
    throw error as Parse.Error;
  }
}

/**
 * Registers a new user in the Parse system with the provided sign-up data.
 * 
 * Creates a new Parse.User account, configures Access Control List (ACL) for security,
 * assigns the user to the Admin role, and returns the user profile data.
 * 
 * The function ensures:
 * - User privacy through ACL (only the user can read/write their data)
 * - Admin role assignment for newly registered users
 * - Email uniqueness (Parse enforces this at the database level)
 * 
 * @param {ISignUp} user - Sign-up data object containing user registration information
 * @param {string} user.name - User's first name
 * @param {string} user.lastName - User's last name
 * @param {string} user.email - User's email address (must be unique)
 * @param {string} user.countryCode - Country code for phone number (e.g., '+1', '+34')
 * @param {string} user.phone - User's phone number
 * @param {string} user.password - User's password (must meet Parse security requirements)
 * @returns {Promise<IUser>} Created user profile object
 * @throws {Parse.Error} If email already exists, Parse role not found, or network fails
 * @throws {Error} If 'Admin' role is not configured in the Parse system
 * 
 * @example
 * const newUser = await signUp({
 *   name: 'John',
 *   lastName: 'Doe',
 *   email: 'john@example.com',
 *   countryCode: '+1',
 *   phone: '5551234567',
 *   password: 'SecurePass123!'
 * });
 */
async function signUp(user: ISignUp) {
  try {
    const newUser = new Parse.User();
    newUser.set('firstName', user.name);
    newUser.set('lastName', user.lastName);
    newUser.set('username', user.email);
    newUser.set('email', user.email);
    newUser.set('countryCode', user.countryCode);
    newUser.set('phone', user.phone);
    newUser.set('password', user.password);

    await newUser.signUp();

    const acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(Parse.User.current()!, true);
    acl.setWriteAccess(Parse.User.current()!, true);
    newUser.setACL(acl);

    const roleQuery = new Parse.Query(Parse.Role);
    const role = await roleQuery.equalTo('name', 'Admin').first();
    if (!role) throw new Error('Role not found');

    role.getUsers().add(newUser);
    await role.save();

    await newUser.save();

    const userResponse: IUser = {
      name: newUser.get('firstName'),
      lastName: newUser.get('lastName'),
      email: newUser.get('email'),
      phone: newUser.get('phone'),
      countryCode: newUser.get('countryCode'),
    };

    return userResponse;
  } catch (error) {
    throw error as Parse.Error;
  }
}

/**
 * Terminates the current user session and clears authentication data.
 * 
 * Logs out the currently authenticated user from Parse, clearing the session token
 * and local authentication state. After calling this, {@link isValidSessionToken} will return false.
 * 
 * @returns {Promise<void>} Resolves when logout is complete
 * @throws {Parse.Error} If the logout request fails (rare, usually network issues)
 * 
 * @example
 * await logout();
 * // User is now logged out, session is cleared
 * const isValid = await isValidSessionToken(); // Returns false
 */
async function logout() {
  try {
    await Parse.User.logOut();
  } catch (error) {
    throw error as Parse.Error;
  }
}

/**
 * Validates whether the current session token is still valid and the user is authenticated.
 * 
 * Checks if a user is currently logged in and verifies the session token by fetching
 * the current user from the Parse server. If the token is invalid or expired, the user
 * is automatically logged out.
 * 
 * This function is useful for:
 * - Auth guards in routing
 * - Checking session validity on app initialization
 * - Detecting expired sessions
 * 
 * @returns {Promise<boolean>} True if user is authenticated with a valid session, false otherwise
 * @throws {Parse.Error} Network errors during fetch operation (caught internally, returns false)
 * 
 * @example
 * const isAuthenticated = await isValidSessionToken();
 * if (!isAuthenticated) {
 *   // Redirect to login page
 *   router.push('/auth/login');
 * }
 */
async function isValidSessionToken() {
  const currentUser = Parse.User.current();

  if (!currentUser) return false;

  try {
    await currentUser.fetch();
    return true;
  } catch {
    await Parse.User.logOut();
    return false;
  }
}

export { signIn, signUp, logout, isValidSessionToken };
