import { useEffect, useState } from 'react'

import { useGetUsersNameQuery } from '@/entities/users-follow/api/usersFollowApi'
import { useFetchLoader } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { SearchedUsers } from '@/widgets/search/ui/SearchedUsers'
import { DebouncedInput } from '@/widgets/superAdmin/userList/DebouncedInput'

export const SearchUser = () => {
  const { accessToken } = useAuth()

  const [valueSearch, setValueSearch] = useState<string>('')
  const [userDetail, setUserDetail] = useState<SearchUsersItems[]>([])

  const { data: dataUsers, isLoading } = useGetUsersNameQuery({
    name: valueSearch ? valueSearch : null,
    accessToken,
  })

  useEffect(() => {
    if (!dataUsers) return

    setUserDetail(dataUsers.items)
  }, [valueSearch, dataUsers])

  useFetchLoader(isLoading)

  return (
    <div>
      <DebouncedInput callback={setValueSearch} />
      <SearchedUsers users={userDetail} />
    </div>
  )
}
