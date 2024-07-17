import { useRef, useState } from "react";

import Image from 'next/image'
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './Post.module.scss'

import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { ExpandableText } from '@/widgets/superAdmin/postsList/post/ExpandableText'
import { OwnerPost } from '@/widgets/superAdmin/postsList/post/OwnerPost'

type Props = {
  posts: PostsAllItems[]
}

export const Post = ({ posts }: Props) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({})
  const rows = []
  const textRef = useRef(null);

  for (let i = 0; i < posts.length; i += 4) {
    rows.push(posts.slice(i, i + 4))
  }

  const toggleExpand = (postId: number) => {
    setExpanded(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  console.log(textRef.current)

  return (
    <>
      {rows.length ? (
        <table className={s.table}>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map(photo => (
                  <td key={photo.id} className={s.cell}>
                    <div className={s.postContainer}>
                      <Swiper
                        cssMode
                        navigation
                        pagination
                        mousewheel
                        keyboard
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        style={{ width: 296 }}
                      >
                        {photo.images.map(image => (
                          <SwiperSlide key={image.id}>
                            <Image src={image.url || ''} alt={'img'} width={296} height={296} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div
                      className={`${s.descriptionContainer} ${expanded[photo.id] ? s.expanded : ''}`}
                    >
                      <OwnerPost
                        avatar={photo.postOwner.avatars}
                        userName={photo.postOwner.userName}
                      />
                      <Typography className={s.date} variant="small_text">
                        {new Date(photo.createdAt).toLocaleString('ru-RU')}
                      </Typography>
                      <Typography className={s.description}>
                        <ExpandableText
                          textRef={textRef}
                          expanded={expanded}
                          toggleExpand={toggleExpand}
                          text={photo.description}
                          maxLength={57}
                          id={photo.id}
                        />
                      </Typography>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography className="text-center" variant={'h1'}>
          {t.user_info.not_found}
        </Typography>
      )}
    </>
  )
}
