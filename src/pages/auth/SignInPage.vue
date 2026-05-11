<script setup lang="ts">
import { ref } from 'vue';

import { Vue3Lottie } from 'vue3-lottie';

import animationData from 'src/animations/auth/auth.json';

const test = ref<string>('');
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

      <q-form class="q-gutter-md">
        <div>
          <label>Correo Electrónico</label>
          <q-input
            class="q-mt-sm"
            v-model="test"
            type="email"
            placeholder="jhon.doe@gmail.com"
            dense
            outlined
            lazy-rules
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
            v-model="test"
            type="password"
            placeholder="●●●●●●●●"
            dense
            outlined
            lazy-rules
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-btn dense flat round icon="visibility" />
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
          />
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
