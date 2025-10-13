import { Paper, Title, Text, Stack, Box, Group, ThemeIcon } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Plane } from 'lucide-react';
import { SignupForm } from './SignupForm';

export function SignupPage() {
  const { t } = useTranslation();

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Box style={{ width: '100%', maxWidth: '520px' }}>
        <Stack gap="xl">
          {/* Logo/Brand */}
          <Group justify="center">
            <ThemeIcon
              size={60}
              radius="xl"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            >
              <Plane size={36} />
            </ThemeIcon>
          </Group>

          <Box ta="center">
            <Title
              order={1}
              style={{
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              Flyway
            </Title>
            <Text c="dimmed" size="lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Take your business to new heights
            </Text>
          </Box>

          <Paper
            withBorder
            shadow="xl"
            p={40}
            radius="lg"
            style={{
              backgroundColor: 'white',
            }}
          >
            <Stack gap="md">
              <div>
                <Title ta="center" order={2} mb="xs">
                  {t('auth.signup.title')}
                </Title>
                <Text c="dimmed" size="sm" ta="center">
                  {t('auth.signup.subtitle')}
                </Text>
              </div>
              <SignupForm />
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
