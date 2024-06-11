import React, { useEffect, useState } from 'react'

import { Payments } from './payments/Payments'
import { UploadedPhotos } from './photos/UploadedPhotos'
import s from './UserOverview.module.scss'

import { useGetPostsByUserMutation } from '@/entities/users/api/usersApi'
import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { Follow } from '@/widgets/superAdmin/userList/moreInformation/table-info/follow-info/Follow'

type Props = {
  userId: number
}
export type ActiveStyle = 'photos' | 'payments' | 'followers' | 'following'

export const UserOverview = ({ userId }: Props) => {
  const { t } = useTranslation()

  const [posts, setPosts] = useState<Posts | null>(null)
  const [activeStyle, setActiveStyle] = useState<ActiveStyle>('photos')

  const [getPosts] = useGetPostsByUserMutation()

  useEffect(() => {
    getPosts({ id: userId, endCursorId: 0 })
      .unwrap()
      .then(res => {
        setPosts(res.data.getPostsByUser)
      })
  }, [setPosts, userId])

  const handleTableClick = (e: React.MouseEvent<HTMLTableElement>) => {
    const target = e.target as HTMLElement

    setActiveStyle(target.title as ActiveStyle)
  }

  const getDetails = (name: ActiveStyle) => {
    const component = {
      photos: <UploadedPhotos photos={posts ? posts?.items : []} />,
      payments: <Payments userId={userId} />,
      followers: <Follow userId={userId} tab={'followers'} />,
      following: <Follow userId={userId} tab={'following'} />,
    }

    return component[name]
  }

  return (
    <div>
      <table className={s.main} onClick={handleTableClick}>
        <tbody>
          <tr>
            <th className={activeStyle === 'photos' ? s.active : ''}>
              <Typography title={'photos'} variant={'h3'}>
                {t.user_info.uploaded_photos}
              </Typography>
            </th>
            <th className={activeStyle === 'payments' ? s.active : ''}>
              <Typography title={'payments'} variant={'h3'}>
                {t.user_info.payments}
              </Typography>
            </th>
            <th className={activeStyle === 'followers' ? s.active : ''}>
              <Typography title={'followers'} variant={'h3'}>
                {t.user_info.followers}
              </Typography>
            </th>
            <th className={activeStyle === 'following' ? s.active : ''}>
              <Typography title={'following'} variant={'h3'}>
                {t.user_info.following}
              </Typography>
            </th>
          </tr>
        </tbody>
      </table>
      {getDetails(activeStyle)}
    </div>
  )
}
