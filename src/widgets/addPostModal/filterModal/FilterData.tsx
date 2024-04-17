import React, { FC, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { A11y, EffectCube, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import 'swiper/scss/effect-cube'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import { useAppSelector } from '@/app/appStore'
import s from '@/widgets/addPostModal/filterModal/FilterModal.module.scss'
import { FiltersTool } from '@/widgets/addPostModal/filterModal/filtterInctagramTool'
type Props = {
  isOpenFilter: boolean
}
export const FilteringData: FC<Props> = ({ isOpenFilter }) => {
  const croppers = useAppSelector(state => state.croppersSlice)
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (isOpenFilter) {
      setCurrentPostIndex(0)
    }
  }, [isOpenFilter])

  const handleSlideChange = (swiper: any) => {
    setCurrentPostIndex(swiper.activeIndex)
  }

  return (
    <div className={s.filterBox}>
      <div className={s.swiperSlideBox}>
        <Swiper
          modules={[Navigation, Pagination, A11y, EffectCube]}
          className={'post-images-slider'}
          pagination={{ clickable: true }}
          navigation
          effect={'cube'}
          grabCursor={true}
          onSlideChange={handleSlideChange}
        >
          {croppers.map(post => {
            return (
              <SwiperSlide key={post.id}>
                <div className={s.box}>
                  <Image
                    src={post.image}
                    alt={''}
                    style={{
                      filter: post.filterClass,
                      objectFit: 'contain',
                    }}
                    fill
                    className={s.postImg}
                    ref={imageRef}
                  />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <FiltersTool
        photo={croppers[currentPostIndex]?.image}
        idOfImage={croppers[currentPostIndex]?.id}
      />
    </div>
  )
}
