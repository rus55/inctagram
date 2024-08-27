type Props = {
  like: 'LIKE' | 'NONE'
  setLike: any
  createLike: any
  id?: number
  postId: number | undefined
  accessToken: string | undefined
}
export const likeStatus = ({ setLike, like, createLike, accessToken, postId, id }: Props) => {
  if (like === 'NONE') {
    setLike('LIKE')
    createLike({
      commentId: id,
      likeStatus: 'LIKE',
      postId,
      accessToken,
    })
  } else {
    setLike('NONE')
    createLike({
      commentId: id,
      likeStatus: 'NONE',
      postId,
      accessToken,
    })
  }
}
