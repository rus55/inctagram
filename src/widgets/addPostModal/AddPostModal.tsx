import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import s from './AddPostModal.module.scss'

import { useAppSelector } from '@/application/appStore'
import {
  addNewPhoto,
  removeAllPhotos,
  setOriginalImage,
  updateFilterClass,
  updatePhotos,
} from '@/application/services/cropper-slice'
import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useTranslation } from '@/shared/lib'
import { useErrorText } from '@/shared/lib/hooks'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import useIndexedDB from '@/shared/lib/hooks/useIndexedDB'
import { AddPostModalData } from '@/widgets/addPostModal/addPostModalData'
import { CloseCrop } from '@/widgets/addPostModal/CloseCrop'
import { FilterPublicationModal } from '@/widgets/addPostModal/filterModal/FilterPublicatioModal'
import getCroppedImg from '@/widgets/addProfilePhoto/addAvaWithoutRotation/crropUtils'

type Props = {
  closePostModal: () => void
  openPostModal: boolean
}
export const useGeneralInputRefForPost = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return {
    inputRef,
    selectPhotoHandler,
  }
}

export const readFile = (file: File) => {
  return new Promise<string>(resolve => {
    const reader = new FileReader()

    reader.addEventListener('load', () => resolve(reader.result as string))
    reader.readAsDataURL(file)
  })
}
export const AddPostModal = ({ openPostModal, closePostModal }: Props) => {
  const { t } = useTranslation()

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [openCloseCrop, setCloseCropModal] = useState(false)
  const [isDraft, setIsDraft] = useState<boolean>(false)
  const [modalPost, setModalPost] = useState<boolean>(false)

  const { isOpen, openModal, closeModal } = useModal()
  const { addPhoto, deletePhotos, getAllPhotos, isAddedPhoto } = useIndexedDB('photoGalleryDB', {
    photoStore: 'photos',
  })
  const { selectPhotoHandler, inputRef } = useGeneralInputRefForPost()
  const croppers = useAppSelector(state => state.croppersSlice)
  const { errorText, showErrorText } = useErrorText()
  const dispatch = useAppDispatch()

  getAllPhotos(photos => {
    if (photos.length) {
      setIsDraft(true)
    }
  })

  const handleCloseFilter = () => {
    croppers.forEach(cropper => {
      dispatch(
        updatePhotos([
          {
            id: cropper.id,
            image: cropper.originalImage,
            croppedAreaPixels: cropper.croppedAreaPixels,
          },
        ])
      )
      dispatch(updateFilterClass({ id: cropper.id, filterClass: '' }))
    })
    closeModal()
  }

  const addNewCropper = (image: string) => {
    dispatch(addNewPhoto(image))
  }

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]
      const acceptedTypes = ['image/jpeg', 'image/png']
      const maxSizeBytes = 20 * 1024 * 1024

      if (!acceptedTypes.includes(file.type)) {
        showErrorText(t.add_profile_photo.error_type_of_photo)

        return
      }

      if (file.size > maxSizeBytes) {
        showErrorText(t.add_profile_photo.error_size_photo)

        return
      }
      let imageDataUrl: any = await readFile(file)

      addPhoto(imageDataUrl)

      addNewCropper(imageDataUrl)
      setImageSrc(imageDataUrl)
      setModalPost(true)
      setIsDraft(true)

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const handleBack = () => {
    if (!croppers[0].originalImage) {
      setImageSrc(null)
      setIsDraft(false)
      setModalPost(false)
    } else {
      dispatch(removeAllPhotos())
      deletePhotos()
      setModalPost(false)
      setIsDraft(false)
    }
  }
  const handleClosePostCropModal = () => {
    closePostModal()
  }
  const addNewCropperForFilter = async () => {
    const croppedImages = await Promise.all(
      croppers.map(async cropper => {
        const croppedImage = await getCroppedImg(cropper.image, cropper.croppedAreaPixels)

        return {
          id: cropper.id,
          image: croppedImage as string,
          croppedAreaPixels: cropper.croppedAreaPixels,
        }
      })
    )

    dispatch(updatePhotos(croppedImages))
  }

  const handleOpenFilter = async () => {
    croppers.forEach(cropper => {
      dispatch(setOriginalImage(cropper.image))
    })
    await addNewCropperForFilter()
    openModal()
    setModalPost(false)
    setIsDraft(true)
  }

  const handleInteractOutsideOfCrop = (event: Event) => {
    event.preventDefault()
    imageSrc && setCloseCropModal(true)
    isAddedPhoto && modalPost && setCloseCropModal(true)
  }

  const draftPhotoHandler = () => {
    setModalPost(true)
    setIsDraft(true)
  }

  const onDiscordHandle = () => {
    deletePhotos()
    dispatch(removeAllPhotos())
    setImageSrc(null)
    setModalPost(false)
    setIsDraft(false)
    closePostModal()
    handleCloseFilter()
    setCloseCropModal(false)
  }
  const handleSavePost = () => {
    setImageSrc(null)
    setModalPost(false)
    closePostModal()
    setCloseCropModal(false)
  }

  const onButtonChangePhoto = () => {
    selectPhotoHandler()
    setModalPost(true)
    closeModal()
  }

  useEffect(() => {
    if (!croppers.length) {
      getAllPhotos(photos => {
        photos.forEach(item => {
          if (item) {
            setImageSrc(item.imageUrl)
            setIsDraft(true)
          }
        })
      })
    }
  }, [])

  return (
    <>
      <CloseCrop
        openCloseCrop={openCloseCrop}
        closeCrop={() => setCloseCropModal(false)}
        onDiscard={onDiscordHandle}
        savePhotoInDraft={handleSavePost}
      />
      <Modal
        open={openPostModal}
        size={'md'}
        title={modalPost ? t.post.crop_modal_title : t.post.post_modal_title}
        onClickNext={handleOpenFilter}
        closePostModal={handleBack}
        buttonText={t.post.button_navigation_text}
        isCropHeader={modalPost}
        showCloseButton={!modalPost}
        isPost
        onClose={closePostModal}
        onInteractOutside={handleInteractOutsideOfCrop}
      >
        <>
          <FilterPublicationModal
            isOpenFilter={isOpen}
            closeFilter={handleCloseFilter}
            closeCroppingModal={handleClosePostCropModal}
            setImageScr={setImageSrc}
            setIsDraft={setIsDraft}
            setModalPost={setModalPost}
          />

          {!isOpen && modalPost ? (
            <AddPostModalData
              selectPhoto={selectPhotoHandler}
              closePostModal={closePostModal}
              setImageScr={setImageSrc}
            />
          ) : (
            <div className={s.modalBox}>
              {errorText && (
                <div className={s.errorText}>
                  <strong>{t.add_profile_photo.error}</strong>
                  {errorText}
                </div>
              )}
              <div className={s.box}>
                <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
              </div>

              {!isDraft ? (
                <Button
                  variant={'primary'}
                  style={{ marginBottom: '24px', width: '168px' }}
                  onClick={onButtonChangePhoto}
                >
                  {t.post.select_button}
                </Button>
              ) : (
                <Button variant={'outline'} style={{ width: '170px' }} onClick={draftPhotoHandler}>
                  {t.post.draft_button}
                </Button>
              )}
            </div>
          )}
          <input
            accept={'image/jpeg, image/png'}
            onChange={onFileChange}
            ref={inputRef}
            style={{ display: 'none' }}
            type={'file'}
          />
        </>
      </Modal>
    </>
  )
}
