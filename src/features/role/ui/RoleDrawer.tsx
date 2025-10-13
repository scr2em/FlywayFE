import { useTranslation } from 'react-i18next';
import {
  Drawer,
  Stack,
  TextInput,
  Textarea,
  Group,
  Button,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield } from 'lucide-react';
import { roleFormSchema, type RoleFormData } from '../model/schema';
import type { RoleResponse } from '../../../generated-api';
import { ControlledPermissionsMultiSelect } from '../../../shared/controlled-form-fields/ControlledMultiSelect';

interface RoleDrawerProps {
  role: RoleResponse | null;
  isPending: boolean;
  close: () => void;
  onSubmit: (data: RoleFormData) => Promise<void>;
}

export function RoleDrawer({
  role,
  isPending,
  close,
  onSubmit,
}: RoleDrawerProps) {
  const { t } = useTranslation();
  const isEdit = role !== null;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: role?.name || '',
      description: role?.description || '',
      permissionCodes: role?.permissions?.map((p) => p.code) || [],
    },
  });

  const handleClose = () => {
    reset();
    close();
  };

  return (
    <Drawer
      opened={true}
      onClose={handleClose}
      title={isEdit ? t('role.edit.title') : t('role.create.title')}
      position="right"
      size="lg"
    >
    


      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label={t('role.create.name_label')}
            placeholder={t('role.create.name_placeholder')}
            leftSection={<Shield size={18} />}
            size="md"
            {...register('name')}
            error={errors.name?.message ? t(errors.name.message) : undefined}
          />

          <Textarea
            label={t('role.create.description_label')}
            placeholder={t('role.create.description_placeholder')}
            size="md"
            minRows={3}
            {...register('description')}
            error={errors.description?.message ? t(errors.description.message) : undefined}
          />

  
          <ControlledPermissionsMultiSelect
            control={control}
            name="permissionCodes"
            label={t('role.create.permissions_label')}
            placeholder={t('role.create.permissions_placeholder')}
            searchable
            clearable
            size="md"
          />

          <Group justify="flex-end" gap="sm" mt="md">
            <Button
              variant="subtle"
              onClick={handleClose}
              disabled={isPending}
            >
              {t('role.create.cancel_button')}
            </Button>
            <Button
              type="submit"
              loading={isPending}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            >
              {isEdit ? t('role.edit.submit_button') : t('role.create.submit_button')}
            </Button>
          </Group>
        </Stack>
      </form>
    </Drawer>
  );
}

