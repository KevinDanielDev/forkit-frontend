/**
 * Represents client information in an order.
 * 
 * Contains contact details and business information for the client associated with an order.
 * Used in the multi-step order creation dialog (first step: Client Information).
 * Company name is optional for individual freelancers or clients without business registration.
 * 
 * @interface IClientData
 * @property {string} name - Client's first name
 * @property {string} email - Client's email address for communication
 * @property {string} countryCode - Country code for client's phone number
 * @property {string} phone - Client's contact phone number
 * @property {string} [company] - Optional: Client's company or business name
 */
export interface IClientData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company?: string;
}
