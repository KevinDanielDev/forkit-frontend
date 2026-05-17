/**
 * Represents financial terms and timeline for an order.
 *
 * Contains pricing, deposit information, and project timeline for an order.
 * Used in the multi-step order creation dialog (third step: Finance Information).
 * The difference between totalAmount and depositAmount represents the pending payment balance.
 *
 * @interface IFinanceData
 * @property {string} startDate - Project start date (ISO 8601 format or input format)
 * @property {string} deliveryDate - Project delivery/completion date (ISO 8601 format or input format)
 * @property {number} totalAmount - Total project price or invoice amount
 * @property {number} depositAmount - Initial deposit or advance payment amount
 *
 * @example
 * const finance: IFinanceData = {
 *   startDate: '2026-05-15',
 *   deliveryDate: '2026-06-15',
 *   totalAmount: 5000,
 *   depositAmount: 2000  // Remaining balance: $3000
 * };
 */
export interface IFinanceData {
  startDate: string;
  deliveryDate: string;
  totalAmount: number;
  depositAmount: number;
}
