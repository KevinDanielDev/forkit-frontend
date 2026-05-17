/**
 * Represents the data structure for user sign-up registration.
 *
 * Contains all required information for registering a new user account in the system.
 * All fields are required during registration. Email must be unique across the system.
 * Password must meet security requirements (minimum 8 characters, uppercase, digits).
 *
 * @interface ISignUp
 * @property {string} name - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address (must be unique and valid format)
 * @property {string} countryCode - Country code for phone number (e.g., '+1', '+34', '+55')
 * @property {string} phone - User's phone number (typically 10 digits for most countries)
 * @property {string} password - User's password (min 8 chars, must include uppercase and digit)
 */
export interface ISignUp {
  name: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
}
