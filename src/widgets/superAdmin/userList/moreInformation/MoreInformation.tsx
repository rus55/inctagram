import { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useGetUserMutation } from '@/entities/users/api/usersApi'
import { ArrowBack } from '@/shared/assets/icons/ArrowBack'
import { Typography } from '@/shared/components'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { UserOverview } from '@/widgets/superAdmin/userList/moreInformation/table-info/UserOverview'
import { UserInfo } from '@/widgets/superAdmin/userList/moreInformation/userInfo/UserInfo'

const MoreInformation: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { userId } = router.query

  const [user, setUser] = useState<User | null>(null)

  const [getUser, { isLoading }] = useGetUserMutation()

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .unwrap()
        .then(res => {
          setUser(res.data.getUser)
        })
    }
  },[userId])

  useFetchLoader(isLoading)

  return (
    <div className="ml-52">
      <div className="flex gap-1 mb-6 cursor-pointer" onClick={() => router.push('/userList')}>
        <ArrowBack />
        <Typography variant="medium_text_14">{t.user_list.backToUserList}</Typography>
      </div>
      {user && (
        <>
          <UserInfo
            avatar={user.profile.avatars.url}
            name={{
              first: user.profile.firstName ?? '----',
              last: user.profile.lastName ?? '----',
            }}
            userName={user.userName}
            userId={user.id}
            date={user.createdAt}
          />
          <UserOverview userId={user.id} />
        </>
      )}
    </div>
  )
}

export default MoreInformation
