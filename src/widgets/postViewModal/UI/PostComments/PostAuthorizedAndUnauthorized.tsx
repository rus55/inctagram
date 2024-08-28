import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useLikeCommentMutation } from '@/entities/comments'
import { HeartOutline, HeartRed } from '@/shared/assets'
import SmileImg from '@/shared/assets/SmileImg.png'
import { TimeAgo, Typography } from '@/shared/components'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { likeStatus } from '@/widgets/postViewModal/sendComments/LikeStatus'
import s from '@/widgets/postViewModal/UI/PostComments/PostCommentsView.module.scss'

type Props = {
  el: CommentsDataType
  updatedAt: string
  t: any
  setIsAnswer?: (isAnswer: boolean) => void
  setCommentId?: (answerId: number) => void
  id?: number
  home?: boolean
}
export const PostAuthorizedAndUnauthorized = ({
  t,
  el,
  setIsAnswer,
  setCommentId,
  home,
}: Props) => {
  const { accessToken } = useAuth()
  const [createLike, { isLoading: isPostLoading }] = useLikeCommentMutation()
  const [like, setLike] = useState<'LIKE' | 'NONE'>(el.isLiked ? 'LIKE' : 'NONE')
  const submitClickHandler = () => {
    likeStatus({
      accessToken,
      id: el.id,
      postId: el.postId,
      setLike,
      createLike,
      like,
    })
  }

  const clickHandlerAnswer = () => {
    setCommentId && setCommentId(el.id)
    setIsAnswer && setIsAnswer(true)
  }

  return (
    <div className={s.contentBlock}>
      <div className={s.comment}>
        <Image
          src={(el.from.avatars[0].url && el.from.avatars[0].url) || SmileImg}
          width={36}
          height={36}
          alt="Owner's avatar"
          className={home ? s.smallAvatarPostHome : s.smallAvatarPost}
        />
        <div className={s.post}>
          <div className={home ? s.postContentHome : s.postContent}>
            <Link href={'#'}>
              <Typography as="span" variant="bold_text_14">
                {el.from.username}
              </Typography>
            </Link>
            &nbsp;&nbsp;
            <Typography as="span" variant="medium_text_14">
              {el.content}
            </Typography>
            <div>
              <Typography as="span" variant="medium_text_14" className={s.updatedAt}>
                <TimeAgo updatedAt={el.createdAt} lg={t.lg} />
              </Typography>
              &nbsp;&nbsp;
              <Typography as="span" variant="medium_text_14" className={s.updatedAt}>
                {t.Comment.like}: {el.likeCount}
              </Typography>
              &nbsp;&nbsp;
              <Typography
                onClick={clickHandlerAnswer}
                as="span"
                variant="bold_text_14"
                className={s.updatedAt}
              >
                {t.post_view.answer}
              </Typography>
            </div>
          </div>
        </div>
        <div className={s.like}>
          <div onClick={submitClickHandler}>{el.isLiked ? <HeartRed /> : <HeartOutline />}</div>
        </div>
      </div>
    </div>
  )
}
