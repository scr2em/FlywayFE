import { Paper, Title, Text, Stack, Box, Group, ThemeIcon } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Plane } from 'lucide-react';
import { LoginForm } from './LoginForm';

export function LoginPage() {
  const { t } = useTranslation();

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      p="md"
    >
      <Box w="100%" maw="460px">
        <Stack gap="xl">
          {/* Logo/Brand */}
          <Group justify="center">
            <ThemeIcon
              size={60}
              radius="xl"
              variant="gradient"
            >
              <Plane size={36} />
            </ThemeIcon>
          </Group>

          <Box ta="center">
            <Title
              order={1}
              c="white"
              mb="xs"
            >
              Flyway
            </Title>
            <Text size="lg" c="white" style={{ opacity: 0.9 }}>
              Take your business to new heights
            </Text>
          </Box>

          <Paper
            withBorder
            shadow="xl"
            p="xl"
            radius="lg"
            bg="white"
          >
            <Stack gap="md">
              <div>
                <Title ta="center" order={2} mb="xs">
                  {t('auth.login.title')}
                </Title>
                <Text c="dimmed" size="sm" ta="center">
                  {t('auth.login.subtitle')}
                </Text>
              </div>
              <LoginForm />
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
