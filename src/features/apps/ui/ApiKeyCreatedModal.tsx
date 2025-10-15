import { Modal, Button, Stack, Alert, Text, Code, Group, CopyButton } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

interface ApiKeyCreatedModalProps {
  opened: boolean;
  onClose: () => void;
  apiKey: string;
  keyName: string;
}

export function ApiKeyCreatedModal({ opened, onClose, apiKey, keyName }: ApiKeyCreatedModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('apps.detail.api_keys.created.modal_title')}
      size="md"
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Stack gap="md">
        <Alert
          icon={<AlertTriangle size={20} />}
          color="yellow"
          title={t('apps.detail.api_keys.created.warning_title')}
        >
          {t('apps.detail.api_keys.created.warning_message')}
        </Alert>

        <Stack gap="xs">
          <Text size="sm" fw={500}>
            {t('apps.detail.api_keys.created.key_name')}
          </Text>
          <Text size="sm" c="dimmed">
            {keyName}
          </Text>
        </Stack>

        <Stack gap="xs">
          <Group justify="space-between" align="center">
            <Text size="sm" fw={500}>
              {t('apps.detail.api_keys.created.key_label')}
            </Text>
            <CopyButton value={apiKey}>
              {({ copied, copy }) => (
                <Button
                  variant="light"
                  onClick={copy}
                  color={copied ? 'green' : 'blue'}
                  size="xs"
                >
                  {copied ? t('apps.detail.api_keys.created.copied') : t('apps.detail.api_keys.created.copy_button')}
                </Button>
              )}
            </CopyButton>
          </Group>
          <Code block p="md" style={{ wordBreak: 'break-all' }}>
            {apiKey}
          </Code>
        </Stack>

        <Group justify="flex-end">
          <Button onClick={onClose}>
            {t('apps.detail.api_keys.created.confirm_button')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

