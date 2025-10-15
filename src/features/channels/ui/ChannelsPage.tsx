import {
  Box,
  Title,
  Text,
  Stack,
  Card,
  Center,
  Loader,
  Button,
  Alert,
  SimpleGrid,
  Group,
  Menu,
  ActionIcon,
  Badge,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Plus, MoreVertical, Trash2, Edit, Radio } from 'lucide-react';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import {
  useChannelsInfiniteQuery,
  useDeleteChannelMutation,
} from '../../../shared/api/queries/channels';
import { useCurrentUserQuery } from '../../../shared/api/queries/user';
import { useShowBackendError } from '../../../shared/hooks';
import { CreateChannelModal } from './CreateChannelModal';
import { UpdateChannelModal } from './UpdateChannelModal';
import type { ChannelResponse } from '../../../generated-api';

export function ChannelsPage() {
  const { t } = useTranslation();
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [updateModalData, setUpdateModalData] = useState<{
    opened: boolean;
    channel: ChannelResponse | null;
  }>({ opened: false, channel: null });

  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUserQuery();
  const orgId = currentUser?.organization?.id || '';
  
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChannelsInfiniteQuery(orgId);

  const deleteChannelMutation = useDeleteChannelMutation(orgId);
  const { showError } = useShowBackendError();

  const handleDeleteChannel = (channelId: string, channelName: string) => {
    modals.openConfirmModal({
      title: t('channels.delete.title'),
      children: (
        <Text size="sm">
          {t('channels.delete.confirmation', { name: channelName })}
        </Text>
      ),
      labels: { confirm: t('channels.delete.confirm'), cancel: t('channels.delete.cancel') },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await deleteChannelMutation.mutateAsync(channelId);
          notifications.show({
            title: t('common.success'),
            message: t('channels.delete.success_message'),
            color: 'green',
          });
        } catch (error) {
          showError(error);
        }
      },
    });
  };

  const handleUpdateChannel = (channel: ChannelResponse) => {
    setUpdateModalData({ opened: true, channel });
  };

  if (isLoadingUser || isLoading) {
    return (
      <Center h="calc(100vh - 120px)">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!currentUser?.organization) {
    return (
      <Box>
        <Alert
          icon={<AlertCircle size={16} />}
          title={t('channels.no_organization_title')}
          color="yellow"
        >
          {t('channels.no_organization_message')}
        </Alert>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Alert
          icon={<AlertCircle size={16} />}
          title={t('common.error')}
          color="red"
        >
          {t('channels.error_loading')}
        </Alert>
      </Box>
    );
  }

  const channels = data?.pages.flatMap((page) => page.data) || [];
  const totalElements = data?.pages[0]?.totalElements || 0;

  return (
    <Box>
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Box>
            <Title order={1} mb="xs">
              {t('channels.title')}
            </Title>
            <Text c="dimmed" size="lg">
              {t('channels.subtitle', { count: totalElements })}
            </Text>
          </Box>
          <Button
            leftSection={<Plus size={18} />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            onClick={() => setCreateModalOpened(true)}
          >
            {t('channels.create_button')}
          </Button>
        </Group>

        {/* Channels Grid */}
        {channels.length === 0 ? (
          <Card withBorder shadow="sm" p="xl" radius="md">
            <Center>
              <Stack align="center" gap="md">
                <Radio size={48} strokeWidth={1.5} color="var(--mantine-color-dimmed)" />
                <Text c="dimmed" size="lg">
                  {t('channels.no_channels')}
                </Text>
                <Button
                  leftSection={<Plus size={18} />}
                  onClick={() => setCreateModalOpened(true)}
                >
                  {t('channels.create_first_channel')}
                </Button>
              </Stack>
            </Center>
          </Card>
        ) : (
          <>
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing="lg"
            >
              {channels.map((channel) => (
                <Card
                  key={channel.id}
                  withBorder
                  shadow="sm"
                  radius="md"
                  padding="lg"
                  style={{ position: 'relative' }}
                >
                  <Stack gap="md">
                    {/* Card Header */}
                    <Group justify="space-between" align="flex-start">
                      <Box style={{ flex: 1 }}>
                        <Group gap="xs" mb={4}>
                          <Radio size={20} strokeWidth={2} />
                          <Text fw={600} size="lg" style={{ lineHeight: 1.2 }}>
                            {channel.name}
                          </Text>
                        </Group>
                        <Badge variant="light" color="blue" size="sm">
                          {t('channels.badge')}
                        </Badge>
                      </Box>
                      
                      <Menu shadow="md" width={200} position="bottom-end">
                        <Menu.Target>
                          <ActionIcon 
                            variant="subtle" 
                            color="gray"
                          >
                            <MoreVertical size={18} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<Edit size={16} />}
                            onClick={() => handleUpdateChannel(channel)}
                          >
                            {t('channels.update.menu_item')}
                          </Menu.Item>
                          <Menu.Item
                            color="red"
                            leftSection={<Trash2 size={16} />}
                            onClick={() => handleDeleteChannel(channel.id, channel.name)}
                          >
                            {t('channels.delete.menu_item')}
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>

                    {/* Description */}
                    {channel.description && (
                      <Text size="sm" c="dimmed" style={{ minHeight: '40px' }}>
                        {channel.description}
                      </Text>
                    )}

                    {/* Metadata */}
                    <Box pt="xs" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
                      <Text size="xs" c="dimmed">
                        {t('channels.created_at', {
                          date: new Date(channel.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }),
                        })}
                      </Text>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>

            {/* Load More Button */}
            {hasNextPage && (
              <Center mt="xl">
                <Button
                  onClick={() => fetchNextPage()}
                  loading={isFetchingNextPage}
                  variant="light"
                >
                  {isFetchingNextPage ? t('channels.loading_more') : t('channels.load_more')}
                </Button>
              </Center>
            )}
          </>
        )}
      </Stack>

      <CreateChannelModal
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
        orgId={orgId}
      />

      {updateModalData.channel && (
        <UpdateChannelModal
          opened={updateModalData.opened}
          onClose={() => setUpdateModalData({ opened: false, channel: null })}
          orgId={orgId}
          channel={updateModalData.channel}
        />
      )}
    </Box>
  );
}

