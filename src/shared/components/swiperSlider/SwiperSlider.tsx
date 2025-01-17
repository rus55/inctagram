import Image from 'next/image'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from '../../../pages/home/ui/postsHome.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './swiper-slider.scss'

type Props = {
  imagesUrl: ImagesUrlData[]
  postsHome: boolean
}

export const SwiperSlider = ({ imagesUrl, postsHome }: Props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className={'post-single-slider'}
      style={{ height: '100%', width: '100%' }}
    >
      {imagesUrl?.map((image: any, index: number) => {
        if (image.width !== 1440) return null

        return (
          <SwiperSlide
            className={postsHome ? s.img : ''}
            style={{ position: 'relative' }}
            key={index}
          >
            <Image
              style={{ objectFit: 'contain' }}
              priority
              fill
              sizes="70vw"
              src={image.url}
              alt={''}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
