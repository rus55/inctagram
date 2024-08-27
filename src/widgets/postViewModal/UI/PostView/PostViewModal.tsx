import { useState } from 'react'

import { ModalContentWithEditUI } from '../../index'

import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'

type Props = {
  modalId: number
  isOpen: boolean
  closeModal: () => void
}

export const PostViewModal = ({ modalId, isOpen, closeModal }: Props) => {
  const [modalType, setModalType] = useState<'view' | 'edit'>('view')
  const { t } = useTranslation()
  const [isPostEdit, setIsPostEdit] = useState(false)

  const {
    openModal: openEditCloseModal,
    closeModal: closeEditCloseModal,
    isOpen: isEditModalOpen,
  } = useModal()

  const handleCloseEditConfirmModal = () => {
    setModalType('view')
    closeEditCloseModal()
  }

  return (
    <Modal
      open={isOpen}
      size={'xl'}
      isHeaderDisabled={modalType === 'view'}
      isPost={true}
      title={modalType === 'edit' ? t.post_view.edit : ''}
      onClose={
        // eslint-disable-next-line no-nested-ternary
        modalType === 'edit'
          ? !isPostEdit
            ? openEditCloseModal
            : handleCloseEditConfirmModal
          : closeModal
      }
    >
      <ModalContentWithEditUI
        modalId={modalId}
        closeModal={closeModal}
        isPostEdit={isPostEdit}
        setIsPostEdit={setIsPostEdit}
        modalType={modalType}
        setModalType={setModalType}
        handleCloseEditConfirmModal={handleCloseEditConfirmModal}
        openEditCloseModal={openEditCloseModal}
        closeEditCloseModal={closeEditCloseModal}
        isEditModalOpen={isEditModalOpen}
      />
    </Modal>
  )
}
