import React, { ChangeEvent, useEffect, useState } from 'react'

import Image from 'next/image'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CropperState } from '@/app/services/cropper-slice'
import { setTextOfTextarea } from '@/app/services/post-slice'
import { useGetProfileQuery } from '@/entities/profile'
import { IconUser } from '@/shared/assets'
import { Input, Textarea, Typography } from '@/shared/components'
import { useAppDispatch, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import s from '@/widgets/addPostModal/publicationModal/PublicationModal.module.scss'
type Props = {
  photos: CropperState[]
}
export const PublicationData = ({ photos }: Props) => {
  const { userId, accessToken } = useAuth()
  const dispatch = useAppDispatch()

  const [editedPhotos, setEditedPhotos] = useState<CropperState[]>([])
  const { data: profileData } = useGetProfileQuery({ profileId: +userId, accessToken })
  const [wordCount, setWordCount] = useState(0)
  const { t } = useTranslation()
  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    dispatch(setTextOfTextarea(value))

    setWordCount(value.length)
  }

  useEffect(() => {
    setEditedPhotos(photos)
  }, [photos])

  return (
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
            {editedPhotos.map(photo => {
              return (
                <SwiperSlide key={photo.id} className={s.swiper}>
                  <div className={s.imageBox}>
                    <Image
                      src={photo.image}
                      style={{ filter: photo.filterClass, objectFit: 'contain' }}
                      priority
                      fill
                      alt={''}
                    />
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
            {profileData?.avatars[0] ? (
              <img src={profileData.avatars[0].url} className={s.avatar} alt={'postImg'} />
            ) : (
              <IconUser className={s.avatar} />
            )}
            <Typography variant={'h3'}>{profileData?.userName}</Typography>
          </div>

          <Textarea
            label={t.post.label_of_textarea}
            style={{ height: '80px', resize: 'none' }}
            placeholder={t.post.placeholder_of_textarea}
            onChange={handleChangeText}
            className={s.textArea}
            maxLength={500}
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
  )
}
