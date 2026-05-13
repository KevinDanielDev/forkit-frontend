<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from 'src/composables/auth/useAuth';

import type { ISignUp } from 'src/models/interfaces/auth/sign-up.interface';
import { useValidationRules } from 'src/composables/common/useValidationRules';

// Composables
const { signUpMutation } = useAuth();
const { isPending } = signUpMutation;
const { ...rules } = useValidationRules();

// Refs
const userData = ref<ISignUp>({
  name: '',
  lastName: '',
  email: '',
  countryCode: '',
  phone: '',
  password: '',
});
const isPasswordVisible = ref<boolean>(false);

// Methods
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
