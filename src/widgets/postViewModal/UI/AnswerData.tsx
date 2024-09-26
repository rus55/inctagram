import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import s from './PostCommentsView.module.scss'

import { useGetAnswerQuery, useLikeAnswerMutation } from '@/entities/comments/api/commentsApi'
import { HeartOutline, HeartRed } from '@/shared/assets'
import PersonImg3 from '@/shared/assets/PersonImg3.png'
import { Button, TimeAgo, Typography } from '@/shared/components'
import { useUpdateLikeStatus } from '@/widgets/postViewModal/updateLikeStatus/useUpdateLikeStatus'

type Props = {
  commentId: number | undefined
  accessToken: any
  id: number | undefined
  el: any
  t: any
}
export const AnswerData = ({ commentId, id, accessToken, t, el }: Props) => {
  const { data: dataAnswer } = useGetAnswerQuery({ postId: id, commentId: el.id, accessToken })
  const [createAnswerLike, { isLoading: createAnswerLikeLoading }] = useLikeAnswerMutation()

  const [isHideAnswer, setIsHideAnswer] = useState<boolean>(false)
  const [like, setLike] = useState<'LIKE' | 'NONE'>('NONE')
  const clickHeandler = () => {
    setIsHideAnswer(!isHideAnswer)
  }
  const submitClickHandler = (answerId: number) => {
    if (like === 'NONE') {
      setLike('LIKE')
      createAnswerLike({
        commentId: el.id,
        likeStatus: 'LIKE',
        postId: el.postId,
        answerId: answerId,
        accessToken,
      })
    } else {
      setLike('NONE')
      createAnswerLike({
        commentId: el.id,
        likeStatus: 'NONE',
        postId: el.postId,
        answerId: answerId,
        accessToken,
      })
    }
  }

  if (!dataAnswer) return null

  return (
    <>
      {dataAnswer.totalCount !== 0 ? (
        <Button className={s.buttonAnswer} onClick={clickHeandler} variant={'link'}>
          - Show answers ({dataAnswer.totalCount})
        </Button>
      ) : (
        ''
      )}

      {dataAnswer.items.map((el: any) => (
        <div key={el.id} className={isHideAnswer ? s.answer : s.answerNone}>
          <div className={s.post}>
            <Image
              src={PersonImg3}
              width={36}
              height={36}
              alt="Owner's avatar"
              className={s.smallAvatarPost}
            />
            <div className={s.postContent}>
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
                  Like: {el.likeCount}
                </Typography>
                &nbsp;&nbsp;
                {/*<Typography onClick={clickHandlerAnswer} as="span" variant="bold_text_14" className={s.updatedAt}>*/}
                {/*    {t.post_view.answer}*/}
                {/*</Typography>*/}
              </div>
            </div>
          </div>
          <div className={s.like}>
            <div onClick={() => submitClickHandler(el.id)}>
              {el.isLiked ? <HeartRed /> : <HeartOutline />}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
