<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ErrorNotFound — 404 Not Found error page.
 * 
 * Renders a full-screen error page for undefined routes.
 * Displays large "404" text with message and home button.
 * 
 * **Features**
 * - Large 404 error indicator (30vh font size)
 * - "Oops. Nothing here..." message
 * - "Go Home" button linking to root (/)
 * - Full-screen centered layout
 * - Blue background with white text
 * - Responsive padding
 * 
 * **Styling**
 * - Fullscreen coverage
 * - Centered text and button
 * - Primary blue color scheme
 * - High contrast white text
 * - Simple, clear message
 * 
 * **Navigation**
 * - Home button redirects to "/" which goes to /auth
 * - User can navigate to login/signup from there
 * 
 * **Usage**
 * - Automatically rendered for undefined routes
 * - Catch-all route: `/:catchAll(.*)*`
 * - Part of route definitions
 * 
 * @component
 * @example
 * // In routes configuration:
 * {
 *   path: '/:catchAll(.*)*',
 *   component: () => import('pages/ErrorNotFound.vue')
 * }
 * 
 * // When accessed:
 * http://localhost:5173/invalid-url → Shows 404 page
 * http://localhost:5173/this-does-not-exist → Shows 404 page
 */
</script>
