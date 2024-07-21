import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './Post.module.scss'

import { useBanUserMutation } from '@/entities/users/api/usersApi'
import { TimeAgo, Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import ExpandableText from '@/widgets/superAdmin/postsList/post/ExpandableText'
import { OwnerPost } from '@/widgets/superAdmin/postsList/post/OwnerPost'

type Props = {
  profileAvatar: Avatar
  postId: number
  ownerId: number
  description: string
  imagesUrl: ImagePost[]
  userName: string
  firstName: string
  lastName: string
  updatedAt: string
}

const Post = ({ ownerId, profileAvatar, imagesUrl, description, userName, updatedAt }: Props) => {
  const { t } = useTranslation()

  const [isExpanded, setIsExpanded] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      !menuRef.current?.contains(e.target as Node) && setIsExpanded(false)
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [isExpanded])

  const [banUser, { isLoading: isLoadingBan }] = useBanUserMutation()

  return (
    <>
      {imagesUrl.length ? (
        <div className={s.container}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            className={'post-single-slider'}
          >
            {imagesUrl?.map((image, index) => (
              <SwiperSlide key={index} className={s.item}>
                <Image
                  style={{ height: '100%', width: '100%', objectFit: 'fill' }}
                  priority
                  width={image.width}
                  height={image.height}
                  src={image.url}
                  alt={''}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={`${s.wrapper} ${isExpanded && s.expanded}`}>
            <div className={s.sticky} ref={menuRef}>
              <OwnerPost
                isLoadingBan={isLoadingBan}
                userId={ownerId}
                banUser={banUser}
                avatar={profileAvatar}
                userName={userName}
              />
              <Typography className={s.timeInfo} variant="semi-bold_small_text">
                <TimeAgo updatedAt={updatedAt} lg={t.lg} />
              </Typography>
              <div className={s.description}>
                <ExpandableText
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  text={description}
                  maxLength={57}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Typography className="text-center" variant={'h1'}>
          {t.user_info.not_found}
        </Typography>
      )}
    </>
  )
}

export default React.memo(Post)
