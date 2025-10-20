import {
  Box,
  Title,
  Text,
  Stack,
  Table,
  ActionIcon,
  Menu,
  Group,
  Alert,
  Center,
  Loader,
  Paper,
  Pagination,
  Badge,
  Tooltip,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useState } from 'react';
import { MoreVertical, Trash2, AlertCircle, Package } from 'lucide-react';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useBuildsQuery, useDeleteBuildMutation } from '../../../shared/api/queries';
import { useShowBackendError, useCurrentOrganization } from '../../../shared/hooks';
import type { BuildResponse } from '../../../generated-api';

export function AppBuildsPage() {
  const { t } = useTranslation();
  const { bundleId } = useParams<{ bundleId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const { showError } = useShowBackendError();

  const { currentOrganization } = useCurrentOrganization();
  const orgId = currentOrganization?.organization?.id || '';

  const pageSize = 10;
  const { data, isLoading, isError } = useBuildsQuery(
    orgId,
    bundleId || '',
    currentPage - 1, // API uses 0-based pagination
    pageSize
  );
  const deleteBuildMutation = useDeleteBuildMutation();

  const builds = data?.data || [];
  const totalPages = data?.totalPages || 0;
  const totalElements = data?.totalElements || 0;

  const handleDeleteBuild = (buildId: string) => {
    modals.openConfirmModal({
      title: t('apps.detail.builds.delete.title'),
      children: (
        <Text size="sm">
          {t('apps.detail.builds.delete.confirmation')}
        </Text>
      ),
      labels: {
        confirm: t('apps.detail.builds.delete.confirm'),
        cancel: t('apps.detail.builds.delete.cancel'),
      },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await deleteBuildMutation.mutateAsync({
            buildId,
          });
          
          // If we deleted the last item on the current page and it's not page 1, go back one page
          if (builds.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
          
          notifications.show({
            title: t('common.success'),
            message: t('apps.detail.builds.delete.success_message'),
            color: 'green',
          });
        } catch (error) {
          showError(error);
        }
      },
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '-';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const truncateHash = (hash?: string) => {
    if (!hash) return '-';
    return hash.substring(0, 7);
  };

  if (isLoading) {
    return (
      <Center h={200}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Alert
        icon={<AlertCircle size={16} />}
        title={t('common.error')}
        color="red"
      >
        {t('apps.detail.builds.error_loading')}
      </Alert>
    );
  }

  const hasBuilds = builds.length > 0;

  return (
    <Box>
      <Stack gap="md">
        <Box>
          <Title order={3}>{t('apps.detail.builds.title')}</Title>
          <Text size="sm" c="dimmed">
            {t('apps.detail.builds.subtitle')}
          </Text>
          {totalElements > 0 && (
            <Text size="xs" c="dimmed" mt="xs">
              {t('apps.detail.builds.showing_count', {
                from: (currentPage - 1) * pageSize + 1,
                to: Math.min(currentPage * pageSize, totalElements),
                total: totalElements,
              })}
            </Text>
          )}
        </Box>

        {!hasBuilds ? (
          <Paper p="xl" withBorder style={{ textAlign: 'center' }}>
            <Stack gap="md" align="center">
              <Package size={48} strokeWidth={1.5} style={{ opacity: 0.5 }} />
              <Box>
                <Text size="lg" fw={500}>
                  {t('apps.detail.builds.no_builds')}
                </Text>
                <Text size="sm" c="dimmed">
                  {t('apps.detail.builds.create_first_build')}
                </Text>
              </Box>
            </Stack>
          </Paper>
        ) : (
          <Paper withBorder>
            <Table.ScrollContainer minWidth={800}>
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t('apps.detail.builds.table.commit')}</Table.Th>
                    <Table.Th>{t('apps.detail.builds.table.branch')}</Table.Th>
                    <Table.Th>{t('apps.detail.builds.table.version')}</Table.Th>
                    <Table.Th>{t('apps.detail.builds.table.size')}</Table.Th>
                    <Table.Th>{t('apps.detail.builds.table.uploaded_at')}</Table.Th>
                    <Table.Th>{t('apps.detail.builds.table.actions')}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {builds?.map((build: BuildResponse) => (
                    <Table.Tr key={build.id}>
                      <Table.Td>
                        <Tooltip label={build.commitHash} withArrow>
                          <Box>
                            <Text ff="monospace" size="sm" fw={500}>
                              {truncateHash(build.commitHash)}
                            </Text>
                            {build.commitMessage && (
                              <Text size="xs" c="dimmed" lineClamp={1}>
                                {build.commitMessage}
                              </Text>
                            )}
                          </Box>
                        </Tooltip>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">
                          {build.branchName}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{build.nativeVersion}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{formatSize(build.buildSize)}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{formatDate(build.createdAt)}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Menu shadow="md" width={200}>
                          <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                              <MoreVertical size={16} />
                            </ActionIcon>
                          </Menu.Target>

                          <Menu.Dropdown>
                            <Menu.Item
                              color="red"
                              leftSection={<Trash2 size={16} />}
                              onClick={() => handleDeleteBuild(build.id)}
                            >
                              {t('apps.detail.builds.delete.menu_item')}
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Paper>
        )}

        {totalPages > 1 && (
          <Group justify="center">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              withEdges
            />
          </Group>
        )}
      </Stack>
    </Box>
  );
}
