/* eslint-disable prettier/prettier */
import React, { useState } from 'react'

import Image, { type ImageProps } from 'next/image'

import s from './imageCard.module.scss'

import { useFetchLoader } from '@/shared/lib'

type Props = ImageProps & {
  postId: number
  cardClassName?: string
  openModal?: (postId: number) => void
}

export const ImageCard = ({ postId, src, alt, cardClassName, openModal }: Props) => {
  const [loading, setLoading] = useState(true)

  useFetchLoader(loading)

  return (
    <>
      <div
        className={s.image}
        onClick={
          openModal
            ? () => {
                openModal(postId)
              }
            : () => null
        }
      >
        <Image
          src={src}
          style={{ objectFit: 'contain' }}
          className={cardClassName}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          priority={true}
          alt={alt}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </>
  )
}
