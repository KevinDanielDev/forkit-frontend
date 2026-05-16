<script setup lang="ts">
/**
 * DashboardLayout — Main application dashboard layout wrapper.
 * 
 * Provides the complete dashboard structure with:
 * - Top header with logo, theme toggle, and navigation
 * - Collapsible left sidebar with navigation menu
 * - Main content area for dashboard pages
 * - Responsive design (sidebar auto-hides on mobile)
 * 
 * **Layout Sections**
 * 1. **Header** - Contains logo, menu button, theme toggle
 * 2. **Sidebar/Drawer** - Navigation groups with menu items
 * 3. **Main content** - Renders child routes via RouterView
 * 
 * **Features**
 * - Dark/light theme toggle
 * - Sidebar toggle on desktop (always visible) and mobile (collapsed by default)
 * - Navigation menu organized by groups (Management, Analysis)
 * - Profile section at bottom with user avatar, name, role
 * - Logout functionality integrated in menu
 * - Responsive design with adaptive sidebar width
 * 
 * **Navigation Structure**
 * Menu groups are provided by useDashboardLayout composable:
 * - **Management**: Dashboard, Orders, Clients links
 * - **Analysis**: Reports, Finances links
 * - **Account**: Logout action
 * 
 * **Theme Integration**
 * - Theme toggle button in header changes dark/light mode
 * - Applied via useDashboardLayout.toggleTheme()
 * - Updates theme-store and Quasar dark mode
 * 
 * **User Profile Section**
 * - Displays user avatar (placeholder image)
 * - Shows user name and role
 * - Settings icon for future account settings
 * - App version and year displayed
 * 
 * **Responsive Behavior**
 * - **Desktop**: Sidebar always visible (280px width)
 * - **Tablet/Mobile**: Sidebar hidden by default, toggleable
 * - **Mobile**: Menu icon visible to toggle drawer
 * 
 * **Child Routes**
 * All dashboard pages render here via `<router-view />`:
 * - DashboardPage (main overview)
 * - OrderPage (orders management)
 * - ClientPage (clients management)
 * - ReportPage (analytics)
 * - FinancePage (financial reports)
 * 
 * @component
 * @example
 * // In routes configuration:
 * {
 *   path: '/dashboard',
 *   component: () => import('layouts/dashboard/DashboardLayout.vue'),
 *   beforeEnter: isAuthGuard,
 *   children: [
 *     { path: '', component: DashboardPage },
 *     { path: 'orders', component: OrderPage },
 *     ...
 *   ]
 * }
 */
import { useDashboardLayout } from 'src/composables/layouts/useDashboardLayout';
import { useAuth } from 'src/composables/auth/useAuth';

/** Logout mutation for handling user logout */
const { logoutMutation } = useAuth();
/** Layout state and navigation menu */
const { leftDrawerOpen, toggleTheme, toggleLeftDrawer, menuGroups } = useDashboardLayout();
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat class="fk-header fk-content-bg fk-text-contrast">
      <q-toolbar class="q-px-md">
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" class="fk-menu-btn" />
        <q-toolbar-title class="fk-text-weight-bold fk-logo-text">
          Forkit | <span class="text-primary">Software</span>
        </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            flat
            round
            dense
            :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            @click="toggleTheme()"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="280" class="fk-drawer">
      <div class="full-height flex column no-wrap">
        <q-list class="q-px-sm q-mt-md">
          <div v-for="group in menuGroups" :key="group.title" class="q-mb-md">
            <q-item-label
              header
              class="text-uppercase text-weight-bolder text-grey-6 letter-spacing-2 q-pb-sm"
              style="font-size: 0.65rem"
            >
              {{ group.title }}
            </q-item-label>

            <q-item
              v-for="item in group.items"
              :key="item.label"
              v-ripple
              clickable
              :to="item.route"
              @click="item.action === 'logout' ? logoutMutation.mutate() : null"
              exact
              active-class="fk-nav-active"
              class="fk-nav-item q-mb-xs"
            >
              <q-item-section avatar><q-icon :name="item.icon" size="22px" /></q-item-section>
              <q-item-section
                ><q-item-label class="text-weight-medium">{{
                  item.label
                }}</q-item-label></q-item-section
              >
            </q-item>
          </div>
        </q-list>

        <q-space />

        <div class="q-mx-sm q-mb-md">
          <q-item clickable v-ripple class="fk-profile-item">
            <q-item-section avatar>
              <q-avatar size="40px"><img src="https://cdn.quasar.dev/img/avatar.png" /></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="fk-text-weight-bold fk-text-contrast">John Doe</q-item-label>
              <q-item-label caption class="text-primary text-weight-bold">Freelancer</q-item-label>
            </q-item-section>
            <q-item-section side
              ><q-icon name="settings" size="20px" class="text-grey-6"
            /></q-item-section>
          </q-item>
          <div class="text-center q-mt-sm">
            <div class="text-caption text-grey-13" style="font-size: 10px">
              Forkit v1.0.0 • 2026
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="fk-content-bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.fk-header {
  border-bottom: 1px solid rgba(128, 128, 128, 0.1) !important;
  backdrop-filter: blur(8px);
  background: rgba(var(--q-bg-color), 0.8) !important;
}

.fk-menu-btn {
  opacity: 0.8;
}

.fk-drawer {
  background: var(--q-bg-color);
  .fk-nav-item {
    border-radius: 12px;
    opacity: 0.7;
    margin: 4px 8px;
    transition: all 0.3s ease;
    &:hover {
      opacity: 1;
      background: rgba(var(--q-primary), 0.05);
      color: var(--q-primary);
    }
  }
  .fk-nav-active {
    opacity: 1 !important;
    background: rgba(var(--q-primary), 0.1) !important;
    color: var(--q-primary) !important;
    font-weight: 600;
  }
}

.fk-profile-item {
  border-radius: 16px;
  background: rgba(128, 128, 128, 0.05);
  border: 1px solid rgba(128, 128, 128, 0.1);
  padding: 8px 12px;
  &:hover {
    background: rgba(var(--q-primary), 0.05);
    border-color: rgba(var(--q-primary), 0.2);
  }
}

.fk-logo-text {
  font-size: 1.25rem;
  letter-spacing: -0.5px;
}
.letter-spacing-2 {
  letter-spacing: 1.2px;
}

.body--dark .fk-header,
.body--dark .fk-drawer {
  background: #121416 !important;
}
</style>
