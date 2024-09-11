import React, { useState, useCallback, ChangeEvent, useRef, useEffect } from 'react'

import Cropper from 'react-easy-crop'

import s from '../AddProfilePhotoModal.module.scss'

import getCroppedImg from './crropUtils'

import { setAlert } from '@/application/services'
import { clearLocalUserData } from '@/entities/auth'
import { useSavePhotoMutation } from '@/entities/profile/api/profileApi'
import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { SliderDemo } from '@/shared/components/slider'
import { useAppDispatch, useFetchLoader, useTranslation } from '@/shared/lib'
import { useErrorText } from '@/shared/lib/hooks'
import { useAuth } from '@/shared/lib/hooks/useAuth'

type Props = {
  isOpen: boolean
  closeModal: () => void
}
export type CroppedAreaPixel = {
  x: number
  y: number
  width: number
  height: number
} | null

export const AddAvatarModalWitOutRotation = ({ isOpen, closeModal }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixel>(null)

  const { accessToken } = useAuth()
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const { errorText, showErrorText } = useErrorText()
  const [savePhoto, { error, isLoading }] = useSavePhotoMutation()
  const [isButtonDisable, setButtonDisable] = useState(false)

  useEffect(() => {
    if (error) {
      dispatch(setAlert({ message: t.profile.auth_error, variant: 'error' }))
      dispatch(clearLocalUserData())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])
  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: CroppedAreaPixel) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }
  const handleZoomIn = () => {
    setZoom(zoom + 0.1)
  }

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.1)
    }
  }
  const saveP = async () => {
    setButtonDisable(true)
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)

    if (croppedImage) {
      try {
        const response = await fetch(croppedImage)

        if (!response.ok) {
          throw new Error(`Failed to fetch image. Status: ${response.status}`)
        }

        const blob = await response.blob()
        const croppedFile = new File([blob], 'cropped-image.jpg', { type: blob.type })

        savePhoto({ profilePhoto: croppedFile, accessToken })
      } catch (error) {
        console.error('Error converting and sending the cropped image:', error)
      }
    }
    closeModal()

    setImageSrc(null)
    showErrorText('')
    setZoom(1)
    setButtonDisable(false)
  }

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]
      const acceptedTypes = ['image/jpeg', 'image/png']
      const maxSizeBytes = 10 * 1024 * 1024

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
    }
  }

  const readFile = (file: File) => {
    return new Promise<string>(resolve => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }
  const customStyles = {
    style: {
      containerStyle: {
        backgroundColor: '#171717',
        backgroundPosition: 'center',
      },

      cropAreaStyle: {
        border: 'none',
      },
    },
  }
  const size = {
    width: 250,
    height: 250,
  }
  const handleCloseModal = () => {
    closeModal()
    setImageSrc(null)
    showErrorText('')
    setZoom(1)
  }

  useFetchLoader(isLoading)

  return (
    <Modal
      open={isOpen}
      size={'md'}
      title={t.add_profile_photo.add_profile_photo_text}
      onClose={handleCloseModal}
    >
      <div>
        <div>
          {imageSrc ? (
            <>
              <div className={s.cropContainer}>
                <div className={s.profilePhotoBlock}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    {...customStyles}
                    cropSize={size}
                  />
                  <div
                    style={{
                      display: 'flex',
                      position: 'absolute',
                      width: '100%',
                      top: '88%',
                      padding: '0 1%',
                      opacity: '0.7',
                    }}
                  >
                    <Button onClick={handleZoomOut} variant={'link'} style={{ fontSize: '21px' }}>
                      -
                    </Button>
                    <SliderDemo values={[zoom]} onChange={handleZoomChange} />

                    <Button
                      onClick={handleZoomIn}
                      variant={'link'}
                      style={{ fontSize: '21px', outline: 'none' }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className={s.buttonBox}>
                <Button
                  variant={'primary'}
                  className={s.buttons}
                  onClick={saveP}
                  disabled={isButtonDisable}
                >
                  {t.add_profile_photo.save_button}
                </Button>
              </div>
            </>
          ) : (
            <div className={s.box}>
              {errorText && (
                <div className={s.errorText}>
                  <strong>{t.add_profile_photo.error}</strong>
                  {errorText}
                </div>
              )}
              <div className={s.defaultProfilePhotoBlock}>
                <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
              </div>
              <Button variant={'primary'} className={s.buttonPhoto} onClick={selectPhotoHandler}>
                {t.add_profile_photo.text_of_button_select_from_comp}
              </Button>
            </div>
          )}
        </div>
        <input
          accept={'image/jpeg, image/png'}
          onChange={onFileChange}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
    </Modal>
  )
}
