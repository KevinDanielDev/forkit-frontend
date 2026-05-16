<script setup lang="ts">
/**
 * AuthLayout — Authentication wrapper layout component.
 * 
 * Provides a professional two-column layout for authentication pages (sign-in, sign-up).
 * On desktop, displays application features on the left with authentication form on the right.
 * On mobile, shows only the authentication form full-width.
 * 
 * **Features**
 * - Responsive design (desktop shows 2 columns, mobile shows 1 column)
 * - Left sidebar with feature cards describing the app (desktop only)
 * - Branded header with gradient title and subtitle
 * - Three feature cards: Digital Services, Financial Control, Client Management
 * - Background image with overlay gradient
 * - Dark theme support from theme store
 * 
 * **Responsive Behavior**
 * - **Desktop (> small breakpoint)**: Left column (7/12) with features, Right column (5/12) with form
 * - **Mobile**: Single column full-width (12/12) with form only
 * 
 * **Slots & Children**
 * - Uses `<RouterView />` to render child routes (SignInPage, SignUpPage)
 * - No named slots
 * 
 * **Dark Theme**
 * - Automatically applies theme from useThemeStore
 * - Reads isDark state and applies to Quasar's dark mode
 * 
 * **Styling**
 * - Brand gradient: Blue (#2196f3) to white
 * - Feature cards with glassmorphism effect (blur, transparency)
 * - Hover effects with smooth transitions
 * - Responsive padding (xl on desktop, md on mobile)
 * 
 * @component
 * @example
 * // In routes configuration:
 * {
 *   path: '/auth',
 *   name: 'auth',
 *   component: () => import('layouts/auth/AuthLayout.vue'),
 *   children: [
 *     { path: 'sign-in', component: SignInPage },
 *     { path: 'sign-up', component: SignUpPage }
 *   ]
 * }
 * 
 * // Routes automatically render within <RouterView /> here
 */
import { useQuasar } from 'quasar';

import { useThemeStore } from 'src/stores/theme-store';

/** Quasar instance for screen size detection and dark mode control */
const $q = useQuasar();
/** Theme store for dark/light mode state */
const themeStore = useThemeStore();

// Apply theme from store to Quasar dark mode
$q.dark.set(themeStore.isDark);
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="row full-height">
        <div
          v-if="$q.screen.gt.sm"
          class="col-md-7 rounded-left-section text-white column justify-center items-center"
        >
          <div class="overlay"></div>
          <div class="q-z-max q-px-xl" style="max-width: 550px; margin: 0 auto; width: 100%">
            <div class="text-center q-mb-xl">
              <h1 class="brand-title q-mb-md q-ma-none">Forkit</h1>
              <p class="brand-subtitle text-h5 q-ma-none">
                Tu herramienta de gestión de servicios, <br />
                para freelancers y empresas.
              </p>
            </div>

            <div class="column q-gutter-md">
              <div class="feature-card row items-start q-pa-lg">
                <div class="feature-icon-wrapper">
                  <q-icon name="description" size="32px" />
                </div>
                <div class="col q-ml-md">
                  <div class="text-weight-bold q-mb-xs text-subtitle1 text-white">
                    Servicios Digitales
                  </div>
                  <div class="text-body2 feature-description">
                    Gestiona tus servicios, clientes y finanzas en un solo lugar
                  </div>
                </div>
              </div>

              <div class="feature-card row items-start q-pa-lg">
                <div class="feature-icon-wrapper">
                  <q-icon name="currency_bitcoin" size="32px" />
                </div>
                <div class="col q-ml-md">
                  <div class="text-weight-bold q-mb-xs text-subtitle1 text-white">
                    Control financiero
                  </div>
                  <div class="text-body2 feature-description">
                    Realiza el seguimiento de tus ingresos y gastos
                  </div>
                </div>
              </div>

              <div class="feature-card row items-start q-pa-lg">
                <div class="feature-icon-wrapper">
                  <q-icon name="group" size="32px" />
                </div>
                <div class="col q-ml-md">
                  <div class="text-weight-bold q-mb-xs text-subtitle1 text-white">
                    Gestión de Clientes
                  </div>
                  <div class="text-body2 feature-description">
                    Organiza y realiza seguimiento de tus clientes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-12 col-md-5 column justify-center items-center"
          :class="$q.screen.gt.sm ? 'q-pa-xl' : 'q-pa-md'"
        >
          <RouterView />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.rounded-left-section {
  background-image: url('auth/auth-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(21, 142, 217, 0.43), transparent 70%),
    linear-gradient(to top, rgb(24, 6, 6), transparent 90%);
  z-index: 1;
}

.q-z-max {
  z-index: 2;
  position: relative;
}

.logo-background {
  width: 100px;
  height: 100px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.logo-background:hover {
  transform: translateY(-4px);
}

.brand-title {
  font-size: 4.5rem;
  font-weight: 800;
  letter-spacing: -3px;
  background: linear-gradient(135deg, #2196f3 0%, #2196f3 10%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(33, 150, 243, 0.3);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
  font-family:
    'Inter',
    'Roboto',
    -apple-system,
    sans-serif;
}

.brand-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(33, 150, 243, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2196f3;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon-wrapper {
  background: rgba(33, 150, 243, 0.3);
  transform: scale(1.1);
}

.feature-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}
</style>
