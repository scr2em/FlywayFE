import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  Text,
  TextInput,
  Checkbox,
  Stack,
  Group,
  Paper,
  SimpleGrid,
  CopyButton,
  ActionIcon,
  Tooltip,
  Badge,
  Alert,
  Loader,
  Center,
} from '@mantine/core';
import { Copy, Check, Calculator, AlertCircle } from 'lucide-react';
import {
  getCategories,
  getPermissionsByCategory,
  permissionStringToPermissions,
  permissionsToPermissionString,
} from '../model/permissions';
import { usePermissionsQuery } from '../../../shared/api/queries';

export function PermissionsCalculatorPage() {
  const { t } = useTranslation();
  const [permissionString, setPermissionString] = useState('0');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  const { data: permissions, isLoading, error } = usePermissionsQuery();

  // Update selected permissions when permission string changes
  useEffect(() => {
    if (permissionString && permissions) {
      const perms = permissionStringToPermissions(permissionString, permissions);
      setSelectedPermissions(perms);
    }
  }, [permissionString, permissions]);

  // Update permission string when selected permissions change
  const handlePermissionToggle = (permissionCode: string) => {
    if (!permissions) return;

    const newSelected = selectedPermissions.includes(permissionCode)
      ? selectedPermissions.filter((code) => code !== permissionCode)
      : [...selectedPermissions, permissionCode];

    setSelectedPermissions(newSelected);
    const newPermissionString = permissionsToPermissionString(newSelected, permissions);
    setPermissionString(newPermissionString);
  };

  const handlePermissionStringChange = (value: string) => {
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setPermissionString(value || '0');
    }
  };

  if (isLoading) {
    return (
      <Container size="xl" py="md">
        <Center h={400}>
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text c="dimmed">{t('common.loading')}</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (error || !permissions) {
    return (
      <Container size="xl" py="md">
        <Alert
          icon={<AlertCircle size={16} />}
          title={t('common.error')}
          color="red"
        >
          {t('permissions_calculator.error_loading')}
        </Alert>
      </Container>
    );
  }

  const categories = getCategories(permissions);

  return (
    <Container size="xl" py="md">
      <Stack gap="md">
        {/* Header */}
        <Stack gap={4}>
          <Group gap="xs">
            <Calculator size={24} />
            <Title order={2}>{t('permissions_calculator.title')}</Title>
          </Group>
          <Text c="dimmed" size="sm">
            {t('permissions_calculator.subtitle')}
          </Text>
        </Stack>

        {/* Permission String Input */}
        <Paper p="md" withBorder>
          <Group justify="space-between" align="flex-end" wrap="nowrap">
            <div style={{ flex: 1 }}>
              <TextInput
                label={t('permissions_calculator.permission_string_label')}
                placeholder={t('permissions_calculator.permission_string_placeholder')}
                value={permissionString}
                onChange={(e) => handlePermissionStringChange(e.currentTarget.value)}
                size="sm"
                styles={{
                  input: {
                    fontFamily: 'monospace',
                    fontWeight: 600,
                  },
                }}
              />
            </div>
            <CopyButton value={permissionString} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? t('permissions_calculator.copied') : t('permissions_calculator.copy')}
                  withArrow
                  position="right"
                >
                  <ActionIcon
                    color={copied ? 'teal' : 'gray'}
                    variant="subtle"
                    onClick={copy}
                    size="md"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
            <Text size="xs" c="dimmed">
              {t('permissions_calculator.enabled_count', {
                count: selectedPermissions.length,
                total: permissions.length,
              })}
            </Text>
          </Group>
        </Paper>

        {/* Permissions by Category */}
        {categories.map((category) => {
          const categoryPermissions = getPermissionsByCategory(permissions, category);
          const enabledInCategory = categoryPermissions.filter((p) =>
            selectedPermissions.includes(p.code)
          ).length;

          return (
            <Stack key={category} gap="xs">
              {/* Category Header */}
              <Group justify="space-between" mb={4}>
                <Group gap="xs">
                  <Text fw={700} size="md" tt="capitalize">
                    {t(`permissions_calculator.categories.${category}`)}
                  </Text>
                  <Text size="xs" c="dimmed">
                    ({categoryPermissions.length})
                  </Text>
                </Group>
                {enabledInCategory > 0 && (
                  <Badge color="blue" variant="light" size="sm">
                    {enabledInCategory}
                  </Badge>
                )}
              </Group>

              {/* Permissions Grid */}
              <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="xs"
              >
                {categoryPermissions.map((permission) => (
                  <Paper key={permission.code} p="xs" withBorder>
                    <Group wrap="nowrap" align="flex-start" gap="xs">
                      <Checkbox
                        checked={selectedPermissions.includes(permission.code)}
                        onChange={() => handlePermissionToggle(permission.code)}
                        size="sm"
                      />
                      <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                        <Text fw={600} size="xs" lineClamp={1}>
                          {permission.label}
                        </Text>
                        <Text size="xs" c="dimmed" ff="monospace" lineClamp={1}>
                          {permission.code}
                        </Text>
                        <Text size="xs" c="dimmed" lineClamp={2}>
                          {permission.description}
                        </Text>
                      </Stack>
                    </Group>
                  </Paper>
                ))}
              </SimpleGrid>
            </Stack>
          );
        })}
      </Stack>
    </Container>
  );
}
