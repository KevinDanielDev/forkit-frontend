import { useQuasar } from 'quasar';

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
