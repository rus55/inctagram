/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import s from './ImageList.module.scss'
import { ImageListUI } from './ImageListUI'

import { useGetPostsQuery } from '@/entities/posts'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'
import { useMediaQuery } from '@/shared/lib/hooks'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { PostViewModal, PostViewSmall } from '@/widgets/postViewModal'

type Props = { userId: number }

export const ImageListWidget = ({ userId }: Props) => {
  const [postId, setPostId] = useState<number>()
  const [images, setImages] = useState<PostDataToComponent[]>([])
  const ref = useRef(null)
  const { data, isLoading, error } = useGetPostsQuery({ userId, postId })
  const { isOpen, openModal, closeModal, modalId } = useModal()
  const searchParams = useSearchParams()
  const isDesktop = useMediaQuery('(min-width: 576px)')

  const postNumber = searchParams?.get('modalId') as string | undefined

  useEffect(() => {
    postNumber && openModal(+postNumber)
  }, [postNumber])

  useEffect(() => {
    const imagesData: PostDataToComponent[] = data?.posts ?? []
    const index = images.findIndex(image => image.id === imagesData[0]?.id)

    if (!data) {
      setImages([])
    } else if (images.length && images[0]?.id < imagesData[0]?.id) {
      setImages(imagesData)
    } else {
      setImages(prev => {
        return index === -1 ? [...prev, ...imagesData] : prev
      })
    }
  }, [data])
  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPostId(images.at(-1)?.id)
        }
      },
      { rootMargin: '200px', threshold: 0.5 }
    )

    ref?.current && observer.observe(ref.current)

    return () => {
      observer && observer.disconnect()
    }
  }, [images])

  return (
    <>
      {isDesktop ? (
        <>
          <div className={s.container}>
            <ImageListUI posts={images} openModal={openModal} />
          </div>
          <div ref={ref} style={{ visibility: 'hidden' }}>
            __________________
          </div>
          {!!modalId && <PostViewModal modalId={modalId} isOpen={isOpen} closeModal={closeModal} />}
        </>
      ) : (
        <>
          {!isOpen && (
            <>
              <div className={s.container}>
                <ImageListUI posts={images} openModal={openModal} />
              </div>
              <div ref={ref} style={{ visibility: 'hidden' }}>
                __________________
              </div>
            </>
          )}
          {!!modalId && isOpen && (
            <PostViewSmall modalId={modalId} isOpen={isOpen} closeModal={closeModal} />
          )}
        </>
      )}
    </>
  )
}
