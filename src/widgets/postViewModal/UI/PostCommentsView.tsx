import Image from 'next/image'
import Link from 'next/link'

import s from './PostCommentsView.module.scss'

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
  TimeAgo,
  Typography,
} from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { Scroller } from '@/shared/components/scroller/Scroller'
import { useFormatDate, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

type Props = {
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
        <AvatarSmallView avatarOwner={avatarOwner} />
        <Link href={`/public-posts/${ownerId}`}>
          <Typography variant="bold_text_14">{userName}</Typography>
        </Link>
      </div>
      {isAuth && userId == ownerId && !isSSR && (
        <div className={s.wrappedActionMenu}>
          <CustomDropdown
            trigger={<Image src={ThreeDots} alt="menu-trigger" className={s.dots} />}
            align={'end'}
          >
            <CustomDropdownItem>
              <Button variant={'link'} className={s.button} onClick={() => setModalType ? setModalType('edit') :''}>
                <EditPostIcon /> {t.post_view.edit}
              </Button>
            </CustomDropdownItem>
            <CustomDropdownItem>
              <Button variant={'link'} className={s.button} onClick={() => openDeleteModal ? openDeleteModal() :''}>
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
}: Props) => {
  const { t } = useTranslation()
  const { formatDate } = useFormatDate(t.lg)

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
          <div className={s.comment}>
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
                    URLProfiele
                  </Typography>
                </Link>
                &nbsp;&nbsp;
                <Typography as="span" variant="medium_text_14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua
                </Typography>
                <div>
                  <Typography as="span" variant="medium_text_14" className={s.updatedAt}>
                    <TimeAgo updatedAt={updatedAt} lg={t.lg} />
                  </Typography>
                  &nbsp;&nbsp;
                  <Typography as="span" variant="bold_text_14" className={s.updatedAt}>
                    {t.post_view.answer}
                  </Typography>
                </div>
              </div>
            </div>
            <div className={s.like}>
              <HeartOutline />
            </div>
          </div>
          <div className={s.comment}>
            <div className={s.post}>
              <Image
                src={PersonImg4}
                width={36}
                height={36}
                alt="Owner's avatar"
                className={s.smallAvatarPost}
              />
              <div className={s.postContent}>
                <Link href={'#'}>
                  <Typography as="span" variant="bold_text_14">
                    URLProfiele
                  </Typography>
                </Link>{' '}
                <Typography as="span" variant="medium_text_14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua
                </Typography>
                <div>
                  <Typography as="span" variant="medium_text_14" className={s.updatedAt}>
                    <TimeAgo updatedAt={updatedAt} lg={t.lg} />
                  </Typography>{' '}
                  &nbsp;&nbsp;
                  <Typography as="span" variant="bold_text_14" className={s.updatedAt}>
                    {t.post_view.like}: 1
                  </Typography>
                  &nbsp;&nbsp;
                  <Typography as="span" variant="bold_text_14" className={s.updatedAt}>
                    {t.post_view.answer}
                  </Typography>
                </div>
              </div>
            </div>
            <div className={s.like}>
              <HeartRed />
            </div>
          </div>
          <div className={s.comment}>
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
                    URLProfiele
                  </Typography>
                </Link>
                &nbsp;&nbsp;
                <Typography as="span" variant="medium_text_14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua
                </Typography>
                <div>
                  <Typography as="span" variant="medium_text_14" className={s.updatedAt}>
                    <TimeAgo updatedAt={updatedAt} lg={t.lg} />
                  </Typography>
                  &nbsp;&nbsp;
                  <Typography as="span" variant="bold_text_14" className={s.updatedAt}>
                    {t.post_view.answer}
                  </Typography>
                </div>
              </div>
            </div>
            <div className={s.like}>
              <HeartOutline />
            </div>
          </div>
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
          <Typography variant="regular_text_14" className={s.updatedAt}>
            {t.post_view.add_comment}
          </Typography>
          <Button variant="link">{t.post_view.publish}</Button>
        </div>
      </footer>
    </div>
  )
}
