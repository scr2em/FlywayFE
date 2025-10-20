import { Modal } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { CreateOrganizationForm } from './CreateOrganizationForm';

interface CreateOrganizationModalProps {
  opened: boolean;
  onClose: () => void;
}

export function CreateOrganizationModal({ opened, onClose }: CreateOrganizationModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('organization.create.modal_title')}
      centered
      size="lg"
    >
      <CreateOrganizationForm />
    </Modal>
  );
}

