import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import s from './PostCommentsView.module.scss'

import {
  useCreateAnswerMutation,
  useGetAnswerQuery,
  useGetCommentQuery,
  useGetCommentUnAuthorizationQuery,
  useUpdateCommentMutation,
} from '@/entities/comments/api/commentsApi'
import { useGetLikePostsQuery, useLikePostsMutation } from '@/entities/posts/api/postsApi'
import { InputField } from '@/shared'
import {
  BookmarkOutlineIcon,
  DeletePostIcon,
  EditPostIcon,
  HeartOutline,
  HeartRed,
  TelegramIcon,
} from '@/shared/assets'
import ThreeDots from '@/shared/assets/icons/three-dots.png'
import PersonImg3 from '@/shared/assets/PersonImg3.png'
import PersonImg4 from '@/shared/assets/PersonImg4.png'
import {
  Button,
  CustomDropdown,
  CustomDropdownItem,
  SwiperSlider,
  Textarea,
  TimeAgo,
  Typography,
} from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { Scroller } from '@/shared/components/scroller/Scroller'
import { useFormatDate, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { likeStatus } from '@/widgets/postViewModal/sendComments/LikeStatus'
import { sendComment } from '@/widgets/postViewModal/sendComments/sendComments'
import { AnswerData } from '@/widgets/postViewModal/UI/PostComments/AnswerData'
import { PostAuthorizedAndUnauthorized } from '@/widgets/postViewModal/UI/PostComments/PostAuthorizedAndUnauthorized'

type Props = {
  id?: number
  ownerId: number
  avatarOwner: string
  userName: string
  description: string
  updatedAt: string
  isSSR: boolean
  isLiked?: boolean
  likesCount?: number
  setModalType?: (modalType: 'edit' | 'view') => void
  openDeleteModal?: () => void
}

type PostModalHeaderProps = Omit<Props, 'description' | 'updatedAt'>

export const PostModalHeader = ({
  avatarOwner,
  ownerId,
  userName,
  isSSR,
  setModalType,
  openDeleteModal,
}: PostModalHeaderProps) => {
  const { t } = useTranslation()
  const { isAuth, userId } = useAuth()

  return (
    <header className={s.header}>
      <div className={s.avatar}>
        {/*<AvatarSmallView avatarOwner={avatarOwner} />*/}
        {/*<Link href={`/public-posts/${ownerId}`}>*/}
        {/*  <Typography variant="bold_text_14">{userName}</Typography>*/}
        {/*</Link>*/}
      </div>
      {isAuth && userId == ownerId && !isSSR && (
        <div className={s.wrappedActionMenu}>
          <CustomDropdown
            trigger={<Image src={ThreeDots} alt="menu-trigger" className={s.dots} />}
            align={'end'}
          >
            <CustomDropdownItem>
              <Button
                variant={'link'}
                className={s.button}
                onClick={() => (setModalType ? setModalType('edit') : '')}
              >
                <EditPostIcon /> {t.post_view.edit}
              </Button>
            </CustomDropdownItem>
            <CustomDropdownItem>
              <Button
                variant={'link'}
                className={s.button}
                onClick={() => (openDeleteModal ? openDeleteModal() : '')}
              >
                <DeletePostIcon /> {t.post_view.delete}
              </Button>
            </CustomDropdownItem>
          </CustomDropdown>
        </div>
      )}
    </header>
  )
}

export const PostCommentsView = ({
  ownerId,
  avatarOwner,
  userName,
  description,
  updatedAt,
  isSSR,
  setModalType,
  openDeleteModal,
  id,
  likesCount,
  isLiked,
}: Props) => {
  const { t } = useTranslation()
  const { formatDate } = useFormatDate(t.lg)
  const [updateComments, { isLoading: isPostLoading }] = useUpdateCommentMutation()
  const [createAnswer, { isLoading: isCreateAnswer }] = useCreateAnswerMutation()
  const { accessToken } = useAuth()
  const [comment, setComment] = useState<string>('')
  const { data: dataAuth } = useGetCommentQuery({ postId: id, accessToken })
  const { data: dataLikePost } = useGetLikePostsQuery({ postId: id, accessToken })
  const { data, isLoading, error } = useGetCommentUnAuthorizationQuery({ postId: id })
  const { isAuth } = useAuth()
  const [isAnswer, setIsAnswer] = useState<boolean>(false)
  const [commentId, setCommentId] = useState<number | undefined>()
  const [createLike, { isLoading: isLikeLoading }] = useLikePostsMutation()
  const [like, setLike] = useState<'LIKE' | 'NONE'>(isLiked ? 'LIKE' : 'NONE')

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

  const LikeStatusHandler = () => {
    likeStatus({
      accessToken,
      postId: id,
      setLike,
      createLike,
      like,
    })
  }
  // const Avatar =dataLikePost=== undefined ? '' : dataLikePost.items.avatars.map((el:any)=>el.url)

  useEffect(() => {
    if (isAnswer) return setComment('@' + userName)
  }, [isAnswer])

  return (
    <div>
      <div className={s.headerOnMiddle}>
        <PostModalHeader
          ownerId={ownerId}
          avatarOwner={avatarOwner}
          userName={userName}
          isSSR={isSSR}
          setModalType={setModalType}
          openDeleteModal={openDeleteModal}
        />
      </div>

      <main className={s.main}>
        <Scroller className={s.scrollContent}>
          <div className={s.post}>
            <AvatarSmallView avatarOwner={avatarOwner} />

            <div className={s.postContent}>
              <Link href={`/public-posts/${ownerId}`}>
                <Typography as="span" variant="bold_text_14">
                  {userName}
                </Typography>
              </Link>
              &nbsp;&nbsp;
              <Typography as="span" variant="medium_text_14">
                {description}
              </Typography>
              <Typography variant="medium_text_14" className={s.updatedAt}>
                <TimeAgo updatedAt={updatedAt} lg={t.lg} />
              </Typography>
            </div>
          </div>
          {isAuth
            ? dataAuth?.items.map((el: CommentsDataType) => (
                <React.Fragment key={el.postId}>
                  <PostAuthorizedAndUnauthorized
                    setIsAnswer={setIsAnswer}
                    id={id}
                    setCommentId={setCommentId}
                    el={el}
                    t={t}
                    updatedAt={updatedAt}
                  />
                  <AnswerData
                    commentId={commentId}
                    accessToken={accessToken}
                    id={id}
                    el={el}
                    t={t}
                  />
                </React.Fragment>
              ))
            : data?.items.map((el: CommentsDataType) => (
                <PostAuthorizedAndUnauthorized
                  key={el.postId}
                  el={el}
                  t={t}
                  updatedAt={updatedAt}
                />
              ))}
        </Scroller>
      </main>
      <footer className={s.footer}>
        <div className={s.share}>
          <div className={s.shareIcons}>
            <div className={s.shareIconsStart}>
              <div onClick={LikeStatusHandler}>
                {isLiked ? <HeartRed size={30} /> : <HeartOutline size={24} />}
              </div>
              <TelegramIcon />
            </div>
            <BookmarkOutlineIcon />
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
                {likesCount}
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
    </div>
  )
}
