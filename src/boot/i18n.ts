import { defineBoot } from '#q-app/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

/**
 * Type-safe internationalization (i18n) language type.
 * 
 * Represents all available language locales in the application.
 * Currently includes: 'en-US', 'es-ES', etc.
 * 
 * @typedef {string} MessageLanguages
 */
export type MessageLanguages = keyof typeof messages;

/**
 * TypeScript type schema for translation messages.
 * 
 * Defines the structure of all translation strings by extracting
 * the type from the English (en-US) locale. This ensures type safety
 * and IntelliSense support when accessing translations in components.
 * 
 * **Benefits**
 * - IDE autocomplete for all available translation keys
 * - Compile-time error checking for missing or incorrect keys
 * - Automatic refactoring when translation keys change
 * - Documentation of all available messages
 * 
 * @typedef {Object} MessageSchema
 * @example
 * // In components with TypeScript:
 * const message = i18n.global.t('auth.welcome') // ✓ Type-checked
 * const broken = i18n.global.t('invalid.key')    // ✗ Type error!
 */
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en-US'];

/**
 * Vue i18n module augmentation for TypeScript support.
 * 
 * Extends Vue i18n interfaces with the application's message schema,
 * providing full type safety and IDE autocompletion for translations.
 * 
 * See https://vue-i18n.intlify.dev/guide/advanced/typescript.html
 */
// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // Define the locale messages schema for type safety
  export interface DefineLocaleMessage extends MessageSchema {}

  // Define the datetime format schema (empty, no custom date formats)
  export interface DefineDateTimeFormat {}

  // Define the number format schema (empty, no custom number formats)
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

/**
 * Vue i18n initialization and configuration.
 * 
 * Sets up multi-language support with:
 * - Default language: English (en-US)
 * - Composition API support (legacy: false)
 * - All translation messages loaded from i18n configuration
 * - Full TypeScript support for message keys
 * 
 * **Current Supported Languages**
 * - English (en-US) — Default language
 * - Spanish (es-ES) — Optional language
 * 
 * **Usage in Components**
 * ```vue
 * <script setup>
 * import { useI18n } from 'vue-i18n';
 * const { t } = useI18n();
 * </script>
 * 
 * <template>
 *   <h1>{{ t('common.welcome') }}</h1>
 * </template>
 * ```
 * 
 * **Changing Language**
 * ```javascript
 * const { locale } = useI18n();
 * locale.value = 'es-ES'; // Switch to Spanish
 * ```
 * 
 * @example
 * // This boot file runs automatically on app startup
 * // i18n is globally available via useI18n() in all components
 * 
 * @see useI18n - Composable for accessing i18n in components
 * @see src/i18n/en-US/index.ts - English translations
 * @see src/i18n/index.ts - i18n configuration
 */
export default defineBoot(({ app }) => {
  const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
    locale: 'en-US',
    legacy: false,
    messages,
  });

  // Set i18n instance on app for global access
  app.use(i18n);
});
