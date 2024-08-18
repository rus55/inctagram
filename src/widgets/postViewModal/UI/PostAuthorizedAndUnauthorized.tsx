import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useLikeCommentMutation } from '@/entities/comments'
import { HeartOutline, HeartRed } from '@/shared/assets'
import PersonImg3 from '@/shared/assets/PersonImg3.png'
import { TimeAgo, Typography } from '@/shared/components'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import s from '@/widgets/postViewModal/UI/PostCommentsView.module.scss'
import { useUpdateLikeStatus } from '@/widgets/postViewModal/updateLikeStatus/useUpdateLikeStatus'

type Props = {
  el: CommentsDataType
  updatedAt: string
  t: any
  setIsAnswer?: (isAnswer: boolean) => void
  setCommentId?: (answerId: number) => void
  id?: number
  oneComments:boolean
  home?:boolean
}
export const PostAuthorizedAndUnauthorized = ({ t, el, setIsAnswer, setCommentId,oneComments,home }: Props) => {
  const { accessToken } = useAuth()
  const [createLike, { isLoading: isPostLoading }] = useLikeCommentMutation()
  const [like, setLike] = useState<'LIKE' | 'NONE'>('NONE')
  const submitClickHandler = () => {
    if (like === 'NONE') {
      setLike('LIKE')
      createLike({
        commentId: el.id,
        likeStatus: 'LIKE',
        postId: el.postId,
        accessToken,
      })
    } else {
      setLike('NONE')
      createLike({
        commentId: el.id,
        likeStatus: 'NONE',
        postId: el.postId,
        accessToken,
      })
    }
    // useUpdateLikeStatus({el,accessToken,createLike})
  }

  const clickHandlerAnswer = () => {
    setCommentId && setCommentId(el.id)
    setIsAnswer && setIsAnswer(true)
  }

  return (
    <div className={s.contentBlock}>
      <div className={s.comment}>
        <Image
            src={PersonImg3}
            width={36}
            height={36}
            alt="Owner's avatar"
            className={home ? s.smallAvatarPostHome : s.smallAvatarPost}
        />
        <div className={s.post}>

          <div className={home ? s.postContentHome :s.postContent }>
            <Link href={'#'}>
              <Typography as="span" variant="bold_text_14">
                {el.from.username}
              </Typography>
            </Link>
            &nbsp;&nbsp;
            <Typography as="span" variant="medium_text_14">
              {el.content}
            </Typography>

              {oneComments ? '' : (
                  <>
                  <div>
                    <Typography as="span" variant="medium_text_14" className={s.updatedAt}>
                      <TimeAgo updatedAt={el.createdAt} lg={t.lg} />
                    </Typography>
                    &nbsp;&nbsp;
                  <Typography as="span" variant="medium_text_14" className={s.updatedAt}>
                    Like: {el.likeCount}
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
                  </>
              )}
          </div>
        </div>
        {oneComments ? '' : (
            <div className={s.like}>
              <div onClick={submitClickHandler}>{el.isLiked ? <HeartRed /> : <HeartOutline />}</div>
            </div>
        )}
      </div>
    </div>
  )
}
