import { ModalContentUI } from '../../index'

import s from './PostViewModal.module.scss'

import { Modal } from '@/shared/components/modals'

type Props = {
  isOpen: boolean
  closeModal: () => void
  data?: PostDataType
}

export const PostViewModalSSR = ({ isOpen, closeModal, data }: Props) => {
  return (
    <Modal
      open={isOpen}
      size={'xl'}
      isHeaderDisabled
      isPost={true}
      onClose={closeModal}
      className={s.modal}
    >
      {data && <ModalContentUI data={data} />}
    </Modal>
  )
}
