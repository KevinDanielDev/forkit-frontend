// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',

  // Auth translations
  auth: {
    title: 'Forkit',
    tabs: {
      signup: 'Sign Up',
      signin: 'Sign In',
    },
    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      countryCode: 'Country',
      password: 'Password',
      confirmPassword: 'Confirm Password',
    },
    validation: {
      required: '{field} is required',
      invalidEmail: 'Please enter a valid email address',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordRequirements: 'Password must contain uppercase, number, and special character',
    },
    buttons: {
      signup: 'Create Account',
      signin: 'Sign In',
    },
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    signInComingSoon: 'Sign in feature coming soon',
    passwordReset: 'Forgot your password?',
    termsAgreement: 'By signing up, you agree to our Terms & Conditions',
  },
};
