import { Container, Paper, Title, Text, Stack, Button, Group, Alert, Loader, Center } from '@mantine/core';
import { useSearchParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Mail, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useGetInvitationByToken, useAcceptInvitationMutation, useRejectInvitationMutation } from '../../../shared/api/queries/invitation';
import { useShowBackendError } from '../../../shared/hooks/useShowBackendError';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export function AcceptInvitationPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showBackendError = useShowBackendError();
  const [isProcessed, setIsProcessed] = useState(false);

  const token = searchParams.get('token') || '';
  
  const { data: invitation, isLoading, error } = useGetInvitationByToken(token);
  const acceptMutation = useAcceptInvitationMutation();
  const rejectMutation = useRejectInvitationMutation();

  const handleAccept = async () => {
    try {
      await acceptMutation.mutateAsync(token);
      notifications.show({
        title: t('common.success'),
        message: t('invitation.accept.success_message'),
        color: 'green',
        icon: <CheckCircle size={18} />,
      });
      setIsProcessed(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      showBackendError.showError(error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectMutation.mutateAsync(token);
      notifications.show({
        title: t('common.success'),
        message: t('invitation.accept.reject_success_message'),
        color: 'blue',
        icon: <XCircle size={18} />,
      });
      setIsProcessed(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      showBackendError.showError(error);
    }
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text c="dimmed">{t('common.loading')}</Text>
        </Stack>
      </Center>
    );
  }

  if (error || !invitation) {
    return (
      <Container size="sm" pt={80}>
        <Paper shadow="md" p="xl" radius="md" withBorder>
          <Stack gap="lg" align="center">
            <AlertCircle size={48} color="var(--mantine-color-red-6)" />
            <Title order={2}>{t('invitation.accept.error_title')}</Title>
            <Text c="dimmed" ta="center">
              {t('invitation.accept.error_message')}
            </Text>
            <Button onClick={() => navigate('/login')} variant="light">
              {t('invitation.accept.go_to_login')}
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  const isExpired = invitation.status.status === 'expired';
  const isAlreadyProcessed = invitation.status.status === 'accepted' || invitation.status.status === 'rejected';

  return (
    <Container size="sm" pt={80}>
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Stack gap="lg">
          <Stack gap="xs" align="center">
            <Mail size={48} color="var(--mantine-color-blue-6)" />
            <Title order={2}>{t('invitation.accept.title')}</Title>
            <Text c="dimmed" ta="center">
              {t('invitation.accept.subtitle')}
            </Text>
          </Stack>

          {isExpired && (
            <Alert color="red" icon={<AlertCircle size={16} />}>
              {t('invitation.accept.expired_message')}
            </Alert>
          )}

          {isAlreadyProcessed && (
            <Alert color="blue" icon={<AlertCircle size={16} />}>
              {invitation.status.status === 'accepted' 
                ? t('invitation.accept.already_accepted_message')
                : t('invitation.accept.already_rejected_message')}
            </Alert>
          )}

          {isProcessed && (
            <Alert color="green" icon={<CheckCircle size={16} />}>
              {t('invitation.accept.redirecting_message')}
            </Alert>
          )}

          <Stack gap="sm">
            <Paper p="md" withBorder>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" fw={500} c="dimmed">
                    {t('invitation.accept.organization')}
                  </Text>
                  <Text size="sm" fw={600}>
                    {invitation.organization.name}
                  </Text>
                </Group>

                {invitation.organization.description && (
                  <Group justify="space-between">
                    <Text size="sm" fw={500} c="dimmed">
                      {t('invitation.accept.description')}
                    </Text>
                    <Text size="sm">
                      {invitation.organization.description}
                    </Text>
                  </Group>
                )}

                <Group justify="space-between">
                  <Text size="sm" fw={500} c="dimmed">
                    {t('invitation.accept.role')}
                  </Text>
                  <Text size="sm" fw={600}>
                    {invitation.role.name}
                  </Text>
                </Group>

                {invitation.invitedBy && (
                  <Group justify="space-between">
                    <Text size="sm" fw={500} c="dimmed">
                      {t('invitation.accept.invited_by')}
                    </Text>
                    <Text size="sm">
                      {invitation.invitedBy.firstName} {invitation.invitedBy.lastName}
                    </Text>
                  </Group>
                )}

                <Group justify="space-between">
                  <Text size="sm" fw={500} c="dimmed">
                    {t('invitation.accept.email')}
                  </Text>
                  <Text size="sm">
                    {invitation.email}
                  </Text>
                </Group>

                {invitation.expiresAt && (
                  <Group justify="space-between">
                    <Text size="sm" fw={500} c="dimmed">
                      {t('invitation.accept.expires_at')}
                    </Text>
                    <Text size="sm">
                      {new Date(invitation.expiresAt).toLocaleDateString()}
                    </Text>
                  </Group>
                )}
              </Stack>
            </Paper>
          </Stack>

          {!isExpired && !isAlreadyProcessed && !isProcessed && (
            <Group justify="center" mt="md">
              <Button
                variant="subtle"
                onClick={handleReject}
                disabled={acceptMutation.isPending || rejectMutation.isPending}
                loading={rejectMutation.isPending}
                leftSection={<XCircle size={18} />}
              >
                {t('invitation.accept.reject_button')}
              </Button>
              <Button
                onClick={handleAccept}
                disabled={acceptMutation.isPending || rejectMutation.isPending}
                loading={acceptMutation.isPending}
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                leftSection={<CheckCircle size={18} />}
              >
                {t('invitation.accept.accept_button')}
              </Button>
            </Group>
          )}

          {(isExpired || isAlreadyProcessed) && (
            <Button onClick={() => navigate('/login')} variant="light" fullWidth>
              {t('invitation.accept.go_to_login')}
            </Button>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

