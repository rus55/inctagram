import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import s from './UserList.module.scss'

import { useDeleteUserMutation, useGetUsersMutation } from '@/entities/users/api/usersApi'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { EllipsisIcon } from '@/shared/assets/icons/EllipsisIcon'
import { OptionsType, Pagination, SelectCustom } from '@/shared/components'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { DebouncedInput } from '@/widgets/superAdmin/userList/DebouncedInput'
import { ModalDelete } from '@/widgets/superAdmin/userList/deleteUser/ModalDelete'
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

export type ShowModalType = {
  isShow: boolean
  userId: number | null
  userName: string | null
}

export const UserList: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [users, setUsers] = useState<User[]>([])
  const [valuePagination, setValuePagination] = useState<PaginationModel | null>(null)
  const [currentPage, setCurrentPage] = useState<number | string>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [valueSearch, setValueSearch] = useState<string>('')
  const [defaultValue, setDefaultValue] = useState(t.user_list.not_selected)
  const [showModalDelete, setShowModalDelete] = useState<ShowModalType>({
    isShow: false,
    userId: null,
    userName: null,
  })

  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation()
  const [data] = useGetUsersMutation()

  const options: OptionsType[] = [
    { label: t.user_list.not_selected, value: t.user_list.not_selected },
    { label: t.user_list.blocked, value: t.user_list.blocked },
    { label: t.user_list.not_blocked, value: t.user_list.not_blocked },
  ]

  useEffect(() => {
    localStorage.setItem('lang', t.user_list.not_selected)
    setDefaultValue(localStorage.getItem('lang') as string)
  }, [router.locale, t.user_list.not_selected])

  useEffect(() => {
    const initObjectUsers: GetUsersType = {
      pageSize,
      pageNumber: currentPage as number,
      sortBy: 'createdAt',
      sortDirection: SortDirection.DESC,
      searchTerm: valueSearch,
      statusFilter: UserBlockStatus.ALL,
    }

    data(initObjectUsers)
      .unwrap()
      .then(res => {
        setUsers(res.data.getUsers.users)
        setValuePagination(res.data.getUsers.pagination)
      })
      .catch(er => console.error(er))
  }, [data, currentPage, isSuccess, valueSearch, pageSize])

  const onDebounce = (value: string) => {
    setValueSearch(value)
  }

  const onPageSizeChange = (value: number) => {
    setPageSize(value)
  }

  const onCurrentPageChange = (value: number | string) => {
    setCurrentPage(value)
  }

  const addValuesUser = (id: number, name: string) => {
    setShowModalDelete({
      userId: id,
      userName: name,
      isShow: true,
    })
  }

  const onDeleteUser = () => {
    const id = showModalDelete.userId

    if (id) {
      deleteUser({ userId: id })
    }
    !isLoading &&
      setShowModalDelete({
        userId: null,
        userName: null,
        isShow: false,
      })
  }

  useFetchLoader(isLoading)

  return (
    <div>
      <div className={s.panelSearchAndSort}>
        <div className={s.search}>
          <DebouncedInput callback={onDebounce} />
        </div>
        <div className={s.select}>
          <SelectCustom
            value={defaultValue}
            options={options}
            onValueChange={(value: string) => setDefaultValue(value)}
          />
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
                {
                  <ModalAction
                    trigger={<EllipsisIcon className={s.ellipsis} />}
                    userId={user.id}
                    userName={user.userName}
                    addValuesUser={addValuesUser}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalDelete
        onDeleteUser={onDeleteUser}
        isOpen={showModalDelete.isShow}
        userName={showModalDelete.userName}
        setShowModalDelete={setShowModalDelete}
      />

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
