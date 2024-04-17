import Image from 'next/image'
import Link from 'next/link'

import s from './ProfileHeaderWeb.module.scss'

import { DefaultProfileImg } from '@/shared/assets'
import { Typography, Button } from '@/shared/components'
import { ModalOfFollowers } from '@/shared/components/followers-modal'
import { ModalOfFollowing } from '@/shared/components/following-modal'
import { useTranslation } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'

type Props = {
  data: PublicProfile
  isAuth?: boolean
  userId?: number
  totalCount?: number
}
export const ProfileHeaderWeb = ({ data, isAuth, userId, totalCount }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.containerColumn}>
      <div className={s.container}>
        <div className={s.imageContainer}>
          <div className={s.image}>
            {data?.avatars[0]?.url ? (
              <Image
                src={data?.avatars[0]?.url || ''}
                className={s.image}
                alt={''}
                width={204}
                height={204}
              />
            ) : (
              <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
            )}
          </div>
          <Link href={{ pathname: `/public-posts/${data.id}` }}>
            <Typography variant="bold_text_16" className={s.linkSmallProfile}>
              {data.userName}
            </Typography>
          </Link>
        </div>
        <div className={s.dataProfile}>
          <div className={s.header}>
            <Typography variant="h1" className={s.linkLargeProfile}>
              {data.userName}
            </Typography>
            {isAuth && userId == data.id && (
              <Button variant="secondary" className={s.buttonSettings}>
                <Link href="/my-profile/general-information">{t.home.profile_btn}</Link>
              </Button>
            )}
          </div>
          <div className={s.progressProfile}>
            <div className={s.info}>
              <Typography className={s.progressInfoValue} variant="bold_text_14">
                87
              </Typography>
              <div className={'max-lg:hidden'}>
                <ModalOfFollowing />
              </div>
              <Link
                href={'/my-profile/following-page/following'}
                className={cn(s.progressInfoText, 'hidden max-lg:block')}
              >
                {t.following_modal.followings_title}
              </Link>
            </div>
            <div className={s.info}>
              <Typography className={s.progressInfoValue} variant="bold_text_14">
                112
              </Typography>
              <div className={'max-lg:hidden'}>
                <ModalOfFollowers />
              </div>
              <Link
                href={'/my-profile/following-page/followers'}
                className={cn(s.progressInfoText, 'hidden max-lg:block')}
              >
                {t.followers_modal.modals_title}
              </Link>
            </div>
            <div className={s.info}>
              <Typography className={s.progressInfoValue} variant="bold_text_14">
                {totalCount ?? 0}
              </Typography>
              <Typography className={s.progressInfoText} variant="regular_text_14">
                {t.followers_modal.post}
              </Typography>
            </div>
          </div>
          <p className={cn(s.description, 'max-lg:hidden')}>
            <Typography as="span" variant="regular_text_14">
              {data?.aboutMe}
            </Typography>
          </p>
        </div>
      </div>
      <p className={cn(s.description, 'hidden max-lg:block mb-10')}>
        <Typography as="span" variant="regular_text_14">
          {data?.aboutMe}
        </Typography>
      </p>
    </div>
  )
}
