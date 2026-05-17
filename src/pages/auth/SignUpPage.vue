<script setup lang="ts">
/**
 * SignUpPage — User registration page.
 *
 * Renders the sign-up form allowing new users to create accounts.
 * Collects personal information, contact details, and password.
 * Includes full form validation and responsive design.
 *
 * **Form Fields**
 * - First name (Nombres): Required text input
 * - Last name (Apellidos): Required text input
 * - Email: Required, must be valid email format, unique in database
 * - Country code: Required (+57, +1, +34, etc.)
 * - Phone number: Required, must be valid phone format
 * - Password: Required, must meet security requirements
 *   (min 8 chars, uppercase, lowercase, number, special char)
 *
 * **Collected Data Structure (ISignUp)**
 * - name: First name
 * - lastName: Last name
 * - email: Email address
 * - countryCode: Phone country code
 * - phone: Phone number
 * - password: User password
 *
 * **Registration Flow**
 * 1. User fills all required fields
 * 2. Click "Create account" button or press Enter
 * 3. Client-side validation checks all fields
 * 4. Mutation sends to Parse backend
 * 5. Server validates unique email and creates user account
 * 6. On success: Creates ACL, assigns Admin role, redirects to dashboard
 * 7. On error: Shows error notification, form stays visible for retry
 *
 * **Validation Rules**
 * - All fields required
 * - Email: Must be valid format and globally unique
 * - Phone: Must match phone format for country code
 * - Password: Must meet minimum security requirements
 *
 * **Features**
 * - Two-column layout on tablet/desktop, single column on mobile
 * - Password visibility toggle
 * - Loading spinner during submission
 * - Link to sign-in page for existing users
 * - Responsive design (md padding on mobile, xl on desktop)
 *
 * **Styling**
 * - Glassmorphism card design
 * - Primary color buttons and links
 * - Icon prepends for visual clarity
 * - Dark mode support
 *
 * @component
 * @example
 * // In router:
 * { path: 'sign-up', name: 'sign-up', component: () => import('pages/auth/SignUpPage.vue') }
 *
 * // Access at /auth/sign-up
 */
import { ref } from 'vue';
import { useAuth } from 'src/composables/auth/useAuth';

import type { ISignUp } from 'src/models/interfaces/auth/sign-up.interface';
import { useValidationRules } from 'src/composables/common/useValidationRules';

// Composables
const { signUpMutation } = useAuth();
const { isPending } = signUpMutation;
const { ...rules } = useValidationRules();

// Form state
/** @type {Ref<ISignUp>} User registration data */
const userData = ref<ISignUp>({
  name: '',
  lastName: '',
  email: '',
  countryCode: '',
  phone: '',
  password: '',
});
/** @type {Ref<boolean>} Controls password field visibility */
const isPasswordVisible = ref<boolean>(false);

/**
 * Handles the sign-up form submission.
 * Triggers the registration mutation with all user data.
 */
function handleSignUp() {
  signUpMutation.mutate(userData.value);
}
</script>

<template>
  <div class="text-center">
    <div class="text-bold" :class="$q.screen.lt.sm ? 'text-h4' : 'text-h2'">Registrarse</div>
    <div class="text-grey-7 text-subtitle1 q-mt-sm">
      Crea tu cuenta para empezar a gestionar tus servicios
    </div>
  </div>

  <q-card flat bordered class="q-mt-md full-width fk-auth-card">
    <q-card-section :class="$q.screen.lt.sm ? 'q-pa-md' : 'q-pa-xl'">
      <q-form @submit.prevent="handleSignUp()" class="q-gutter-y-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <label class="text-weight-medium">Nombres</label>
            <q-input
              class="q-mt-xs"
              v-model="userData.name"
              type="text"
              placeholder="Jhon"
              dense
              outlined
              lazy-rules
              :rules="[rules.required()]"
            >
              <template #prepend><q-icon name="person" /></template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="text-weight-medium">Apellidos</label>
            <q-input
              class="q-mt-xs"
              v-model="userData.lastName"
              type="text"
              placeholder="Doe"
              dense
              outlined
              lazy-rules
              :rules="[rules.required()]"
            >
              <template #prepend><q-icon name="person" /></template>
            </q-input>
          </div>
        </div>

        <div>
          <label class="text-weight-medium">Correo Electrónico</label>
          <q-input
            class="q-mt-xs"
            v-model="userData.email"
            type="email"
            placeholder="jhon.doe@gmail.com"
            dense
            outlined
            lazy-rules
            :rules="rules.requiredEmail"
          >
            <template #prepend><q-icon name="email" /></template>
          </q-input>
        </div>

        <div class="row q-col-gutter-md q-mt-xs">
          <div class="col-4 col-sm-3">
            <label class="text-weight-medium">Código</label>
            <q-input
              class="q-mt-xs"
              v-model="userData.countryCode"
              type="text"
              placeholder="+57"
              dense
              outlined
              lazy-rules
              :rules="[rules.required()]"
            />
          </div>
          <div class="col-8 col-sm-9">
            <label class="text-weight-medium">Teléfono</label>
            <q-input
              class="q-mt-xs"
              v-model="userData.phone"
              type="tel"
              placeholder="300 123 4567"
              dense
              outlined
              lazy-rules
              :rules="rules.requiredPhone"
            >
              <template #prepend><q-icon name="phone" /></template>
            </q-input>
          </div>
        </div>

        <div>
          <label class="text-weight-medium">Contraseña</label>
          <q-input
            class="q-mt-xs"
            v-model="userData.password"
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="●●●●●●●●"
            dense
            outlined
            lazy-rules
            :rules="rules.requiredPassword"
          >
            <template #prepend><q-icon name="lock" /></template>
            <template #append>
              <q-btn
                dense
                flat
                round
                :icon="isPasswordVisible ? 'visibility' : 'visibility_off'"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </q-input>
        </div>

        <q-btn
          class="full-width q-mt-md"
          color="primary"
          unelevated
          no-caps
          rounded
          label="Crear cuenta"
          type="submit"
          :loading="isPending"
          :disable="isPending"
        />
      </q-form>
    </q-card-section>
  </q-card>

  <div class="text-center q-mt-md">
    <p class="text-grey-7">
      ¿Ya tienes una cuenta?
      <RouterLink class="text-weight-bold" :to="{ name: 'sign-in' }" style="color: var(--q-primary)"
        >Inicia sesión aquí</RouterLink
      >
    </p>
  </div>
</template>
