import {
  Box,
  Title,
  Text,
  Stack,
  Group,
  Avatar,
  Badge,
  Card,
  Center,
  Loader,
  Button,
  Table,
  Alert,
  ScrollArea,
  ActionIcon,
  Tooltip,
  Menu,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { AlertCircle, UserPlus, MailPlus, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { useOrganizationMembersQuery, useRemoveMemberMutation } from '../../../shared/api/queries/organization';
import { useCurrentUserQuery } from '../../../shared/api/queries/user';
import { InviteUserModal } from '../../invitation';
import { useResendInvitationMutation } from '../../../shared/api/queries/invitation';
import { useShowBackendError } from '../../../shared/hooks';

export function TeamPage() {
  const { t } = useTranslation();
  const [inviteModalOpened, setInviteModalOpened] = useState(false);
  const [resendingInvitationId, setResendingUserId] = useState<string | null>(null);
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUserQuery();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useOrganizationMembersQuery();
  
  const resendInvitationMutation = useResendInvitationMutation();
  const removeMemberMutation = useRemoveMemberMutation();
  const { showError } = useShowBackendError();

  const handleResendInvitation = async (userId: string) => {
    setResendingUserId(userId);
    try {
      await resendInvitationMutation.mutateAsync(userId);
      notifications.show({
        title: t('common.success'),
        message: t('team.resend_success'),
        color: 'green',
      });
    } catch (error) {
      showError(error);
    } finally {
      setResendingUserId(null);
    }
  };

  const handleDeleteMember = (memberId: string, memberName: string) => {
    modals.openConfirmModal({
      title: t('team.delete.title'),
      children: (
        <Text size="sm">
          {t('team.delete.confirmation', { name: memberName })}
        </Text>
      ),
      labels: { confirm: t('team.delete.confirm'), cancel: t('team.delete.cancel') },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await removeMemberMutation.mutateAsync(memberId);
          notifications.show({
            title: t('common.success'),
            message: t('team.delete.success_message'),
            color: 'green',
          });
        } catch (error) {
          showError(error);
        }
      },
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleBadgeColor = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case 'admin':
        return 'red';
      case 'member':
        return 'blue';
      case 'viewer':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'gray';
      case 'pending':
        return 'yellow';
      case 'suspended':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getInvitationStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'rejected':
        return 'red';
      case 'expired':
        return 'gray';
      default:
        return 'gray';
    }
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
          title={t('team.no_organization_title')}
          color="yellow"
        >
          {t('team.no_organization_message')}
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
          {t('team.error_loading')}
        </Alert>
      </Box>
    );
  }

  const allMembers = data?.pages.flatMap((page) => page.data) || [];
  const totalMembers = data?.pages[0]?.total || 0;

  return (
    <Box>
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Box>
            <Title order={1} mb="xs">
              {t('team.title')}
            </Title>
            <Text c="dimmed" size="lg">
              {t('team.subtitle', { count: totalMembers })}
            </Text>
          </Box>
          <Button
            leftSection={<UserPlus size={18} />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            onClick={() => setInviteModalOpened(true)}
          >
            {t('team.invite_member')}
          </Button>
        </Group>

        {/* Members Table */}
        <Card withBorder shadow="sm" padding={0} radius="md">
          <ScrollArea>
            <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{t('team.table.member')}</Table.Th>
                  <Table.Th>{t('team.table.email')}</Table.Th>
                  <Table.Th>{t('team.table.role')}</Table.Th>
                  <Table.Th>{t('team.table.status')}</Table.Th>
                  <Table.Th>{t('team.table.invitation_status')}</Table.Th>
                  <Table.Th>{t('team.table.joined')}</Table.Th>
                  <Table.Th>{t('team.table.actions')}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {allMembers.map((member) => (
                  <Table.Tr key={member.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar
                          size={40}
                          radius="xl"
                          color="blue"
                        >
                          {getInitials(member.user.firstName, member.user.lastName)}
                        </Avatar>
                        <div>
                          <Text fw={500} size="sm">
                            {member.user.firstName} {member.user.lastName}
                          </Text>
                          {member.user.id === currentUser.id && (
                            <Text size="xs" c="dimmed">
                              {t('team.you')}
                            </Text>
                          )}
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{member.user.email}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={getRoleBadgeColor(member.role.name)}
                        variant="light"
                      >
                        {member.role.name}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={getStatusBadgeColor(member.user.status.status)}
                        variant="dot"
                      >
                        {member.user.status.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {member.user.invitationStatus ? (
                        <Group gap="xs">
                          <Badge
                            color={getInvitationStatusBadgeColor(member.user.invitationStatus.status)}
                            variant="light"
                          >
                            {member.user.invitationStatus.status}
                          </Badge>
                          {(member.user.invitationStatus.status === 'pending' || 
                            member.user.invitationStatus.status === 'rejected') && (
                            <Tooltip label={t('team.resend_invitation')}>
                              <ActionIcon
                                variant="subtle"
                                color="blue"
                                onClick={() => handleResendInvitation(member.user.id)}
                                loading={resendingInvitationId === member.user.invitationStatus!.id}
                              >
                                <MailPlus size={18} />
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </Group>
                      ) : (
                        <Text size="sm" c="dimmed">
                          {t('team.no_invitation')}
                        </Text>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {new Date(member.joinedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Menu shadow="md" width={200} position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <MoreVertical size={18} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            color="red"
                            leftSection={<Trash2 size={16} />}
                            onClick={() => handleDeleteMember(member.id, `${member.user.firstName} ${member.user.lastName}`)}
                            disabled={member.user.id === currentUser.id}
                          >
                            {t('team.delete.menu_item')}
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>

          {/* Load More Button */}
          {hasNextPage && (
            <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
              <Center>
                <Button
                  onClick={() => fetchNextPage()}
                  loading={isFetchingNextPage}
                  variant="subtle"
                >
                  {isFetchingNextPage
                    ? t('team.loading_more')
                    : t('team.load_more')}
                </Button>
              </Center>
            </Box>
          )}
        </Card>

      </Stack>

      <InviteUserModal
        opened={inviteModalOpened}
        onClose={() => setInviteModalOpened(false)}
      />
    </Box>
  );
}

