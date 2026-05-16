<script setup lang="ts">
/**
 * SignInPage — User authentication (login) page.
 * 
 * Renders the sign-in form allowing existing users to authenticate with their credentials.
 * Includes email and password inputs with validation, animated Lottie background,
 * and navigation to sign-up for new users.
 * 
 * **Features**
 * - Email input with required and format validation
 * - Password input with visibility toggle
 * - Animated Lottie background
 * - Loading spinner during authentication
 * - Link to sign-up page for new users
 * - Responsive design (mobile & desktop)
 * - Forgot password link (UI only, not yet implemented)
 * 
 * **State Management**
 * - email: User's email address (ref)
 * - password: User's password (ref)
 * - isPasswordVisible: Password visibility toggle (ref)
 * - isPending: Loading state from authentication mutation
 * 
 * **Authentication Flow**
 * 1. User enters email and password
 * 2. Click "Sign In" or press Enter
 * 3. Mutation sends credentials to Parse backend
 * 4. On success: Redirects to dashboard, shows success notification
 * 5. On error: Shows error notification, form stays visible
 * 
 * **Validation Rules**
 * - Email: Required + valid email format
 * - Password: Required + meets security requirements
 * 
 * **Styling**
 * - Responsive padding (xl on desktop, md on mobile)
 * - Glassmorphism card design
 * - Primary color buttons and links
 * - Dark mode support (custom shadow for dark theme)
 * 
 * @component
 * @example
 * // In router:
 * { path: 'sign-in', name: 'sign-in', component: () => import('pages/auth/SignInPage.vue') }
 * 
 * // Access at /auth/sign-in
 */
import { ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';

import { useAuth } from 'src/composables/auth/useAuth';

import animationData from 'src/animations/auth/auth.json';
import { useValidationRules } from 'src/composables/common/useValidationRules';

// Composables
const { signInMutation } = useAuth();
const { isPending } = signInMutation;
const { ...rules } = useValidationRules();

// Form state
/** @type {Ref<string>} User's email address */
const email = ref<string>('');
/** @type {Ref<string>} User's password */
const password = ref<string>('');
/** @type {Ref<boolean>} Controls password field visibility */
const isPasswordVisible = ref<boolean>(false);

/**
 * Handles the sign-in form submission.
 * Triggers the authentication mutation with email and password.
 */
function handleSignIn() {
  signInMutation.mutate({ email: email.value, password: password.value });
}
</script>

<template>
  <div class="text-center">
    <div class="text-bold" :class="$q.screen.lt.sm ? 'text-h4' : 'text-h2'">Iniciar Sesión</div>
    <div class="text-grey-7 text-subtitle1 q-mt-sm">
      Accede a tu cuenta para gestionar tus servicios
    </div>
  </div>
  <q-card flat bordered class="q-mt-md full-width fk-auth-card">
    <q-card-section :class="$q.screen.lt.sm ? 'q-pa-md' : 'q-pa-xl'">
      <div class="row justify-center q-mb-md">
        <Vue3Lottie
          :animationData="animationData"
          :height="$q.screen.lt.sm ? 200 : 300"
          :width="$q.screen.lt.sm ? 200 : 300"
          :loop="true"
          :autoPlay="true"
        />
      </div>

      <q-form @submit.prevent="handleSignIn()" class="q-gutter-md">
        <div>
          <label>Correo Electrónico</label>
          <q-input
            class="q-mt-sm"
            v-model="email"
            type="email"
            placeholder="jhon.doe@gmail.com"
            dense
            outlined
            lazy-rules
            :rules="rules.requiredEmail"
          >
            <template #prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>

        <div>
          <label>Contraseña</label>
          <q-input
            class="q-mt-sm"
            v-model="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="●●●●●●●●"
            dense
            outlined
            lazy-rules
            :rules="rules.requiredPassword"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-btn
                dense
                flat
                round
                :icon="isPasswordVisible ? 'visibility_off' : 'visibility'"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </q-input>
        </div>

        <div>
          <RouterLink
            :to="{ name: 'sign-up' }"
            class="text-weight-bold row justify-end cursor-pointer q-mb-xs"
            style="color: var(--q-primary)"
            >¿Olvidaste tu contraseña?</RouterLink
          >
          <q-btn
            class="full-width"
            :class="$q.dark.isActive ? 'custom-shadow' : ''"
            color="primary"
            no-caps
            rounded
            label="Iniciar Sesión"
            type="submit"
            :disable="isPending"
            :loading="isPending"
          >
            <template #loading>
              <q-spinner-tail color="white" />
            </template>
          </q-btn>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
  <div class="text-center q-mt-md">
    <p class="text-grey-7">
      ¿No tienes una cuenta?
      <RouterLink class="text-weight-bold" style="color: var(--q-primary)" :to="{ name: 'sign-up' }"
        >Regístrate aquí</RouterLink
      >
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
