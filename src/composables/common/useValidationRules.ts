/**
 * Composable providing reusable form validation rules for Quasar forms.
 * 
 * Exports both basic validation rule factories and pre-configured common validation rules.
 * Each rule is a higher-order function that returns a validation function compatible with
 * Quasar's input validation system.
 * 
 * @returns {Object} Validation rule factories and common presets
 * @returns {Function} .required - Required field validator (returns custom or default message)
 * @returns {Function} .email - Email format validator (allows empty values for optional fields)
 * @returns {Function} .minLength - Minimum length validator (parameterized)
 * @returns {Function} .maxLength - Maximum length validator (parameterized)
 * @returns {Function} .numeric - Numeric-only validator (accepts digits only)
 * @returns {Function} .alphanumeric - Alphanumeric validator (letters and digits only)
 * @returns {Function} .phone - Phone number validator (10 digits)
 * @returns {Function} .url - URL validator (http/https format)
 * @returns {Array} .requiredEmail - Pre-configured email validation rules (required + valid email)
 * @returns {Array} .requiredPhone - Pre-configured phone validation rules (required + valid format)
 * @returns {Array} .requiredPassword - Pre-configured password validation rules (8+ chars, uppercase, digit)
 * 
 * @example
 * const { required, email, minLength, requiredPassword } = useValidationRules();
 * 
 * // Use basic validators
 * const rules = [
 *   required('Name is required'),
 *   minLength(3, 'Minimum 3 characters')
 * ];
 * 
 * // Use preset validators
 * const emailRules = requiredEmail;
 * const passwordRules = requiredPassword;
 */
export function useValidationRules() {
  // Basic Rules
  const required =
    (msg = 'Este campo es requerido') =>
    (val: string) =>
      !!val || msg;

  const email =
    (msg = 'Email inválido') =>
    (val: string) =>
      !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || msg;

  const minLength = (min: number, msg: string) => (val: string) =>
    !val || val.length >= min || msg || `Mínimo ${min} caracteres`;

  const maxLength = (max: number, msg: string) => (val: string) =>
    !val || val.length <= max || msg || `Máximo ${max} caracteres`;

  const numeric =
    (msg = 'Solo números') =>
    (val: string) =>
      !val || /^\d+$/.test(val) || msg;

  const alphanumeric =
    (msg = 'Solo letras y números') =>
    (val: string) =>
      !val || /^[a-zA-Z0-9]+$/.test(val) || msg;

  const phone =
    (msg = 'Teléfono inválido') =>
    (val: string) =>
      !val || /^[0-9]{10}$/.test(val) || msg;

  const url =
    (msg = 'URL inválida') =>
    (val: string) =>
      !val || /^https?:\/\/.+/.test(val) || msg;

  // Common Rules
  const requiredEmail = [required('El email es requerido'), email()];

  const requiredPhone = [required('El teléfono es requerido'), phone()];

  const requiredPassword = [
    required('La contraseña es requerida'),
    minLength(8, 'Mínimo 8 caracteres'),
    (val: string) => /[A-Z]/.test(val) || 'Debe contener al menos una mayúscula',
    (val: string) => /[0-9]/.test(val) || 'Debe contener al menos un número',
  ];

  return {
    required,
    email,
    minLength,
    maxLength,
    numeric,
    alphanumeric,
    phone,
    url,
    // Common Rules
    requiredEmail,
    requiredPhone,
    requiredPassword,
  };
}
