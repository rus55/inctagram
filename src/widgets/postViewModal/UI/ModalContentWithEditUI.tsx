import { Dispatch, SetStateAction } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { PostCommentsView, PostModalHeader } from './PostCommentsView'
import { PostEdit } from './PostEdit'
import s from './PostViewModal.module.scss'

import { postsApi, useDeletePostMutation } from '@/entities/posts'
import { publicPostsApi, useGetSinglePostQuery } from '@/entities/publicPosts'
import { SwiperSlider, Typography } from '@/shared/components'
import { ConfirmModal } from '@/shared/components/modals'
import { useAppDispatch, useErrorHandler, useFetchLoader, useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { useAuth } from '@/shared/lib/hooks/useAuth'

type Props = {
  modalId: number
  closeModal: () => void
  isPostEdit: boolean
  setIsPostEdit: Dispatch<SetStateAction<boolean>>
  openEditCloseModal: (modalId?: number | undefined) => void
  closeEditCloseModal: () => void
  isEditModalOpen: boolean
  modalType: 'view' | 'edit'
  setModalType: Dispatch<SetStateAction<'view' | 'edit'>>
  handleCloseEditConfirmModal: () => void
}

export const ModalContentWithEditUI = ({
  modalId,
  closeModal,
  isPostEdit,
  setIsPostEdit,
  handleCloseEditConfirmModal,
  modalType,
  setModalType,
  openEditCloseModal,
  closeEditCloseModal,
  isEditModalOpen,
}: Props) => {
  const { data, error, isLoading } = useGetSinglePostQuery(modalId)
  const { t } = useTranslation()
  const [deletePost, { isLoading: deleteLoading, error: deleteError }] = useDeletePostMutation()
  const isSSR = useRouter().asPath.includes('public-posts')

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal()

  useFetchLoader(isLoading || deleteLoading)
  useErrorHandler((error || deleteError) as CustomerError)
  const { accessToken } = useAuth()
  const dispatch = useAppDispatch()

  const handleDeletePost = () => {
    deletePost({ postId: modalId, accessToken })
      .unwrap()
      .then(async () => {
        await new Promise(res => setTimeout(res, 1000))
        closeModal()
        dispatch(publicPostsApi.util.resetApiState())
        dispatch(postsApi.util.resetApiState())
      })
  }

  return (
    <>
      <ConfirmModal
        isOpen={isDeleteOpen}
        title={t.post_view.delete}
        confirmMessage={t.post_view.delete_confirm}
        onClose={closeDeleteModal}
        yes={handleDeletePost}
        no={closeDeleteModal}
      />
      <ConfirmModal
        isOpen={isEditModalOpen}
        title={t.post_view.close_edit_title}
        confirmMessage={t.post_view.close_edit_confirm}
        onClose={handleCloseEditConfirmModal}
        yes={handleCloseEditConfirmModal}
        no={closeEditCloseModal}
      />
      <div className={s.modalContent}>
        {modalType === 'view' && (
          <>
            {data && (
              <div className={s.headerOnTop}>
                <PostModalHeader
                  ownerId={data.ownerId}
                  avatarOwner={data.avatarOwner}
                  userName={data.userName}
                  isSSR={isSSR}
                  setModalType={setModalType}
                  openDeleteModal={openDeleteModal}
                />
              </div>
            )}
            <div className={s.imageContainer}>
              {data && data.id === modalId && <SwiperSlider imagesUrl={data.images} />}
            </div>
            <div className={s.commentsContainer}>
              {data && (
                <PostCommentsView
                  id={data.id}
                  isSSR={isSSR}
                  setModalType={setModalType}
                  ownerId={data.ownerId}
                  avatarOwner={data.avatarOwner}
                  userName={data.userName}
                  description={data.description}
                  updatedAt={data.updatedAt}
                  openDeleteModal={openDeleteModal}
                />
              )}
            </div>
          </>
        )}
        {modalType === 'edit' && (
          <>
            <div>
              {data && data.id === modalId && (
                <Image
                  src={data.images[0].url}
                  alt={data.description}
                  width={320}
                  height={240}
                  className={s.singleImage}
                />
              )}
            </div>
            <div className={s.commentsContainer}>
              {data && (
                <PostEdit
                  isPostEdit={isPostEdit}
                  setIsPostEdit={setIsPostEdit}
                  setModalType={setModalType}
                  ownerId={data.ownerId}
                  avatarOwner={data.avatarOwner}
                  userName={data.userName}
                  description={data.description}
                  postId={data.id}
                  closeModal={openEditCloseModal}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
