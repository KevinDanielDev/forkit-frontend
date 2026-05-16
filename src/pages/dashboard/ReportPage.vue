<script setup lang="ts">
/**
 * ReportPage — Analytics and business reports page.
 * 
 * Placeholder page for comprehensive analytics and reporting features.
 * Currently displays a work-in-progress indicator.
 * 
 * **Planned Features**
 * - Business analytics dashboard
 * - Project performance metrics
 * - Client profitability analysis
 * - Time tracking and productivity reports
 * - Revenue by category reports
 * - Trend analysis and forecasting
 * - Customizable report generation
 * - Export reports (PDF, Excel, CSV)
 * - Performance KPI tracking
 * 
 * **Status**: Work in Progress
 * Basic KPI cards are available on the Dashboard page.
 * Detailed analytics and reporting features are being developed.
 * 
 * @component
 * @example
 * // Route: /dashboard/reports
 * {
 *   path: 'reports',
 *   name: 'reports',
 *   component: () => import('pages/dashboard/ReportPage.vue')
 * }
 * 
 * @see DashboardPage - Current KPI dashboard
 */
import WorkInProgress from 'src/components/tmp/WorkInProgress.vue';
</script>

<template>
  <WorkInProgress page-name="Reportes" />
</template>
