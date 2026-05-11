<script setup lang="ts">
import { useDashboardLayout } from 'src/composables/layouts/useDashboardLayout';

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
