import { reactive, ref, computed } from 'vue';

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  password?: string;
  confirmPassword?: string;
}

export const useAuthForm = () => {
  const formData = reactive<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '',
    password: '',
    confirmPassword: '',
  });

  const errors = reactive<FormErrors>({});
  const isSubmitting = ref(false);

  // Validation rules
  const validateField = (field: keyof SignUpFormData, value: string): string => {
    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return `${field === 'firstName' ? 'First' : 'Last'} name is required`;
        if (value.length < 2) return `${field === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        if (value.length > 50) return `${field === 'firstName' ? 'First' : 'Last'} name cannot exceed 50 characters`;
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone is required';
        if (!/^\d{8,20}$/.test(value.replace(/\D/g, ''))) return 'Phone must be between 8-20 digits';
        return '';

      case 'countryCode':
        if (!value.trim()) return 'Country code is required';
        return '';

      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(value))
          return 'Password must contain at least one special character';
        return '';

      case 'confirmPassword':
        if (!value.trim()) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';

      default:
        return '';
    }
  };

  // Validate single field
  const validateSingleField = (field: keyof SignUpFormData) => {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    } else {
      delete errors[field];
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof SignUpFormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    Object.assign(errors, newErrors);
    return isValid;
  };

  // Handle field blur event
  const handleFieldBlur = (field: keyof SignUpFormData) => {
    validateSingleField(field);
  };

  // Clear field error
  const clearFieldError = (field: keyof SignUpFormData) => {
    delete errors[field];
  };

  // Reset form
  const resetForm = () => {
    formData.firstName = '';
    formData.lastName = '';
    formData.email = '';
    formData.phone = '';
    formData.countryCode = '';
    formData.password = '';
    formData.confirmPassword = '';
    Object.keys(errors).forEach((key) => {
      delete errors[key as keyof FormErrors];
    });
  };

  // Check if form is valid
  const isFormValid = computed(() => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.countryCode.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      Object.keys(errors).length === 0 &&
      formData.password === formData.confirmPassword
    );
  });

  return {
    formData,
    errors,
    isSubmitting,
    isFormValid,
    validateField,
    validateSingleField,
    validateForm,
    handleFieldBlur,
    clearFieldError,
    resetForm,
  };
};
