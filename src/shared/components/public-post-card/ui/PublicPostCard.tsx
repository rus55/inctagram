import { FC, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import s from './PublicPostCard.module.scss'

import SmileImg from '@/shared/assets/SmileImg.png'
import { TimeAgo, Typography } from '@/shared/components'
import { ExpandableText } from '@/shared/components/expandable-text'
import { useTranslation } from '@/shared/lib'
import '../../swiperSlider/swiper-slider.scss'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export const PublicPostCard: FC<PublicPostCardProps> = ({
  postId,
  ownerId,
  profileImage,
  imagesUrl,
  description,
  userName,
  updatedAt,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      !menuRef.current?.contains(e.target as Node) && setIsExpanded(false)
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [isExpanded])

  return (
    imagesUrl.length > 0 && (
      <div className={s.container}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          className={'post-single-slider'}
          onClick={() => {
            router.push(`/public-posts/${ownerId}/${postId}`)
          }}
        >
          {imagesUrl?.map((image: any, index: number) => {
            if (image.width !== 1440) return null

            return (
              <SwiperSlide key={index} className={s.item}>
                <Image
                  style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                  priority
                  fill
                  sizes="(min-width: 1280px) 360px, (max-width: 1280px) 240px"
                  src={image.url}
                  alt={''}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className={s.wrapper}>
          <div className={s.sticky} ref={menuRef}>
            <Link href={`/public-posts/${ownerId}`} className={s.mainInfo}>
              {profileImage ? (
                <Image
                  src={profileImage}
                  priority
                  className={s.profileImg}
                  width={0}
                  height={0}
                  alt={''}
                />
              ) : (
                <Image src={SmileImg} className={s.profileImg} width={234} height={240} alt={''} />
              )}
              {userName && (
                <Typography className={s.profileName} variant="bold_text_16">
                  {`${userName}`}
                </Typography>
              )}
            </Link>
            <Typography className={s.timeInfo} variant="semi-bold_small_text">
              <TimeAgo updatedAt={updatedAt} lg={t.lg} />
            </Typography>
            <div className={s.description}>
              <ExpandableText
                descriptionLength={100}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              >
                {description}
              </ExpandableText>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
