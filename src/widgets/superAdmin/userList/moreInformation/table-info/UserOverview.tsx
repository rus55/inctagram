import React, { useEffect, useState } from 'react'

import s from 'src/widgets/superAdmin/userList/moreInformation/table-info/UserOverview.module.scss'

import { useGetPostsByUserMutation } from '@/entities/users/api/usersApi'
import { Typography } from '@/shared/components'
import { UploadedPhotos } from "@/widgets/superAdmin/userList/moreInformation/table-info/photos/UploadedPhotos";

type Props = {
  userId: number
}
type ActiveStyle = 'photos' | 'payments' | 'followers' | 'following'

export const UserOverview = ({ userId }: Props) => {
  const [posts, setPosts] = useState<Posts | null>(null)
  const [activeStyle, setActiveStyle] = useState<ActiveStyle>('photos')

  const [getPosts] = useGetPostsByUserMutation()

  useEffect(() => {
    getPosts({ id: userId, endCursorId: 0 })
      .unwrap()
      .then(res => {
        setPosts(res.data.getPostsByUser)
      })
  }, [setPosts])

  const handleTableClick = (e: React.MouseEvent<HTMLTableElement> ) => {
    const target = e.target as HTMLElement
    setActiveStyle(target.title as ActiveStyle)
  }

  return (
    <div>
      <table  className={s.main} onClick={handleTableClick}>
        <tbody>
        <tr>
          <th className={activeStyle === 'photos' ? s.active : ''}>
            <Typography title={'photos'} variant={'h3'}>Uploaded photos</Typography>
          </th>
          <th className={activeStyle === 'payments' ? s.active : ''}>
            <Typography title={'payments'} variant={'h3'}>Payments</Typography>
          </th>
          <th className={activeStyle === 'followers' ? s.active : ''}>
            <Typography title={'followers'} variant={'h3'}>Followers</Typography>
          </th>
          <th className={activeStyle === 'following' ? s.active : ''}>
            <Typography title={'following'} variant={'h3'}>Following</Typography>
          </th>
        </tr>
        </tbody>
      </table>
      {posts ? <UploadedPhotos photos={posts?.items} /> : <Typography variant={'h2'}>Not found</Typography>}
    </div>
  )
}
