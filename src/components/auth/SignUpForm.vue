<template>
  <form @submit.prevent="handleSubmit" class="fk-auth-card__form">
    <!-- First Name -->
    <FormInput
      v-model="formData.firstName"
      :label="t('auth.fields.firstName')"
      :placeholder="t('auth.fields.firstName')"
      :error="errors.firstName"
      @blur="handleFieldBlur('firstName')"
    />

    <!-- Last Name -->
    <FormInput
      v-model="formData.lastName"
      :label="t('auth.fields.lastName')"
      :placeholder="t('auth.fields.lastName')"
      :error="errors.lastName"
      @blur="handleFieldBlur('lastName')"
    />

    <!-- Country Code -->
    <FormInput
      v-model="formData.countryCode"
      :label="t('auth.fields.countryCode')"
      :placeholder="t('auth.fields.countryCode')"
      :error="errors.countryCode"
      is-select
      :options="countryOptions"
      option-value="value"
      option-label="label"
      @blur="handleFieldBlur('countryCode')"
    />

    <!-- Phone -->
    <FormInput
      v-model="formData.phone"
      :label="t('auth.fields.phone')"
      :placeholder="t('auth.fields.phone')"
      type="tel"
      :error="errors.phone"
      @blur="handleFieldBlur('phone')"
    />

    <!-- Email -->
    <FormInput
      v-model="formData.email"
      :label="t('auth.fields.email')"
      :placeholder="t('auth.fields.email')"
      type="email"
      :error="errors.email"
      @blur="handleFieldBlur('email')"
    />

    <!-- Password -->
    <FormInput
      v-model="formData.password"
      :label="t('auth.fields.password')"
      :placeholder="t('auth.fields.password')"
      :type="showPassword ? 'text' : 'password'"
      :error="errors.password"
      @blur="handleFieldBlur('password')"
    />

    <!-- Password Requirements Info -->
    <div v-if="formData.password" class="fk-auth-card__password-info">
      <div
        class="fk-auth-card__password-requirement"
        :class="{ 'fk-auth-card__password-requirement--met': passwordChecks.minLength }"
      >
        ✓ At least 8 characters
      </div>
      <div
        class="fk-auth-card__password-requirement"
        :class="{ 'fk-auth-card__password-requirement--met': passwordChecks.hasUppercase }"
      >
        ✓ One uppercase letter
      </div>
      <div
        class="fk-auth-card__password-requirement"
        :class="{ 'fk-auth-card__password-requirement--met': passwordChecks.hasNumber }"
      >
        ✓ One number
      </div>
      <div
        class="fk-auth-card__password-requirement"
        :class="{ 'fk-auth-card__password-requirement--met': passwordChecks.hasSpecial }"
      >
        ✓ One special character
      </div>
    </div>

    <!-- Confirm Password -->
    <FormInput
      v-model="formData.confirmPassword"
      :label="t('auth.fields.confirmPassword')"
      :placeholder="t('auth.fields.confirmPassword')"
      :type="showPassword ? 'text' : 'password'"
      :error="errors.confirmPassword"
      @blur="handleFieldBlur('confirmPassword')"
    />

    <!-- Submit Button -->
    <q-btn
      :label="t('auth.buttons.signup')"
      type="submit"
      color="primary"
      size="lg"
      class="fk-auth-card__submit full-width"
      :loading="isSubmitting"
      :disable="!isFormValid"
    />

    <!-- Sign In Link -->
    <div class="fk-auth-card__footer">
      <span>{{ t('auth.haveAccount') }}</span>
      <button type="button" class="fk-auth-card__footer-link" @click="$emit('switch-mode')">
        {{ t('auth.tabs.signin') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthForm } from '../../composables/useAuthForm';
import { useCountrySelect } from '../../composables/useCountrySelect';
import FormInput from './FormInput.vue';

defineEmits<{
  'switch-mode': [];
  submit: [formData: Record<string, string>];
}>();

const { t } = useI18n();
const { formData, errors, isSubmitting, isFormValid, handleFieldBlur, validateForm, resetForm } = useAuthForm();
const { countries: countryOptions } = useCountrySelect();

const showPassword = ref(false);

// Password strength checker
const passwordChecks = computed(() => ({
  minLength: formData.password.length >= 8,
  hasUppercase: /[A-Z]/.test(formData.password),
  hasNumber: /[0-9]/.test(formData.password),
  hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(formData.password),
}));

const handleSubmit = () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    // Here we'll emit the form data for parent to handle submission
    // Phase 4: API integration will happen here
    console.log('Form submitted:', formData);
    // Reset form after successful submission
    resetForm();
    // TODO: Show success message
  } catch (error) {
    console.error('Submission error:', error);
    // TODO: Show error message
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped lang="scss">
.fk-auth-card__form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.fk-auth-card__password-info {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 0.375rem;
}

.fk-auth-card__password-requirement {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.25rem;
  transition: color 0.2s ease;

  &--met {
    color: $positive;
  }
}

.fk-auth-card__submit {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-transform: none;
  font-weight: 500;
}

.fk-auth-card__footer {
  text-align: center;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.fk-auth-card__footer-link {
  background: none;
  border: none;
  color: $primary;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
  margin-left: 0.25rem;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
}
</style>

