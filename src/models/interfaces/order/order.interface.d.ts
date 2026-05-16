import type { IClientData } from './client-data.interface';
import type { IFinanceData } from './finance-data.interface';
import type { IProjectData } from './project-data.interface';

/**
 * Complete order object structure representing a freelance project assignment.
 * 
 * Combines client information, project details, and financial terms into
 * a single entity. Used throughout the application for order creation,
 * display, and management.
 * 
 * **Structure**
 * The interface organizes order data into three main categories:
 * - **Client**: Contact and company information of the client hiring
 * - **Project**: Task, scope, and project management details
 * - **Finance**: Payment terms, amounts, and timeline
 * 
 * **Lifecycle**
 * - Created: Order is created in the order creation dialog with user input
 * - Saved: Sent to Parse backend, objectId is generated
 * - Retrieved: Fetched from database with hierarchical structure
 * - Updated: Can modify individual sections (client, project, finance)
 * - Deleted: Removed from database by objectId
 * 
 * **Properties**
 * @interface IOrder
 * @property {string} [objectId] - Parse Object ID (generated after save, undefined before)
 *   - Present when order is retrieved from database
 *   - Used for updates and deletion
 *   - Optional during creation
 * @property {IClientData} client - Client and contact information
 *   - name: Client company or person name
 *   - email: Contact email
 *   - phone: Contact phone number
 *   - countryCode: Phone country code (e.g., '+1', '+34')
 *   - company: Optional company name (if different from name)
 * @property {IProjectData} project - Project scope and details
 *   - title: Project name or title
 *   - priority: Priority level (e.g., 'High', 'Medium', 'Low')
 *   - status: Current status ('Pending', 'In Progress', 'Completed')
 *   - description: Detailed project description
 *   - files: Optional file attachments (File[])
 * @property {IFinanceData} finance - Payment and timeline information
 *   - startDate: Project start date (ISO format: YYYY-MM-DD)
 *   - deliveryDate: Expected delivery date (ISO format: YYYY-MM-DD)
 *   - totalAmount: Total project cost in numbers (e.g., 5000)
 *   - depositAmount: Deposit/down payment amount (e.g., 2500)
 * 
 * @example
 * // Creating a new order (before saving)
 * const newOrder: IOrder = {
 *   client: {
 *     name: 'Acme Corp',
 *     email: 'contact@acme.com',
 *     phone: '5551234567',
 *     countryCode: '+1',
 *     company: 'Acme Inc.'
 *   },
 *   project: {
 *     title: 'Website Redesign',
 *     priority: 'High',
 *     status: 'Pending',
 *     description: 'Complete website redesign with modern UI/UX',
 *     files: []
 *   },
 *   finance: {
 *     startDate: '2026-05-15',
 *     deliveryDate: '2026-06-30',
 *     totalAmount: 5000,
 *     depositAmount: 2500
 *   }
 * };
 * 
 * // After saving to database
 * const savedOrder = await createOrder(newOrder);
 * console.log(savedOrder.objectId); // 'abc123def456'
 * 
 * @example
 * // Retrieving orders from database
 * const orders = await getOrders();
 * orders.forEach(order => {
 *   console.log(`${order.project.title} - $${order.finance.totalAmount}`);
 *   // All orders have objectId from database
 *   console.log(`ID: ${order.objectId}`);
 * });
 * 
 * @see IClientData - Client contact information
 * @see IProjectData - Project details and scope
 * @see IFinanceData - Financial terms and amounts
 * @see createOrder - Function to create and save orders
 * @see getOrders - Function to retrieve all orders
 * @see deleteOrder - Function to delete orders
 */
interface IOrder {
  /** Parse Object ID - unique identifier in database (undefined until saved) */
  objectId?: string;
  /** Client and contact information */
  client: IClientData;
  /** Project scope, title, and management details */
  project: IProjectData;
  /** Financial terms, amounts, and timeline */
  finance: IFinanceData;
}

export type { IOrder };
