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
} from '@mantine/core';
import { Copy, Check, Calculator } from 'lucide-react';
import {
  PERMISSIONS,
  getCategories,
  getPermissionsByCategory,
  permissionStringToPermissions,
  permissionsToPermissionString,
} from '../model/permissions';

export function PermissionsCalculatorPage() {
  const { t } = useTranslation();
  const [permissionString, setPermissionString] = useState('0');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Update selected permissions when permission string changes
  useEffect(() => {
    if (permissionString) {
      const permissions = permissionStringToPermissions(permissionString);
      setSelectedPermissions(permissions);
    }
  }, [permissionString]);

  // Update permission string when selected permissions change
  const handlePermissionToggle = (permissionCode: string) => {
    const newSelected = selectedPermissions.includes(permissionCode)
      ? selectedPermissions.filter((code) => code !== permissionCode)
      : [...selectedPermissions, permissionCode];

    setSelectedPermissions(newSelected);
    const newPermissionString = permissionsToPermissionString(newSelected);
    setPermissionString(newPermissionString);
  };

  const handlePermissionStringChange = (value: string) => {
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setPermissionString(value || '0');
    }
  };

  const categories = getCategories();

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
                total: PERMISSIONS.length,
              })}
            </Text>
          </Group>
        </Paper>

        {/* Permissions by Category */}
        {categories.map((category) => {
          const categoryPermissions = getPermissionsByCategory(category);
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

