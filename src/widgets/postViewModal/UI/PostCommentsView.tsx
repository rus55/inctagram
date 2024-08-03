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
import { InputField } from '@/shared'
import {
  BookmarkOutlineIcon,
  DeletePostIcon,
  EditPostIcon,
  HeartOutline,
  TelegramIcon,
} from '@/shared/assets'
import ThreeDots from '@/shared/assets/icons/three-dots.png'
import PersonImg3 from '@/shared/assets/PersonImg3.png'
import PersonImg4 from '@/shared/assets/PersonImg4.png'
import {
  Button,
  CustomDropdown,
  CustomDropdownItem,
  Textarea,
  TimeAgo,
  Typography,
} from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { Scroller } from '@/shared/components/scroller/Scroller'
import { useFormatDate, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { AnswerData } from '@/widgets/postViewModal/UI/AnswerData'
import { PostAuthorizedAndUnauthorized } from '@/widgets/postViewModal/UI/PostAuthorizedAndUnauthorized'

type Props = {
  id?: number
  ownerId: number
  avatarOwner: string
  userName: string
  description: string
  updatedAt: string
  isSSR: boolean

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
}: Props) => {
  const { t } = useTranslation()
  const { formatDate } = useFormatDate(t.lg)
  const [updateComments, { isLoading: isPostLoading }] = useUpdateCommentMutation()
  const [createAnswer, { isLoading: isCreateAnswer }] = useCreateAnswerMutation()
  const { accessToken } = useAuth()
  const [comment, setComment] = useState<string>('')
  const { data: dataAuth } = useGetCommentQuery({ postId: id, accessToken })
  const { data, isLoading, error } = useGetCommentUnAuthorizationQuery({ postId: id })
  const { isAuth } = useAuth()
  const [isAnswer, setIsAnswer] = useState<boolean>(false)
  const [commentId, setCommentId] = useState<number | undefined>()
  const submitClickHandler = () => {
    setComment('')
    if (isAnswer) {
      createAnswer({
        content: comment,
        commentId: commentId,
        postId: id,
        accessToken,
      })
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
            ? dataAuth &&
              dataAuth.items.map((el: CommentsDataType) => (
                <>
                  <PostAuthorizedAndUnauthorized
                    setIsAnswer={setIsAnswer}
                    id={id}
                    setCommentId={setCommentId}
                    key={el.postId}
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
                </>
              ))
            : data &&
              data.items.map((el: any) => (
                <PostAuthorizedAndUnauthorized
                  key={el.postId}
                  el={el}
                  t={t}
                  updatedAt={updatedAt}
                />
              ))}
        </Scroller>
      </main>
      <footer>
        <div className={s.share}>
          <div className={s.shareIcons}>
            <div className={s.shareIconsStart}>
              <HeartOutline size={24} />
              <TelegramIcon />
            </div>
            <BookmarkOutlineIcon />
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

        <div className={s.addComment}>
          <input
            disabled={!isAuth}
            type={'text'}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={'Add a comment...'}
            className={s.InputField}
          />
          {/*<input*/}
          {/*    disabled={!isAuth}*/}
          {/*    type={"email"}*/}
          {/*    value={comment}*/}
          {/*    onChange={e => setComment(e.target.value)}*/}
          {/*    placeholder={''}*/}
          {/*    className={s.updatedAt}*/}
          {/*/>*/}

          {/*{t.post_view.add_comment}*/}
          <Button disabled={!isAuth} variant="link" onClick={submitClickHandler}>
            {t.post_view.publish}
          </Button>
        </div>
      </footer>
    </div>
  )
}
