import Parse from 'parse';
import type { ICustomerData } from 'src/models/interfaces/order';

async function createCustomer(customer: ICustomerData) {
  const user = Parse.User.current();
  if (!user) throw new Error('User not found');

  const newCustomer = new Parse.Object('Customer');
  try {
    newCustomer.set('firstName', customer.firstName);
    newCustomer.set('lastName', customer.lastName);
    newCustomer.set('email', customer.email);
    newCustomer.set('countryCode', customer.countryCode);
    newCustomer.set('phone', customer.phone);
    newCustomer.set('company', customer.company);
    newCustomer.set('isActive', customer.isActive);

    const acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(Parse.User.current()!, true);
    acl.setWriteAccess(Parse.User.current()!, true);
    newCustomer.setACL(acl);

    const savedCustomer = await newCustomer.save();
    return savedCustomer;
  } catch (error) {
    throw error as Parse.Error;
  }
}

async function getCustomers() {
  const query = new Parse.Query('Customer');
  const customers = await query.find();

  const customersDisplay: ICustomerData[] = customers.map((customer: Parse.Object) => {
    return {
      objectId: customer.id!,
      firstName: customer.get('firstName'),
      lastName: customer.get('lastName'),
      email: customer.get('email'),
      countryCode: customer.get('countryCode'),
      phone: customer.get('phone'),
      company: customer.get('company'),
      isActive: customer.get('isActive'),
    };
  });

  return customersDisplay;
}

async function deleteCustomer(objectId: string) {
  const user = Parse.User.current();
  if (!user) throw new Error('User not found');

  if (!objectId) throw new Error('Invalid Customer ID');

  const customer = new Parse.Object('Customer');
  customer.id = objectId;

  try {
    await customer.destroy();
    return true;
  } catch (error) {
    throw error as Parse.Error;
  }
}
export { createCustomer, getCustomers, deleteCustomer };
