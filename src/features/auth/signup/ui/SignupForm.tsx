import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { TextInput, PasswordInput, Button, Stack, Text, Anchor, Group, Divider } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Mail, Lock, User } from 'lucide-react';
import { signupSchema, type SignupFormData } from '../model/schema';
import { useSignupMutation } from '../../../../shared/api/queries/auth';
import { useAuth } from '../../../../shared/lib/auth/AuthContext';
import { useNavigate } from 'react-router';

export function SignupForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const signupMutation = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signupMutation.mutateAsync(data);
      setIsAuthenticated(true);
      notifications.show({
        title: t('common.success'),
        message: t('auth.signup.title'),
        color: 'green',
      });
      
      // Redirect to organization creation if user doesn't have one
      if (!response.user.organization) {
        navigate('/create-organization');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      notifications.show({
        title: t('common.error'),
        message: error.response?.data?.message || t('auth.signup.error_generic'),
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        <Group grow>
          <TextInput
            label={t('auth.signup.first_name_label')}
            placeholder={t('auth.signup.first_name_placeholder')}
            leftSection={<User size={18} />}
            size="md"
            {...register('firstName')}
            error={errors.firstName?.message ? t(errors.firstName.message) : undefined}
          />

          <TextInput
            label={t('auth.signup.last_name_label')}
            placeholder={t('auth.signup.last_name_placeholder')}
            leftSection={<User size={18} />}
            size="md"
            {...register('lastName')}
            error={errors.lastName?.message ? t(errors.lastName.message) : undefined}
          />
        </Group>

        <TextInput
          label={t('auth.signup.email_label')}
          placeholder={t('auth.signup.email_placeholder')}
          leftSection={<Mail size={18} />}
          size="md"
          {...register('email')}
          error={errors.email?.message ? t(errors.email.message) : undefined}
        />

        <PasswordInput
          label={t('auth.signup.password_label')}
          placeholder={t('auth.signup.password_placeholder')}
          leftSection={<Lock size={18} />}
          size="md"
          {...register('password')}
          error={errors.password?.message ? t(errors.password.message) : undefined}
        />

        <Button
          type="submit"
          fullWidth
          size="md"
          loading={signupMutation.isPending}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
        >
          {t('auth.signup.submit_button')}
        </Button>

        <Divider />

        <Text ta="center" size="sm">
          {t('auth.signup.have_account')}{' '}
          <Anchor
            onClick={() => navigate('/login')}
            fw={700}
            c="brand"
            style={{ cursor: 'pointer' }}
          >
            {t('auth.signup.login_link')}
          </Anchor>
        </Text>
      </Stack>
    </form>
  );
}
