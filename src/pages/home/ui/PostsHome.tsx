import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import ThreeDotsWhite from '../../../../public/icons/thre-dots-white.png'

import s from './postsHome.module.scss'

import { useGetCommentQuery, useUpdateCommentMutation } from '@/entities/comments'
import { useCreateAnswerMutation } from '@/entities/comments/api/commentsApi'
import { useGetLikePostsQuery, useLikePostsMutation } from '@/entities/posts/api/postsApi'
import { BookmarkOutlineIcon, HeartOutline, HeartRed, TelegramIcon } from '@/shared/assets'
import { CommentIcon } from '@/shared/assets/icons/CommentIcon'
import PersonImg3 from '@/shared/assets/PersonImg3.png'
import PersonImg4 from '@/shared/assets/PersonImg4.png'
import { Button, SwiperSlider, TimeAgo, Typography } from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { useFormatDate, useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { PostViewModal } from '@/widgets/postViewModal'
import { likeStatus } from '@/widgets/postViewModal/sendComments/LikeStatus'
import { sendComment } from '@/widgets/postViewModal/sendComments/sendComments'

type Props = {
  id?: number
  ownerId: number
  avatarOwner: string
  userName: string
  description: string
  updatedAt: string
  isSSR: boolean
  img: any
  likeCount: number
  isLiked: boolean
}
export const PostsHome = ({
  ownerId,
  avatarOwner,
  userName,
  description,
  updatedAt,
  id,
  img,
  likeCount,
  isLiked,
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
  const [createLike, { isLoading: isLikeLoading }] = useLikePostsMutation()
  const [like, setLike] = useState<'LIKE' | 'NONE'>(isLiked ? 'LIKE' : 'NONE')
  const { data: dataLikePost } = useGetLikePostsQuery({ postId: id, accessToken })
  const LikeStatusHandler = () => {
    likeStatus({
      accessToken,
      postId: id,
      setLike,
      createLike,
      like,
    })
  }

  useEffect(() => {
    postNumber && openModal(+postNumber)
  }, [postNumber])

  const submitClickHandler = () => {
    setComment('')
    sendComment({
      isAnswer: isAnswer,
      commentId: commentId,
      postId: id,
      accessToken: accessToken,
      createAnswer: createAnswer,
      updateComments: updateComments,
      comment: comment,
    })
  }

  useEffect(() => {
    if (isAnswer) return setComment('@' + userName + ',')
  }, [isAnswer])

  // console.log(dataLikePost && dataLikePost)
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
          <SwiperSlider imagesUrl={img} />
        </div>
      </main>
      <footer className={s.footer}>
        <div className={s.share}>
          <div className={s.shareIcons}>
            <div className={s.shareIconsStart}>
              <div onClick={LikeStatusHandler}>
                {isLiked ? <HeartRed size={20} /> : <HeartOutline size={20} />}
              </div>
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
            <Typography as="span" variant="bold_text_14">
              {userName}
            </Typography>
            <Typography as="span" className={s.description} variant="medium_text_14">
              {description}
            </Typography>
          </div>

          <div className={s.likeCounter}>
            <div className={s.avatarLayers}>
              {dataLikePost &&
                dataLikePost.items
                  .slice(0, 3)
                  .map(item => (
                    <AvatarSmallView
                      key={item.id}
                      avatarOwner={item.avatars[0] && item.avatars[0].url}
                      className={s.smallAvatarLayer}
                    />
                  ))}
            </div>
            <span className={s.likeCounterNum}>
              <Typography as="span" variant="regular_text_14">
                {likeCount}
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
            onChange={e => setComment(e.target.value)}
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
