import Parse from 'parse';

import type { IOrder } from 'src/models/interfaces/order/order.interface';

/**
 * Creates a new order in the Parse database and associates it with the current user.
 *
 * Transforms the structured IOrder object (with nested client, project, and finance data)
 * into individual Parse Object properties. Financial amounts are converted to strings
 * for consistent storage in the Parse database.
 *
 * @async
 * @param {IOrder} order - Complete order object containing:
 *   - client: Client information (name, email, phone, countryCode, company)
 *   - project: Project details (title, priority, status, description, files)
 *   - finance: Financial terms (startDate, deliveryDate, totalAmount, depositAmount)
 * @returns {Promise<Parse.Object>} The saved Parse.Object with objectId and all properties
 * @throws {Error} If user is not authenticated
 * @throws {Parse.Error} If save operation fails (network error, permissions, database constraints)
 *
 * @example
 * const newOrder = await createOrder({
 *   client: {
 *     name: 'Acme Corp',
 *     email: 'contact@acme.com',
 *     countryCode: '+1',
 *     phone: '5551234567',
 *     company: 'Acme Inc.'
 *   },
 *   project: {
 *     title: 'Web Development',
 *     priority: 'High',
 *     status: 'Pending',
 *     description: 'Build responsive website',
 *     files: []
 *   },
 *   finance: {
 *     startDate: '2026-05-15',
 *     deliveryDate: '2026-06-15',
 *     totalAmount: 5000,
 *     depositAmount: 2500
 *   }
 * });
 * console.log(newOrder.id); // Parse objectId
 */
async function createOrder(order: IOrder) {
  const user = Parse.User.current();
  if (!user) throw new Error('User not found');

  const newOrder = new Parse.Object('Order');

  // Datos del Cliente
  newOrder.set('clientName', order.client.name);
  newOrder.set('clientEmail', order.client.email);
  newOrder.set('clientCountryCode', order.client.countryCode);
  newOrder.set('clientPhone', order.client.phone);
  newOrder.set('clientCompany', order.client.company);

  // Datos del Proyecto
  newOrder.set('projectName', order.project.title);
  newOrder.set('priority', order.project.priority);
  newOrder.set('status', order.project.status);
  newOrder.set('description', order.project.description);

  const filesToUpload = order.project.files;
  const parseFilesArray = [];

  if (Array.isArray(filesToUpload) && filesToUpload.length > 0) {
    for (const file of filesToUpload) {
      const parseFile = new Parse.File(file.name, file);
      const savedFile = await parseFile.save();

      if (!savedFile) continue;

      parseFilesArray.push({
        __type: 'File',
        name: savedFile.name(),
        url: savedFile.url(),
      });
    }
  }

  newOrder.set('files', parseFilesArray);
  newOrder.set('startDate', order.finance.startDate);
  newOrder.set('deliveryDate', order.finance.deliveryDate);

  newOrder.set('totalAmount', String(order.finance.totalAmount));
  newOrder.set('depositAmount', String(order.finance.depositAmount));

  try {
    const response = await newOrder.save();
    return response;
  } catch (error) {
    console.error('Error al guardar la orden:', error);
    throw error as Parse.Error;
  }
}

/**
 * Retrieves all orders from the Parse database for the current user.
 *
 * Queries the Order table and transforms the flat Parse Object structure
 * into nested IOrder interfaces with hierarchical data organization.
 * Converts numeric strings (totalAmount, depositAmount) back to numbers.
 *
 * @async
 * @returns {Promise<IOrder[]>} Array of all orders with normalized data structure.
 *   Each order contains client, project, and finance information organized hierarchically.
 * @throws {Parse.Error} If query fails (network error, permissions, database constraint)
 *
 * @example
 * const orders = await getOrders();
 * orders.forEach(order => {
 *   console.log(`Order: ${order.project.title}`);
 *   console.log(`Client: ${order.client.name}`);
 *   console.log(`Total: $${order.finance.totalAmount}`);
 * });
 */
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

/**
 * Deletes an order from the Parse database by its object ID.
 *
 * Permanently removes the order record. This operation cannot be undone.
 * Only the order owner should have permissions to delete their orders.
 *
 * @async
 * @param {string} objectId - Parse Object ID of the order to delete (obtained from IOrder.objectId)
 * @returns {Promise<boolean>} True on successful deletion
 * @throws {Parse.Error} If objectId is invalid, order doesn't exist, or deletion fails (permissions, network)
 *
 * @example
 * try {
 *   const success = await deleteOrder('abc123def456');
 *   if (success) {
 *     console.log('Order deleted successfully');
 *   }
 * } catch (error) {
 *   console.error('Failed to delete order:', error.message);
 * }
 */
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
