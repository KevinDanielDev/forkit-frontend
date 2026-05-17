<script setup lang="ts">
/**
 * OrderPage — Orders management page.
 *
 * Placeholder page for comprehensive order management features.
 * Currently displays a work-in-progress indicator.
 *
 * **Planned Features**
 * - Complete orders list with advanced filtering
 * - Order status tracking (Pending, In Progress, Completed)
 * - Order editing and updates
 * - Order status transitions
 * - Advanced search and filtering
 * - Order export functionality
 *
 * **Status**: Work in Progress
 * This page is part of the dashboard navigation but full functionality
 * is being implemented. Basic order creation is available via DashboardPage.
 *
 * @component
 * @example
 * // Route: /dashboard/orders
 * {
 *   path: 'orders',
 *   name: 'orders',
 *   component: () => import('pages/dashboard/OrderPage.vue')
 * }
 *
 * @see DashboardPage - Current orders overview
 * @see OrderCreateDialog - Create new orders
 */
import WorkInProgress from 'src/components/tmp/WorkInProgress.vue';
</script>

<template>
  <WorkInProgress page-name="Órdenes" />
</template>
