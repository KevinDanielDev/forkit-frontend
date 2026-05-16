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
  newOrder.set('status', order.project.status);
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

async function getOrders() {
  const query = new Parse.Query('Order');
  const orders = await query.find();

  const ordersDisplay: IOrder[] = orders.map((order: Parse.Object) => {
    return {
      objectId: order.id!,
      client: {
        name: order.get('clientName'),
        email: order.get('clientEmail'),
        countryCode: order.get('clientCountryCode'),
        phone: order.get('clientPhone'),
        company: order.get('clientCompany'),
      },
      project: {
        title: order.get('projectName'),
        priority: order.get('priority'),
        status: order.get('status'),
        description: order.get('description'),
        files: order.get('files'),
      },
      finance: {
        startDate: order.get('startDate'),
        deliveryDate: order.get('deliveryDate'),
        totalAmount: Number(order.get('totalAmount')),
        depositAmount: Number(order.get('depositAmount')),
      },
    };
  });

  return ordersDisplay;
}

async function deleteOrder(objectId: string) {
  const order = new Parse.Object('Order');
  order.id = objectId;

  try {
    await order.destroy();
    return true;
  } catch (error) {
    throw error as Parse.Error;
  }
}

export { createOrder, getOrders, deleteOrder };
