import { FC, useEffect, useState } from 'react'

import s from './DeleteUser.module.scss'

import { useGetUsersMutation } from '@/entities/users/api/usersApi'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { EllipsisIcon } from '@/shared/assets/icons/EllipsisIcon'
import { Input, OptionsType, Pagination, SelectCustom } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { ModalAction } from '@/widgets/superAdmin/userList/ModalAction'

export enum SortDirection {
  DESC = 'desc',
  ASC = 'asc',
}

export enum UserBlockStatus {
  ALL = 'ALL',
  BLOCKED = 'BLOCKED',
  UNBLOCKED = 'UNBLOCKED',
}

export const DeleteUser: FC = () => {
  const { t } = useTranslation()

  const [users, setUsers] = useState<User[]>([])
  const [valuePagination, setValuePagination] = useState<PaginationModel | null>(null)
  const [currentPage, setCurrentPage] = useState<number | string>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const [data] = useGetUsersMutation()

  const onPageSizeChange = (value: number) => {
    setPageSize(value)
  }

  const onCurrentPageChange = (value: number | string) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    const initObjectUsers: GetUsersType = {
      pageSize,
      pageNumber: currentPage as number,
      sortBy: 'createdAt',
      sortDirection: SortDirection.DESC,
      searchTerm: '',
      statusFilter: UserBlockStatus.ALL,
    }

    data(initObjectUsers)
      .unwrap()
      .then(res => {
        setUsers(res.data.getUsers.users)
        setValuePagination(res.data.getUsers.pagination)
      })
      .catch(er => console.log(er))
  }, [data, pageSize, currentPage])

  const options: OptionsType[] = [
    { label: t.user_list.not_selected, value: t.user_list.not_selected },
    { label: t.user_list.blocked, value: t.user_list.blocked },
    { label: t.user_list.not_blocked, value: t.user_list.not_blocked },
  ]

  return (
    <div>
      <div className={s.panelSearchAndSort}>
        <div className={s.search}>
          <Input placeholder="Search" type={'search'} />
        </div>
        <div className={s.select}>
          <SelectCustom defaultValue={options[0].value} options={options} />
        </div>
      </div>
      <table className={s.table}>
        <tbody>
          <tr>
            <th>{t.user_list.id}</th>
            <th>{t.user_list.name}</th>
            <th>{t.user_list.profile}</th>
            <th style={{ width: 450 }}>{t.user_list.date}</th>
          </tr>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td className="flex">
                {user.userBan && <BlockIcon className="mr-2" />} {user.id}
              </td>
              <td>{user.userName}</td>
              <td>{user.profile.userName}</td>
              <td className="flex justify-between">
                {new Date(user.profile.createdAt).toLocaleDateString('ru-RU')}
                {<ModalAction trigger={<EllipsisIcon className={s.ellipsis} />} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalCount={valuePagination?.totalCount}
        currentPage={currentPage as number}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        onCurrentPageChange={onCurrentPageChange}
        options={[
          { label: '10', value: '10' },
          { label: '20', value: '20' },
          { label: '30', value: '30' },
        ]}
        portionValue={pageSize.toString()}
      />
    </div>
  )
}
