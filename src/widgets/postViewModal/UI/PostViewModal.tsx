import { useState } from 'react'

import Image from 'next/image'

import { PostCommentsView } from './PostCommentsView'
import s from './PostViewModal.module.scss'

import { useGetSinglePostQuery } from '@/entities/publicPosts'
import { SwiperSlider } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useErrorHandler, useFetchLoader, useTranslation } from '@/shared/lib'

type Props = {
  postId: number
  isOpen: boolean
  closeModal: () => void
}

export const PostViewModal = ({ postId, isOpen, closeModal }: Props) => {
  const { data, error, isLoading } = useGetSinglePostQuery(postId)
  const [modalType, setModalType] = useState<'view' | 'edit'>('view')
  const { t } = useTranslation()

  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)

  return (
    <Modal
      open={isOpen}
      size={'lg'}
      title={modalType === 'edit' ? t.post_view.edit : ''}
      onClose={closeModal}
    >
      <div className={s.modalContent}>
        {modalType === 'view' && (
          <>
            <div className={s.imageContainer}>
              {data && data.id === postId && <SwiperSlider imagesUrl={data.images} />}
            </div>
            <div className={s.commentsContainer}>
              {data && (
                <PostCommentsView
                  setModalType={setModalType}
                  ownerId={data.ownerId}
                  avatarOwner={data.avatarOwner}
                  firstName={data.owner.firstName}
                  lastName={data.owner.lastName}
                  description={data.description}
                  updatedAt={data.updatedAt}
                />
              )}
            </div>
          </>
        )}
        {modalType === 'edit' && (
          <>
            <div className={s.imageContainer}>
              {data && data.id === postId && (
                <Image src={data.images[0].url} alt={data.description} width={490} height={400} />
              )}
            </div>
            <div className={s.commentsContainer}>Edit description</div>
          </>
        )}
      </div>
    </Modal>
  )
}
