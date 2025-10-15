import { Box, Title, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export function ApiKeysPage() {
  const { t } = useTranslation();

  return (
    <Box>
      <Title order={3} mb="md">
        {t('apps.detail.api_keys.title')}
      </Title>
      <Text c="dimmed">
        {t('apps.detail.api_keys.coming_soon')}
      </Text>
    </Box>
  );
}

