<script setup lang="ts">
/**
 * FinancePage — Financial reports and analysis page.
 *
 * Placeholder page for comprehensive financial management and reporting.
 * Currently displays a work-in-progress indicator.
 *
 * **Planned Features**
 * - Income and expense reports
 * - Revenue tracking by client and project
 * - Payment status tracking (paid, pending, overdue)
 * - Invoice generation and management
 * - Financial forecasting
 * - Tax report generation
 * - Payment reminders and follow-ups
 * - Financial analytics and charts
 *
 * **Status**: Work in Progress
 * Financial data is currently available in the Dashboard overview cards.
 * Full financial reporting features are being developed.
 *
 * @component
 * @example
 * // Route: /dashboard/finances
 * {
 *   path: 'finances',
 *   name: 'finances',
 *   component: () => import('pages/dashboard/FinancePage.vue')
 * }
 *
 * @see DashboardPage - Financial overview cards
 */
import WorkInProgress from 'src/components/tmp/WorkInProgress.vue';
</script>

<template>
  <WorkInProgress page-name="Finanzas" />
</template>
