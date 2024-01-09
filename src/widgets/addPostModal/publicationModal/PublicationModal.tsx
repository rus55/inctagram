import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './PublicationModal.module.scss'

import { setAlert } from '@/app/services'
import { CropperState, removeAllPhotos, updatePhotos } from '@/app/services/cropper-slice'
import { setTextOfTextarea } from '@/app/services/post-slice'
import {
  usePublishPostsImageMutation,
  usePublishPostsMutation,
} from '@/entities/posts/api/postsApi'
import { useGetProfileQuery } from '@/entities/profile'
import { Input, Textarea, Typography } from '@/shared/components'
import 'swiper/scss/effect-cube'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useAppSelector, useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { CloseCrop } from '@/widgets/addPostModal/CloseCrop'
import { createImage } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/crropUtils'

type Props = {
  isOpen: boolean
  photos: CropperState[]
  onPrevStep: () => void
  discardAll: () => void
}
export const PublicationModal: FC<Props> = ({ isOpen, photos, onPrevStep, discardAll }) => {
  const { userId, accessToken } = useAuth()
  const [openCloseModal, setCloseModal] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const text = useAppSelector(state => state.postSlice.textOfTextarea)
  const { data: profileData } = useGetProfileQuery({ profileId: +userId, accessToken })
  const [publishDescription, { isLoading: isPostLoading }] = usePublishPostsMutation()
  const [publishPostImage, { isLoading }] = usePublishPostsImageMutation()
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    dispatch(setTextOfTextarea(value))

    setWordCount(value.length)
  }

  useFetchLoader(isPostLoading)
  const handlePublish = async () => {
    const croppedImages = await Promise.all(
      photos.map(async cropper => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const modifiedImage = await createImage(cropper.image)

        canvas.width = modifiedImage.width
        canvas.height = modifiedImage.height

        ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height)

        if (ctx) ctx.filter = cropper.filterClass

        ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height)

        const newImage = new Image()

        newImage.src = canvas.toDataURL()

        const base64Data = canvas.toDataURL('image/jpeg')

        return {
          id: cropper.id,
          image: base64Data,
          croppedAreaPixels: cropper.croppedAreaPixels,
        }
      })
    )

    await dispatch(updatePhotos(croppedImages))

    await publishPostImage({ postsPhoto: croppedImages, accessToken })
      .unwrap()
      .then(res => {
        const imgId = res.images[0].uploadId

        publishDescription({
          description: text,
          childrenMetadata: [{ uploadId: imgId }],
          accessToken,
        })
      })
      .then(() => {
        discardAll()
        onPrevStep()
        dispatch(removeAllPhotos())
      })
      .catch(error => {
        dispatch(setAlert({ variant: 'error', message: error }))
      })
  }
  const handleInteractOutPublishModal = () => {
    setCloseModal(true)
  }
  const handleDiscard = () => {
    setCloseModal(false)
    discardAll()
  }

  return (
    <>
      <CloseCrop
        openCloseCrop={openCloseModal}
        closeCrop={() => setCloseModal(false)}
        onDiscard={handleDiscard}
      />
      <Modal
        open={isOpen}
        size={windowSize[0] == 768 ? 'md' : 'lg'}
        isCropHeader={true}
        onClickNext={handlePublish}
        closePostModal={onPrevStep}
        buttonText={t.post.publish_button}
        title={t.post.publication_modal}
        showCloseButton={false}
        isPost={true}
        onInteractOutside={handleInteractOutPublishModal}
        disableButton={isLoading}
      >
        <div className={s.modBox}>
          <div className={s.imageContainer}>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              className={'post-images-slider'}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
            >
              <div>
                {photos.map(photo => {
                  return (
                    <SwiperSlide key={photo.id} className={s.swiper}>
                      <div className={s.imageBox}>
                        <img src={photo.image} style={{ filter: photo.filterClass }} alt={''} />
                      </div>
                    </SwiperSlide>
                  )
                })}
              </div>
            </Swiper>
          </div>

          <div className={s.dataBox}>
            <div className={s.textareaBox}>
              <div className={s.avaAndUserName}>
                <img src={profileData?.avatars[0]?.url} className={s.avatar} alt={'postImg'} />
                <Typography variant={'h3'}>{profileData?.userName}</Typography>
              </div>

              <Textarea
                label={t.post.label_of_textarea}
                style={{ height: '80px', resize: 'none' }}
                placeholder={t.post.placeholder_of_textarea}
                onChange={handleChangeText}
                disabled={wordCount === 500}
                className={s.textArea}
              />
              <Typography variant={'small_text'} style={{ textAlign: 'end', color: '#8d9094' }}>
                {wordCount}/500
              </Typography>
            </div>
            <div className={s.locationBox}>
              <Input
                label={t.post.label_of_input}
                type={`location`}
                style={{ border: '1px solid #4C4C4C', background: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}