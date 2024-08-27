import { useState } from 'react'

import { ModalContentWithEditUI } from '../../index'

import s from './PostViewModal.module.scss'

import { CloseIcon } from '@/shared/assets'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'

type Props = {
  modalId: number
  isOpen: boolean
  closeModal: () => void
}

export const PostViewSmall = ({ modalId, isOpen, closeModal }: Props) => {
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
    <>
      {modalType === 'edit' ? (
        <Modal
          open={isOpen}
          size={'xl'}
          isPost={true}
          title={t.post_view.edit}
          onClose={!isPostEdit ? openEditCloseModal : handleCloseEditConfirmModal}
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
      ) : (
        <>
          <div onClick={closeModal} className={s.closeWrapper}>
            <div className={s.closeButton}>
              <CloseIcon />
            </div>
          </div>
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
          <br />
        </>
      )}
    </>
  )
}
