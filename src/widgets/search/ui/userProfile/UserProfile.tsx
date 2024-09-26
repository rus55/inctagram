import { useEffect, useState } from 'react'

import { useGetPostsByUserMutation } from '@/entities/users/api/usersApi'
import {
  useFollowingMutation,
  useGetUserNameQuery,
  useUnFollowingMutation,
} from '@/entities/users-follow/api/usersFollowApi'
import { Button, Typography } from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { UploadedPhotos } from '@/widgets/superAdmin/userList/moreInformation/table-info/photos/UploadedPhotos'

type Props = {
  userName: string
}

export const UserProfile = ({ userName }: Props) => {
  const { t } = useTranslation()
  const { accessToken } = useAuth()

  const [posts, setPosts] = useState<Posts | null>(null)

  const { data: dataUser, refetch } = useGetUserNameQuery({ name: userName, accessToken })
  const [getPosts] = useGetPostsByUserMutation()
  const [following, { isLoading: loadingFollowing }] = useFollowingMutation()
  const [unFollowing, { isLoading: loadingUnFollowing }] = useUnFollowingMutation()

  useEffect(() => {
    if (!dataUser) return
    getPosts({ id: dataUser?.id, endCursorId: 0 })
      .unwrap()
      .then(res => {
        setPosts(res.data.getPostsByUser)
      })
  }, [dataUser])

  const getFollow = () => {
    dataUser?.isFollowing
      ? unFollowing({ userId: dataUser?.id, accessToken })
      : following({ userId: dataUser?.id, accessToken })
    refetch()
  }

  useFetchLoader(loadingFollowing || loadingUnFollowing)

  return (
    <>
      <div className="flex gap-6 mb-10">
        <AvatarSmallView avatarOwner={dataUser?.avatars[0]?.url || ''} width={300} height={300} />
        <div className="w-[100%]">
          <div className="flex justify-between">
            <Typography variant="h1">{dataUser?.userName}</Typography>
            <div className="flex gap-2">
              <Button variant={dataUser?.isFollowing ? 'outline' : 'primary'} onClick={getFollow}>
                {dataUser?.isFollowing
                  ? t.delete_following.delete_button
                  : t.following_modal.follow_button}
              </Button>
              <Button variant={'secondary'} onClick={() => {}}>
                {t.sendMessage}
              </Button>
            </div>
          </div>
          <div className="flex gap-15 mb-5 mt-5">
            <Typography variant="bold_text_14">
              {dataUser?.followingCount}
              <br />
              {t.following_modal.followings_title}
            </Typography>
            <Typography variant="bold_text_14">
              {dataUser?.followersCount}
              <br />
              {t.followers_modal.modals_title}
            </Typography>
            <Typography variant="bold_text_14">
              {dataUser?.publicationsCount}
              <br />
              {t.publications}
            </Typography>
          </div>
          <Typography variant="regular_text_16">{dataUser?.aboutMe}</Typography>
        </div>
      </div>
      <UploadedPhotos photos={posts ? posts?.items : []} />
    </>
  )
}
