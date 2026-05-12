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

  const passwordRules = [
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
    passwordRules,
  };
}
