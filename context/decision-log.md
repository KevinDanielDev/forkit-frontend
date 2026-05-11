# Decision Log

Record here all architectural and design choices made during development.

| Date       | Decision                  | Reason                                                                           |
| :--------- | :------------------------ | :------------------------------------------------------------------------------- |
| 2026-05-10 | Project Init              | Use Quasar + Bun + Context-Driven AI Development.                               |
| 2026-05-10 | Sign-Up Form Fields       | Selected: firstName, lastName, email, phone, countryCode, password, confirmPassword |
| 2026-05-10 | Auth Page Structure       | Single auth page with toggle between sign-up/sign-in (no route change)           |
| 2026-05-10 | Form Validation           | Client-side validation with real-time feedback and error messages                |
| 2026-05-10 | Password Requirements     | Min 8 chars, 1 uppercase, 1 number, 1 special char with visual strength feedback |
| 2026-05-10 | Theme Implementation      | Modern dark theme using Quasar's $dark and $dark-page variables                 |
| 2026-05-10 | Component Architecture    | Separated concerns: FormInput (reusable), SignUpForm, AuthCard, AuthToggle       |
| 2026-05-10 | State Management          | Pinia store for auth state, composables for form logic and country select       |
| 2026-05-10 | i18n Structure            | All auth UI strings in en-US translation file, ready for future localization     |
| 2026-05-10 | Routing Config            | Redirect / to /auth/sign-up for auto sign-up flow                                |
| 2026-05-10 | TypeScript Strict Mode    | Use relative imports, avoid `any` type, use explicit error handling              |
| 2026-05-10 | ESLint Config             | Remove unnecessary regex escapes, no async functions without await               |


