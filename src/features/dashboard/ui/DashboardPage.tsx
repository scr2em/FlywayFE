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
  Avatar,
  ActionIcon,
  Menu,
  rem,
  Center,
  Loader,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import {
  Building,
  User,
  Settings,
  LogOut,
  BarChart,
  Users,
  Folder,
  Plus,
  Bell,
} from 'lucide-react';
import { useAuth } from '../../../shared/lib/auth/AuthContext';
import { useCurrentUserQuery } from '../../../shared/api/queries/user';
import { useNavigate } from 'react-router';

export function DashboardPage() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { data: user, isLoading } = useCurrentUserQuery();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box style={{ minHeight: '100vh' }} bg="gray.0">
      {/* Header */}
      <Box
        bg="white"
        style={{
          borderBottom: '1px solid var(--mantine-color-gray-2)',
        }}
        py="md"
        px="xl"
      >
        <Group justify="space-between">
          <Group>
            <ThemeIcon
              size={40}
              radius="md"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            >
              <Plus size={24} />
            </ThemeIcon>
            <Title order={3}>Flyway</Title>
          </Group>

          <Group>
            <ActionIcon variant="light" size="lg" radius="md">
              <Bell size={20} />
            </ActionIcon>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="light" size="lg" radius="md">
                  <Avatar
                    size={32}
                    radius="xl"
                    color="blue"
                    style={{ cursor: 'pointer' }}
                  >
                    {getInitials(user.firstName, user.lastName)}
                  </Avatar>
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  {user.firstName} {user.lastName}
                </Menu.Label>
                <Menu.Item leftSection={<User style={{ width: rem(14), height: rem(14) }} />}>
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<Settings style={{ width: rem(14), height: rem(14) }} />}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<LogOut style={{ width: rem(14), height: rem(14) }} />}
                  onClick={handleLogout}
                >
                  {t('auth.logout')}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Box>

      {/* Main Content */}
      <Box py="xl" px="xl">
        <Stack gap="xl">
          {/* Welcome Section */}
          <Box>
            <Title order={1} mb="xs">
              {t('dashboard.welcome', { name: user.firstName })}
            </Title>
            <Text c="dimmed" size="lg">
              Here&apos;s what&apos;s happening with your business today
            </Text>
          </Box>

          {/* Stats Cards */}
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card withBorder padding="lg" radius="md" shadow="sm">
                <Group justify="space-between">
                  <div>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                      Active Projects
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
              <Card withBorder padding="lg" radius="md" shadow="sm">
                <Group justify="space-between">
                  <div>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                      Team Members
                    </Text>
                    <Text fw={700} size="xl">
                      {user.organization ? '8' : '1'}
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
              <Card withBorder padding="lg" radius="md" shadow="sm">
                <Group justify="space-between">
                  <div>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                      Revenue
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
              <Card withBorder padding="lg" radius="md" shadow="sm">
                <Group justify="space-between">
                  <div>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                      Organizations
                    </Text>
                    <Text fw={700} size="xl">
                      {user.organization ? '1' : '0'}
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
          <Paper withBorder shadow="sm" p="xl" radius="md">
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
                          Full Name
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
                          {user.organization?.name || t('dashboard.no_organization')}
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
          <Paper withBorder shadow="sm" p="xl" radius="md">
            <Stack gap="md">
              <Title order={3}>{t('dashboard.quick_actions')}</Title>
              <Group>
                <Button
                  leftSection={<User size={18} />}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                  size="md"
                >
                  {t('dashboard.view_profile')}
                </Button>
                {!user.organization && (
                  <Button
                    leftSection={<Building size={18} />}
                    variant="light"
                    size="md"
                  >
                    {t('dashboard.create_organization')}
                  </Button>
                )}
                <Button
                  leftSection={<Settings size={18} />}
                  variant="outline"
                  size="md"
                >
                  Settings
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
