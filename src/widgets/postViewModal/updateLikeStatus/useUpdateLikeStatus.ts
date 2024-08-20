import { useEffect, useState } from 'react'

type Props = {
  el: any
  accessToken: any
  createLike?: any
  createAnswerLike?: any
}

export const useUpdateLikeStatus = ({ el, accessToken, createLike }: Props) => {
  const [like, setLike] = useState<'LIKE' | 'NONE'>('NONE')

  useEffect(() => {
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
  }, [createLike])

  return null
}
