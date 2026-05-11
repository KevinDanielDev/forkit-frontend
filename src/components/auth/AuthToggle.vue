<template>
  <div class="fk-auth-card__toggle">
    <button
      class="fk-auth-card__toggle-btn"
      :class="{ 'fk-auth-card__toggle-btn--active': isSignUp }"
      @click="$emit('toggle', 'signup')"
    >
      {{ t('auth.tabs.signup') }}
    </button>
    <button
      class="fk-auth-card__toggle-btn"
      :class="{ 'fk-auth-card__toggle-btn--active': !isSignUp }"
      @click="$emit('toggle', 'signin')"
    >
      {{ t('auth.tabs.signin') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface Props {
  isSignUp: boolean;
}

defineProps<Props>();

defineEmits<{
  toggle: [mode: 'signup' | 'signin'];
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.fk-auth-card__toggle {
  display: flex;
  gap: 0;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.fk-auth-card__toggle-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0.375rem;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  &--active {
    background-color: $primary;
    color: white;
  }
}
</style>
