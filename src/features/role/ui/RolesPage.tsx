import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  Text,
  Button,
  Table,
  Group,
  Badge,
  ActionIcon,
  Paper,
  Box,
  Loader,
  Center,
  Alert,
  Tooltip,
} from '@mantine/core';
import { Shield, Plus, Pencil, Trash2, AlertCircle, Lock } from 'lucide-react';
import { useRolesQuery } from '../../../shared/api/queries/role';
import { useCurrentUserQuery } from '../../../shared/api/queries/user';
import { useRole } from '../hooks/useRole';

export function RolesPage() {
  const { t } = useTranslation();
  const { data: user } = useCurrentUserQuery();
  const { data: roles, isLoading: rolesLoading, error: rolesError } = useRolesQuery();
  
  const roleActions = useRole();

  const organizationId = user?.organization?.id;

  if (!organizationId) {
    return (
      <Container size="lg" py="xl">
        <Alert icon={<AlertCircle size={20} />} title={t('role.no_organization_title')} color="yellow">
          {t('role.no_organization_message')}
        </Alert>
      </Container>
    );
  }

  if (rolesLoading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (rolesError) {
    return (
      <Container size="lg" py="xl">
        <Alert icon={<AlertCircle size={20} />} title={t('common.error')} color="red">
          {t('role.error_loading')}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      {roleActions.ViewComponent}
      
      <Box mb="xl">
        <Group justify="space-between" align="flex-start" mb="md">
          <Box>
            <Title order={1} mb="xs">
              {t('role.title')}
            </Title>
            <Text c="dimmed" size="sm">
              {t('role.subtitle', { count: roles?.length || 0 })}
            </Text>
          </Box>
          <Button
            leftSection={<Plus size={18} />}
            onClick={() => roleActions.create()}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          >
            {t('role.create_button')}
          </Button>
        </Group>
      </Box>

      <Paper shadow="sm" radius="md" withBorder>
        <Table.ScrollContainer minWidth={700}>
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t('role.table.name')}</Table.Th>
                <Table.Th>{t('role.table.description')}</Table.Th>
                <Table.Th>{t('role.table.permissions')}</Table.Th>
                <Table.Th>{t('role.table.created')}</Table.Th>
                <Table.Th>{t('role.table.actions')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {roles && roles.length > 0 ? (
                roles.map((role) => (
                  <Table.Tr key={role.id}>
                    <Table.Td>
                      <Group gap="xs">
                        {role.isSystemRole ? <Lock size={16} /> : <Shield size={16} />}
                        <Text fw={600}>{role.name}</Text>
                        {role.isSystemRole && (
                          <Badge size="xs" variant="light" color="gray">
                            {t('role.system_role')}
                          </Badge>
                        )}
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed" lineClamp={2}>
                        {role.description || '-'}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        {role.permissions && role.permissions.length > 0 ? (
                          <>
                            <Badge size="sm" variant="light">
                              {role.permissions.length} {t('role.permissions_count')}
                            </Badge>
                          </>
                        ) : (
                          <Text size="sm" c="dimmed">
                            {t('role.no_permissions')}
                          </Text>
                        )}
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {new Date(role.createdAt).toLocaleDateString()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip
                          label={role.isSystemRole ? t('role.system_role_edit_disabled') : ''}
                          disabled={!role.isSystemRole}
                        >
                          <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={() => roleActions.update(role)}
                            disabled={role.isSystemRole}
                          >
                            <Pencil size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip
                          label={role.isSystemRole ? t('role.system_role_delete_disabled') : ''}
                          disabled={!role.isSystemRole}
                        >
                          <ActionIcon
                            variant="light"
                            color="red"
                            onClick={() => roleActions.delete(role.id, role.name)}
                            disabled={role.isSystemRole}
                          >
                            <Trash2 size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Center py="xl">
                      <Text c="dimmed">{t('role.no_roles')}</Text>
                    </Center>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </Container>
  );
}
