import { Box, Title, Text, Card, Center } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Hammer } from 'lucide-react';

export function BuildsPage() {
  const { t } = useTranslation();

  return (
    <Box>
      <Title order={2} mb="lg">
        {t('apps.detail.builds.title')}
      </Title>
      <Card withBorder shadow="sm" padding="xl" radius="md">
        <Center p="xl">
          <Box ta="center">
            <Hammer size={48} strokeWidth={1.5} style={{ margin: '0 auto', opacity: 0.5 }} />
            <Text c="dimmed" mt="md">
              {t('apps.detail.builds.coming_soon')}
            </Text>
          </Box>
        </Center>
      </Card>
    </Box>
  );
}

