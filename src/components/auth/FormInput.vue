<template>
  <div class="fk-auth-card__input" :class="{ 'fk-auth-card__input--error': error }">
    <label v-if="label" class="fk-auth-card__input-label">{{ label }}</label>
    <q-input
      v-if="!isSelect"
      :model-value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :error="!!error"
      outlined
      dense
      @update:model-value="$emit('update:modelValue', $event as string)"
      @blur="$emit('blur')"
      class="fk-auth-card__input-field"
    />
    <q-select
      v-else
      :model-value="modelValue"
      :options="options"
      :option-value="optionValue"
      :option-label="optionLabel"
      :placeholder="placeholder"
      :error="!!error"
      emit-value
      map-options
      outlined
      dense
      @update:model-value="$emit('update:modelValue', $event as string)"
      @blur="$emit('blur')"
      class="fk-auth-card__input-field"
    />
    <span v-if="error" class="fk-auth-card__input-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { QInput, QSelect } from 'quasar';

interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'date' | 'time';
  error?: string | undefined;
  isSelect?: boolean;
  options?: Array<{ label: string; value: string }> | string[];
  optionValue?: string;
  optionLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const inputType = props.type || 'text';

defineEmits<{
  'update:modelValue': [value: string];
  blur: [];
}>();
</script>

<style scoped lang="scss">
.fk-auth-card__input {
  margin-bottom: 1rem;
}

.fk-auth-card__input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.fk-auth-card__input-field {
  :deep(.q-field__control) {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    color: rgba(255, 255, 255, 0.9);

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }
  }

  :deep(.q-field__native) {
    color: rgba(255, 255, 255, 0.9);

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  :deep(.q-icon) {
    color: rgba(255, 255, 255, 0.5);
  }
}

.fk-auth-card__input--error {
  :deep(.q-field__control) {
    background-color: rgba(193, 0, 21, 0.1);
    border-color: rgba(193, 0, 21, 0.5);
  }
}

.fk-auth-card__input-error {
  display: block;
  font-size: 0.75rem;
  color: $negative;
  margin-top: 0.25rem;
}
</style>
