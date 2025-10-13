import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { RoleResponse } from '../../../generated-api';
import { useShowBackendError } from '../../../shared/hooks/useShowBackendError';
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from '../../../shared/api/queries/role';
import { RoleDrawer } from '../ui/RoleDrawer';
import type { RoleFormData } from '../model/schema';

export function useRole() {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const { showError } = useShowBackendError();

  const [roleToUpdate, setRoleToUpdate] = useState<RoleResponse | null>(null);
  const createRole = useCreateRoleMutation();
  const updateRole = useUpdateRoleMutation();
  const deleteRole = useDeleteRoleMutation();

  return {
    isPending: createRole.isPending || updateRole.isPending || deleteRole.isPending,
    ViewComponent: opened && (
      <RoleDrawer
        role={roleToUpdate}
        isPending={createRole.isPending || updateRole.isPending}
        close={close}
        onSubmit={async (formData: RoleFormData) => {
          try {
            if (roleToUpdate) {
              await updateRole.mutateAsync({
                id: roleToUpdate.id,
                data: formData,
              });
              notifications.show({
                title: t('common.success'),
                message: t('role.edit.success_message'),
                color: 'green',
              });
            } else {
              await createRole.mutateAsync(formData);
              notifications.show({
                title: t('common.success'),
                message: t('role.create.success_message'),
                color: 'green',
              });
            }
            close();
          } catch (error: unknown) {
            showError(error);
          }
        }}
      />
    ),
    delete: async (roleId: string, roleName: string) => {
      return new Promise<void>((resolve, reject) => {
        modals.openConfirmModal({
          title: t('role.delete.title'),
          children: t('role.delete.confirmation', { name: roleName }),
          labels: {
            confirm: t('role.delete.confirm'),
            cancel: t('role.delete.cancel'),
          },
          confirmProps: { color: 'red' },
          centered: true,
          onCancel: () => {
            reject();
          },
          onConfirm: () => {
            deleteRole
              .mutateAsync(roleId)
              .then(() => {
                notifications.show({
                  title: t('common.success'),
                  message: t('role.delete.success_message'),
                  color: 'green',
                });
                resolve();
              })
              .catch((error) => {
                showError(error);
                reject(error);
              });
          },
        });
      });
    },
    update: async (role: RoleResponse) => {
      setRoleToUpdate(role);
      open();
    },
    create: async () => {
      setRoleToUpdate(null);
      open();
    },
  };
}

