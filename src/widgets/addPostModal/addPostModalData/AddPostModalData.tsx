/* eslint-disable prettier/prettier */
import React from 'react'

import Cropper from 'react-easy-crop'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import '@/shared/assets/swiperStyle/post-images-slider.scss'
import { useAppSelector } from '@/app/appStore'
import {
  updateAspect,
  updateCrop,
  updateCroppedAreaPixels,
  updateZoom,
} from '@/app/services/cropper-slice'
import { useAppDispatch } from '@/shared/lib'
import s from '@/widgets/addPostModal/AddPostModal.module.scss'
import {
  AddNewPhotoTool,
  PostPhotoModificationTools,
} from '@/widgets/addPostModal/modificationTools/tools/post-modification-tools'
import { CroppedAreaPixel } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/AddAvatarModalWithoutRotation'
type Props = {
  selectPhoto: () => void
  closePostModal: () => void
  setImageScr: (img: string | null) => void
}
export const AddPostModalData = ({ selectPhoto, closePostModal, setImageScr }: Props) => {
  const images = useAppSelector(state => state.croppersSlice)
  const dispatch = useAppDispatch()
  const handleZoomChange = (value: number[], id: string) => {
    dispatch(updateZoom({ zoom: value[0], id }))
  }

  const onCropChange = (newCrop: Record<'x' | 'y', number>, id: string) => {
    dispatch(updateCrop({ crop: newCrop, id }))
  }

  const onZoomChange = (zoom: number, id: string) => {
    dispatch(updateZoom({ zoom, id }))
  }
  const handleAspectChange = (selectedAspect: string, id: string) => {
    switch (selectedAspect) {
      case 'vertical':
        dispatch(updateAspect({ aspect: 4 / 9, id }))
        break
      case 'horizontal':
        dispatch(updateAspect({ aspect: 16 / 9, id }))
        break
      default:
        dispatch(updateAspect({ aspect: 1, id }))
    }
  }
  const handleOnCropComplete =
    (id: string) =>
    (_croppedArea: Record<'x' | 'y', number>, croppedAreaPixels: CroppedAreaPixel) => {
      dispatch(updateCroppedAreaPixels({ croppedAreaPixels: croppedAreaPixels, id }))
    }
  const customStyles = {
    style: {
      containerStyle: {
        backgroundColor: '#333',
        backgroundPosition: 'center',
      },

      cropAreaStyle: {
        border: 'none',
      },
    },
  }

  return (
    <div className={s.menuBox}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        className={'post-images-slider'}
        navigation
        pagination={{ clickable: true }}
        allowTouchMove={false}
        touchStartPreventDefault={false}
        noSwiping={false}
      >
        {images.map(cropper => {
          return (
            <SwiperSlide key={cropper.id} className={s.swiper}>
              <div className={s.imageBox}>
                <Cropper
                  onCropChange={crop => onCropChange(crop, cropper.id)}
                  onZoomChange={zoom => onZoomChange(zoom, cropper.id)}
                  onCropComplete={handleOnCropComplete(cropper.id)}
                  crop={cropper.crop}
                  image={cropper.image}
                  showGrid={false}
                  aspect={cropper.aspect}
                  zoom={cropper.zoom}
                  {...customStyles}
                />
              </div>
              <PostPhotoModificationTools
                zoomValue={[cropper.zoom]}
                onChange={zoom => handleZoomChange(zoom, cropper.id)}
                imageId={cropper.id}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <AddNewPhotoTool
        selectNewPhoto={selectPhoto}
        closePostModal={closePostModal}
        setImageScr={setImageScr}
      />
    </div>
  )
}
