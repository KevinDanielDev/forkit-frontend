<template>
  <div class="fk-auth-card">
    <!-- Header -->
    <div class="fk-auth-card__header">
      <h2 class="fk-auth-card__title">{{ t('auth.title') }}</h2>
    </div>

    <!-- Toggle -->
    <AuthToggle :is-sign-up="isSignUp" @toggle="handleToggle" />

    <!-- Forms -->
    <div class="fk-auth-card__content">
      <Transition name="fade-slide" mode="out-in">
        <SignUpForm v-if="isSignUp" key="signup" @switch-mode="handleToggle('signin')" @submit="handleSignUp" />
        <!-- SignInForm will be added in Phase 2 -->
        <div v-else key="signin" class="fk-auth-card__placeholder">
          {{ t('auth.signInComingSoon') }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AuthToggle from './AuthToggle.vue';
import SignUpForm from './SignUpForm.vue';

const { t } = useI18n();

const isSignUp = ref(true);

const handleToggle = (mode: 'signup' | 'signin') => {
  isSignUp.value = mode === 'signup';
};

const handleSignUp = (formData: Record<string, string>) => {
  // This will be handled in Phase 4 when we integrate with the backend
  console.log('Sign up submitted:', formData);
};
</script>

<style scoped lang="scss">
.fk-auth-card {
  background-color: $dark;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fk-auth-card__header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.fk-auth-card__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: -0.5px;
}

.fk-auth-card__content {
  min-height: 400px;
}

.fk-auth-card__placeholder {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  padding: 2rem;
}

// Transition animations
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
