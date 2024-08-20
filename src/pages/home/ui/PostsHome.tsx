import React, { Fragment, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import s from './postsHome.module.scss'

import { useGetCommentQuery, useUpdateCommentMutation } from '@/entities/comments'
import { useCreateAnswerMutation } from '@/entities/comments/api/commentsApi'
import { InputField } from '@/shared'
import { BookmarkOutlineIcon, EditPostIcon, HeartOutline, TelegramIcon } from '@/shared/assets'
import { CommentIcon } from '@/shared/assets/icons/CommentIcon'
// import ThreeDotsWhite from '@/shared/assets/icons/three-dots.png'
import ThreeDotsWhite from '../../../../public/icons/thre-dots-white.png'
import PersonImg3 from '@/shared/assets/PersonImg3.png'
import PersonImg4 from '@/shared/assets/PersonImg4.png'
import { Button, SwiperSlider, Textarea, TimeAgo, Typography } from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { useFormatDate, useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { PostViewModal } from '@/widgets/postViewModal'
import { PostAuthorizedAndUnauthorized } from '@/widgets/postViewModal/UI/PostAuthorizedAndUnauthorized'
import { PostModalHeader } from '@/widgets/postViewModal/UI/PostCommentsView'

type Props = {
  id?: number
  ownerId: number
  avatarOwner: string
  userName: string
  description: string
  updatedAt: string
  isSSR: boolean
  img: any
}
export const PostsHome = ({
  ownerId,
  avatarOwner,
  userName,
  description,
  updatedAt,
  isSSR,
  id,
  img,
}: Props) => {
  const { t } = useTranslation()
  const { formatDate } = useFormatDate(t.lg)
  const [updateComments, { isLoading: isPostLoading }] = useUpdateCommentMutation()
  const [createAnswer, { isLoading: isCreateAnswer }] = useCreateAnswerMutation()
  const { accessToken } = useAuth()
  const [comment, setComment] = useState<string>('')
  const { data: dataAuth } = useGetCommentQuery({ postId: id, accessToken })
  const { isAuth } = useAuth()
  const [isAnswer, setIsAnswer] = useState<boolean>(false)
  const [commentId, setCommentId] = useState<number | undefined>()

  const { isOpen, openModal, closeModal, modalId } = useModal()
  const searchParams = useSearchParams()
  const postNumber = searchParams?.get('modalId') as string | undefined

  useEffect(() => {
    postNumber && openModal(+postNumber)
  }, [postNumber])
  const submitClickHandler = () => {
    setComment('')
    if (isAnswer) {
      createAnswer({
        content: comment,
        commentId: commentId,
        postId: id,
        accessToken,
      })
      setIsAnswer(false)
    } else
      updateComments({
        content: comment,
        postId: id,
        accessToken,
      })
  }

  useEffect(() => {
    if (isAnswer) return setComment('@' + userName + ',')
  }, [isAnswer])

  return (
    <div>
      <main className={s.main}>
        {!!modalId && <PostViewModal modalId={modalId} isOpen={isOpen} closeModal={closeModal} />}

        <div className={s.post}>
          <AvatarSmallView avatarOwner={avatarOwner} />
          <div className={s.postContent}>
            <Link href={`/public-posts/${ownerId}`}>
              <Typography as="span" variant="bold_text_14">
                {userName}
                <Typography variant="medium_text_14" className={s.updatedAt}>
                  <TimeAgo updatedAt={updatedAt} lg={t.lg} />
                </Typography>
              </Typography>
            </Link>
            &nbsp;&nbsp;
          </div>
          <Image src={ThreeDotsWhite} alt="menu-trigger" className={s.dots1} />
        </div>
        <div className={s.imageContainer}>
          <SwiperSlider imagesUrl={img} postsHome />
        </div>
      </main>
      <footer className={s.footer}>
        <div className={s.share}>
          <div className={s.shareIcons}>
            <div className={s.shareIconsStart}>
              <HeartOutline size={20} />
              <div
                className={s.commentIcon}
                onClick={
                  openModal
                    ? () => {
                        openModal(id)
                      }
                    : () => null
                }
              >
                <CommentIcon />
              </div>
              <TelegramIcon size={15} />
            </div>
            <BookmarkOutlineIcon size={16} />
          </div>

     <div className={s.descriptionPosts}>
       <AvatarSmallView avatarOwner={avatarOwner} />
       <Typography as="span" variant="bold_text_14">{userName}</Typography>
       <Typography as="span" className={s.description} variant="medium_text_14">  {description}</Typography>
     </div>

          <div className={s.likeCounter}>
            <div className={s.avatarLayers}>
              <AvatarSmallView avatarOwner={avatarOwner} className={s.smallAvatarLayer} />
              <Image
                src={PersonImg3}
                width={36}
                height={36}
                alt="Owner's avatar"
                className={s.smallAvatarLayer}
              />
              <Image
                src={PersonImg4}
                width={36}
                height={36}
                alt="Owner's avatar"
                className={s.smallAvatarLayer}
              />
            </div>
            <span className={s.likeCounterNum}>
              <Typography as="span" variant="regular_text_14">
                2 243
              </Typography>
              &nbsp;
              <Typography as="span" variant="bold_text_14">
                &quot;{t.post_view.like}&quot;
              </Typography>
            </span>
          </div>
          <Typography variant="small_text" className={s.updatedAt}>
            {formatDate(updatedAt)}
          </Typography>
        </div>
        <Typography variant="medium_text_14" className={s.allComment}>
          <div
            onClick={
              openModal
                ? () => {
                    openModal(id)
                  }
                : () => null
            }
          >
            {t.home.View_all_comments} ({dataAuth && dataAuth.totalCount})
          </div>
        </Typography>
        <div className={s.addComment}>
          <input
            disabled={!isAuth}
            type={'text'}
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            placeholder={t.post_view.add_comment}
            className={s.InputField}
          />

          <Button disabled={!isAuth} variant="link" onClick={submitClickHandler}>
            {t.post_view.publish}
          </Button>
        </div>
      </footer>
      <div className={s.line}></div>
    </div>
  )
}
