import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Badge,
  Grid,
  Card,
  ThemeIcon,
  Box,
  Center,
  Loader,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import {
  Building,
  User,
  Settings,
  BarChart,
  Users,
  Folder,
} from 'lucide-react';
import { useCurrentUserQuery } from '../../../shared/api/queries/user';
import { useCurrentOrganization } from '../../../shared/hooks';
import { useNavigate } from 'react-router';

export function DashboardPage() {
  const { t } = useTranslation();
  const { data: user, isLoading } = useCurrentUserQuery();
  const { currentOrganization, hasOrganizations } = useCurrentOrganization();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Center h="calc(100vh - 120px)">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Stack gap="xl">
        {/* Welcome Section */}
        <Box>
          <Title order={1} mb="xs">
            {t('dashboard.welcome', { name: user.firstName })}
          </Title>
          <Text c="dimmed" size="lg">
            {t('dashboard.welcome_subtitle')}
          </Text>
        </Box>

        {/* Stats Cards */}
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder padding="lg" radius="md"  >
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    {t('dashboard.stats.active_projects')}
                  </Text>
                  <Text fw={700} size="xl">
                    12
                  </Text>
                </div>
                <ThemeIcon
                  color="blue"
                  variant="light"
                  size={50}
                  radius="md"
                >
                  <Folder size={28} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder padding="lg" radius="md"  >
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    {t('dashboard.stats.team_members')}
                  </Text>
                  <Text fw={700} size="xl">
                    {hasOrganizations ? '8' : '1'}
                  </Text>
                </div>
                <ThemeIcon
                  color="teal"
                  variant="light"
                  size={50}
                  radius="md"
                >
                  <Users size={28} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder padding="lg" radius="md"  >
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    {t('dashboard.stats.revenue')}
                  </Text>
                  <Text fw={700} size="xl">
                    $24.5k
                  </Text>
                </div>
                <ThemeIcon
                  color="violet"
                  variant="light"
                  size={50}
                  radius="md"
                >
                  <BarChart size={28} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder padding="lg" radius="md"  >
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    {t('dashboard.stats.organizations')}
                  </Text>
                  <Text fw={700} size="xl">
                    {hasOrganizations ? '1' : '0'}
                  </Text>
                </div>
                <ThemeIcon
                  color="orange"
                  variant="light"
                  size={50}
                  radius="md"
                >
                  <Building size={28} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        {/* User Info Card */}
        <Paper withBorder   p="xl" radius="md">
          <Stack gap="lg">
            <Group justify="space-between">
              <Title order={3}>{t('dashboard.user_info')}</Title>
              <Badge
                size="lg"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              >
                {user.status.status}
              </Badge>
            </Group>

            <Grid gutter="md">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card withBorder p="md" radius="md" bg="gray.0">
                  <Group>
                    <ThemeIcon color="blue" variant="light" size="lg" radius="md">
                      <User size={20} />
                    </ThemeIcon>
                    <div style={{ flex: 1 }}>
                      <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                        {t('dashboard.full_name')}
                      </Text>
                      <Text fw={500}>
                        {user.firstName} {user.lastName}
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card withBorder p="md" radius="md" bg="gray.0">
                  <Group>
                    <ThemeIcon color="cyan" variant="light" size="lg" radius="md">
                      <User size={20} />
                    </ThemeIcon>
                    <div style={{ flex: 1 }}>
                      <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                        {t('dashboard.email')}
                      </Text>
                      <Text fw={500}>{user.email}</Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card withBorder p="md" radius="md" bg="gray.0">
                  <Group>
                    <ThemeIcon color="violet" variant="light" size="lg" radius="md">
                      <Building size={20} />
                    </ThemeIcon>
                    <div style={{ flex: 1 }}>
                      <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                        {t('dashboard.organization')}
                      </Text>
                      <Text fw={500}>
                        {currentOrganization?.organization?.name || t('dashboard.no_organization')}
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card withBorder p="md" radius="md" bg="gray.0">
                  <Group>
                    <ThemeIcon color="teal" variant="light" size="lg" radius="md">
                      <User size={20} />
                    </ThemeIcon>
                    <div style={{ flex: 1 }}>
                      <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                        {t('dashboard.created_at')}
                      </Text>
                      <Text fw={500}>
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        {/* Quick Actions */}
        <Paper withBorder   p="xl" radius="md">
          <Stack gap="md">
            <Title order={3}>{t('dashboard.quick_actions')}</Title>
            <Group>
              <Button
                leftSection={<User size={18} />}
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                size="md"
                onClick={() => navigate('/profile')}
              >
                {t('dashboard.view_profile')}
              </Button>
              {!hasOrganizations && (
                <Button
                  leftSection={<Building size={18} />}
                  variant="light"
                  size="md"
                  onClick={() => navigate('/create-organization')}
                >
                  {t('dashboard.create_organization')}
                </Button>
              )}
              <Button
                leftSection={<Settings size={18} />}
                variant="outline"
                size="md"
                onClick={() => navigate('/settings')}
              >
                {t('navigation.settings')}
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
