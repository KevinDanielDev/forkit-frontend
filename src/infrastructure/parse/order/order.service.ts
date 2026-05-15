import Parse from 'parse';

import type { IOrder } from 'src/models/interfaces/order/order.interface';

async function createOrder(order: IOrder) {
  const user = Parse.User.current();
  if (!user) throw new Error('User not found');

  const newOrder = new Parse.Object('Order');
  newOrder.set('clientName', order.client.name);
  newOrder.set('clientEmail', order.client.email);
  newOrder.set('clientCountryCode', order.client.countryCode);
  newOrder.set('clientPhone', order.client.phone);
  newOrder.set('clientCompany', order.client.company);

  newOrder.set('projectName', order.project.title);
  newOrder.set('priority', order.project.priority);
  newOrder.set('description', order.project.description);
  newOrder.set('files', order.project.files);

  newOrder.set('startDate', order.finance.startDate);
  newOrder.set('deliveryDate', order.finance.deliveryDate);
  newOrder.set('totalAmount', String(order.finance.totalAmount));
  newOrder.set('depositAmount', String(order.finance.depositAmount));

  try {
    await newOrder.save();
    return newOrder;
  } catch (error) {
    throw error as Parse.Error;
  }
}

export { createOrder };
