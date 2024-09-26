import React from 'react'

import Image from 'next/image'

import s from './FiltersTool.module.scss'

import { updateFilterClass } from '@/app/services/cropper-slice'
import { Typography } from '@/shared/components'
import { useAppDispatch } from '@/shared/lib'

type Props = {
  photo: any
  idOfImage: string
}
export const filters = [
  {
    name: 'Normal',
    class: 'filter-normal',
    style: 'none',
  },
  {
    name: 'Clarendon',
    class: 'filter-clarendon',
    style: 'sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)',
  },

  {
    name: 'Gingham',
    class: 'filter-gingham',
    style: 'hue-rotate(150deg)',
  },

  {
    name: 'Lark',
    class: 'filter-lark',
    style: 'sepia(.25) contrast(1.2) brightness(1.3) saturate(1.25)',
  },
  {
    name: 'Lo-fi',
    class: 'filter-lofi',
    style: 'saturate(1.1) contrast(1.5)',
  },
  {
    name: 'Reyes',
    class: 'filter-reyes',
    style: 'sepia(.75) contrast(.75) brightness(1.25) saturate(1.4)',
  },
  {
    name: 'Maven',
    class: 'filter-maven',
    style: 'contrast(200%)',
  },
  {
    name: 'Mayfair',
    class: 'filter-mayfair',
    style: 'contrast(1.1) brightness(1.15) saturate(1.1)',
  },
  {
    name: 'Moon',
    class: 'filter-moon',
    style: 'brightness(1.4) contrast(.95) saturate(0) sepia(.35)',
  },
]
export const FiltersTool = ({ photo, idOfImage }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div className={s.scrollImg}>
      {filters.map(filter => {
        return (
          <div key={filter.name} className={s.filterBox}>
            <div
              onClick={() => {
                dispatch(updateFilterClass({ id: idOfImage, filterClass: filter.style }))
              }}
              style={{ position: 'relative' }}
            >
              <Image
                src={photo ? photo : ''}
                alt={filter.name}
                style={{
                  objectFit: 'contain',
                  filter: filter.style,
                }}
                priority
                width={100}
                height={100}
                className={s.filterImg}
              />

              <Typography
                variant={'regular_text_16'}
                style={{ textAlign: 'center' }}
                className={s.text}
              >
                {filter.name}
              </Typography>
            </div>
          </div>
        )
      })}
    </div>
  )
}
