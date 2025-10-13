import { useTranslation } from 'react-i18next';
import { Paper, Title, Text, Stack, Center, Box } from '@mantine/core';
import { Building2 } from 'lucide-react';
import { CreateOrganizationForm } from './CreateOrganizationForm';

export function CreateOrganizationPage() {
  const { t } = useTranslation();

  return (
    <Box
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <Box style={{ width: '100%', maxWidth: '540px' }}>
        <Paper
          radius="lg"
          p="xl"
          shadow="xl"
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Stack gap="lg">
            <Center>
              <Box
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Building2 size={32} color="white" />
              </Box>
            </Center>

            <Stack gap="xs" align="center">
              <Title order={2} ta="center">
                {t('organization.create.title')}
              </Title>
              <Text c="dimmed" size="sm" ta="center">
                {t('organization.create.subtitle')}
              </Text>
            </Stack>

            <CreateOrganizationForm />
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

