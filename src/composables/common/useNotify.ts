import { useQuasar } from 'quasar';

/**
 * Composable for displaying toast notifications to users.
 * 
 * Provides helper functions to show success and error notifications using Quasar's
 * notification system. Notifications appear in the top-right corner with automatic
 * dismissal and visual feedback.
 * 
 * @returns {Object} Notification methods
 * @returns {Function} .notifySuccess - Display a success notification
 * @returns {Function} .notifyError - Display an error notification
 * 
 * @example
 * const { notifySuccess, notifyError } = useNotify();
 * 
 * // Show success notification
 * notifySuccess('Success', 'Operation completed successfully');
 * 
 * // Show error notification
 * notifyError('Error', 'An unexpected error occurred');
 */
export function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message: string, caption: string) => {
    $q.notify({
      color: 'green',
      textColor: 'white',
      icon: 'check_circle',
      message,
      caption,
      position: 'top-right',
      timeout: 2500,
      classes: 'shadow-4 rounded-borders',
      progress: true,
    });
  };

  const notifyError = (message: string, caption: string) => {
    $q.notify({
      color: 'negative',
      icon: 'error',
      message,
      caption,
      position: 'top-right',
      timeout: 3000,
      classes: 'shadow-4 rounded-borders',
      progress: true,
    });
  };

  return { notifySuccess, notifyError };
}
