/**
 * Represents an authenticated user profile in the system.
 * 
 * Contains the core user information returned after successful authentication or user registration.
 * This interface represents the user data stored in Parse and used throughout the application.
 * All properties are always present for authenticated users.
 * 
 * @interface IUser
 * @property {string} name - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address (unique identifier)
 * @property {string} phone - User's contact phone number
 * @property {string} countryCode - Country code associated with the phone number
 */
export interface IUser {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
}
