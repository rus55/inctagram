import { FC, useEffect, useState } from 'react'

import { useGetUsersMutation } from '@/entities/users/api/usersApi'
import { Input, OptionsType, SelectCustom } from '@/shared/components'
import Container from '@/shared/components/container/container'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export enum SortDirection {
  DESC = 'desc',
  ASC = 'asc',
}

export enum UserBlockStatus {
  ALL = 'ALL',
  BLOCKED = 'BLOCKED',
  UNBLOCKED = 'UNBLOCKED',
}

export const UserList: FC = () => {
  const { accessToken } = useAuth()

  const [users, setUsers] = useState<UsersResponse | null>(null)
  const [data] = useGetUsersMutation()

  useEffect(() => {
    const initObjectUsers: GetUsersType = {
      pageSize: 10,
      pageNumber: 1,
      sortBy: 'createdAt',
      sortDirection: SortDirection.DESC,
      searchTerm: 'userName',
      statusFilter: UserBlockStatus.ALL,
    }

    data(initObjectUsers)
      .unwrap()
      .then(res => {
        setUsers(res)
      })
      .catch(er => console.log(er))
  }, [])

  const options: OptionsType[] = [
    { label: 'Not selected', value: 'Not selected' },
    { label: 'Blocked', value: 'Blocked' },
    { label: 'Not blocked', value: 'Not blocked' },
  ]

  return (
    <Container>
      <Input type={'search'} />
      <SelectCustom options={options} />
    </Container>
  )
}
