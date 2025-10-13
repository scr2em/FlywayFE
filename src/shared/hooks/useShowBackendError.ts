import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

interface BackendError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function useShowBackendError() {
  const { t } = useTranslation();

  const showError = (error: unknown) => {
    const backendError = error as BackendError;
    const errorMessage =
      backendError?.response?.data?.message ||
      backendError?.message ||
      t('common.error_generic');

    notifications.show({
      title: t('common.error'),
      message: errorMessage,
      color: 'red',
    });
  };

  return { showError };
}

