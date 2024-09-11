import React, { FC } from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import s from './AddNewPhotoTool.module.scss'

import 'swiper/scss/scrollbar'
import { useAppSelector } from '@/application/appStore'
import { deletePhoto } from '@/application/services/cropper-slice'
import { DefaultProfileImg, IconAdd } from '@/shared/assets'
import { DeleteIcon } from '@/shared/assets/icons/DeleteIcon'
import { Button, CustomDropdown, CustomDropdownItem } from '@/shared/components'
import { useAppDispatch } from '@/shared/lib'

type Props = {
  selectNewPhoto: () => void
  closePostModal: () => void
  setImageScr: (img: string | null) => void
}
const newPhotoTrigger = (
  <div className={s.tool}>
    <DefaultProfileImg style={{ width: '24px', height: '24px' }} />
  </div>
)

export const AddNewPhotoTool: FC<Props> = ({ selectNewPhoto, closePostModal, setImageScr }) => {
  const dispatch = useAppDispatch()
  const photos = useAppSelector(state => state.croppersSlice)

  const handleSelect = (event: Event) => {
    event.preventDefault()
  }
  const countSwiper = photos.length < 2 ? 1 : 2

  const handleDeletePhoto = (index: string) => {
    dispatch(deletePhoto(index))
    if (photos?.length === 1) {
      closePostModal()
      setImageScr(null)
    }
  }

  return (
    <div className={s.boxTool}>
      <CustomDropdown
        trigger={newPhotoTrigger}
        align={'end'}
        side={'top'}
        className={s.box}
        isArrow={false}
        sideOffset={2}
        stayOpen={true}
      >
        <CustomDropdownItem
          className={clsx(photos.length < 2 ? `${s.oneSlide} ${s.newItem}` : s.newItem)}
          onSelect={handleSelect}
          onClick={event => event.preventDefault()}
        >
          <div className={clsx(photos.length < 2 ? `${s.oneImg} ${s.imgs}` : s.imgs)}>
            <Swiper
              modules={[Scrollbar]}
              spaceBetween={1}
              slidesPerView={countSwiper}
              scrollbar={{ draggable: true }}
            >
              {photos?.map(photo => {
                return (
                  <SwiperSlide key={photo.id}>
                    <div className={s.imgs}>
                      <Image src={photo.image} alt={''} width={80} height={82} />
                      <div onClick={() => handleDeletePhoto(photo.id)}>
                        <DeleteIcon
                          style={{
                            position: 'absolute',
                            top: '3%',
                            backgroundColor: '#171717',
                            opacity: '0.8',
                            left: '80%',
                          }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          <Button
            variant={'link'}
            style={{ display: 'flex', alignItems: 'start', height: '100%' }}
            onClick={() => selectNewPhoto()}
            disabled={photos.length === 10}
          >
            <IconAdd style={{ width: '36px', height: '36px' }} />
          </Button>
        </CustomDropdownItem>
      </CustomDropdown>
    </div>
  )
}
