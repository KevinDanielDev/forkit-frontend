export interface ICustomer {
  id?: string | undefined;
  firstName: string;
  lastName: string;
  email?: string | undefined;
  countryCode?: string | undefined;
  phone: string | undefined;
  company?: string | undefined;
  isActive: boolean;
  createdAt?: string | undefined;
}
