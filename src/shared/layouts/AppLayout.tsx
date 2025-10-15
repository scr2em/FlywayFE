import { AppShell, Group, Avatar, Menu, ActionIcon, rem, Box, NavLink, ScrollArea, Text, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Building,
  Users,
  Settings,
  User,
  LogOut,
  Bell,
  Menu as MenuIcon,
  Folder,
  Radio,
  Package,
  Boxes,
} from 'lucide-react';
import { useAuth } from '../lib/auth/AuthContext';
import { useCurrentUserQuery } from '../api/queries/user';
import { usePermissions } from '../hooks';

export function AppLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { data: user } = useCurrentUserQuery();
      const permissions= usePermissions();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const navigationItems = [
    {
      icon: LayoutDashboard,
      label: t('navigation.dashboard'),
      path: '/dashboard',
      permission: null, // Dashboard is accessible to all
    },
    {
      icon: Folder,
      label: t('navigation.apps'),
      path: '/apps',
      permission: permissions.canReadMobileApp,
    },
    {
      icon: Users,
      label: t('navigation.team'),
      path: '/team',
      permission: permissions.canViewMember,
    },
    {
      icon: Building,
      label: t('navigation.organization'),
      path: '/organization',
      permission: null, // Organization view is accessible to all members
    },
  ];

  // Filter navigation items based on user permissions
  const visibleNavigationItems = navigationItems.filter((item) => item.permission === null || item.permission);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      bg="gray.0"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <ActionIcon
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="lg"
              variant="subtle"
            >
              <MenuIcon size={20} />
            </ActionIcon>
            <ActionIcon
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="lg"
              variant="subtle"
            >
              <MenuIcon size={20} />
            </ActionIcon>
            <Group gap="xs">
              <ThemeIcon
                size={36}
                radius="md"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              >
                <Building size={20} />
              </ThemeIcon>
              <Text size="lg" fw={700}>
                Flyway
              </Text>
            </Group>
          </Group>

          <Group>
            <ActionIcon variant="light" size="lg" radius="md">
              <Bell size={20} />
            </ActionIcon>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar
                  size={36}
                  radius="xl"
                  color="blue"
                  style={{ cursor: 'pointer' }}
                >
                  {user ? getInitials(user.firstName, user.lastName) : ''}
                </Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                {user && (
                  <Menu.Label>
                    {user.firstName} {user.lastName}
                  </Menu.Label>
                )}
                <Menu.Item
                  leftSection={<User style={{ width: rem(14), height: rem(14) }} />}
                  onClick={() => navigate('/profile')}
                >
                  {t('navigation.profile')}
                </Menu.Item>
                <Menu.Item
                  leftSection={<Settings style={{ width: rem(14), height: rem(14) }} />}
                  onClick={() => navigate('/settings')}
                >
                  {t('navigation.settings')}
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
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow component={ScrollArea}>
          <Box>
            {visibleNavigationItems.map((item) => {
              const Icon = item.icon;
           
              
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  label={item.label}
                  leftSection={<Icon size={20} />}
                  active={isActive}
                  onClick={() => navigate(item.path)}
                  mb="xs"
                  style={{ borderRadius: 'var(--mantine-radius-md)' }}
                />
              );
            })}
          </Box>
        </AppShell.Section>

        {user?.organization && (
          <AppShell.Section>
            <Box
              p="md"
              style={{
                borderTop: '1px solid var(--mantine-color-gray-3)',
              }}
            >
              <Group gap="sm">
                <ThemeIcon color="violet" variant="light" size="lg" radius="md">
                  <Building size={18} />
                </ThemeIcon>
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600}>
                    {user.organization.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {t('navigation.organization_info')}
                  </Text>
                </Box>
              </Group>
            </Box>
          </AppShell.Section>
        )}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

