import React, { ChangeEvent, useRef, useState } from 'react'

import s from './AddPostModal.module.scss'

import { useAppSelector } from '@/app/appStore'
import {
  addNewPhoto,
  removeAllPhotos,
  setOriginalImage,
  updateFilterClass,
  updatePhotos,
} from '@/app/services/cropper-slice'
import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useTranslation } from '@/shared/lib'
import { useErrorText } from '@/shared/lib/hooks'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
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
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [openCloseCrop, setCloseCropModal] = useState(false)
  const { isOpen, openModal, closeModal } = useModal()
  const { selectPhotoHandler, inputRef } = useGeneralInputRefForPost()
  const croppers = useAppSelector(state => state.croppersSlice)
  const { errorText, showErrorText } = useErrorText()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

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

      setImageSrc(imageDataUrl)
      addNewCropper(imageDataUrl)
    }
  }

  const handleBack = () => {
    dispatch(removeAllPhotos())
    setImageSrc(null)
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
  }

  const handleInteractOutsideOfCrop = (event: Event) => {
    event.preventDefault()
    imageSrc && setCloseCropModal(true)
  }
  const handleSavePost = () => {
    closePostModal()
    setCloseCropModal(false)
  }

  return (
    <>
      <CloseCrop
        openCloseCrop={openCloseCrop}
        closeCrop={() => setCloseCropModal(false)}
        onDiscard={() => setCloseCropModal(false)}
        savePhotoInDraft={handleSavePost}
      />
      <Modal
        open={openPostModal}
        size={'md'}
        title={imageSrc ? t.post.crop_modal_title : t.post.post_modal_title}
        onClickNext={handleOpenFilter}
        closePostModal={handleBack}
        buttonText={t.post.button_navigation_text}
        isCropHeader={!!imageSrc}
        showCloseButton={!imageSrc}
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
          />

          {!isOpen && imageSrc ? (
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

              <Button
                variant={'primary'}
                style={{ marginBottom: '24px', width: '168px' }}
                onClick={selectPhotoHandler}
              >
                {t.post.select_button}
              </Button>
              <Button variant={'outline'} style={{ width: '170px' }}>
                {t.post.draft_button}
              </Button>
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
