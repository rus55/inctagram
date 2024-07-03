import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import s from './UserList.module.scss'

import {
  useBanUserMutation,
  useDeleteUserMutation,
  useGetUsersMutation,
} from '@/entities/users/api/usersApi'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { EllipsisIcon } from '@/shared/assets/icons/EllipsisIcon'
import { Filter } from '@/shared/assets/icons/Filter'
import { Polygon } from '@/shared/assets/icons/Polygon'
import { PolygonUp } from '@/shared/assets/icons/PolygonUp'
import { OptionsType, Pagination, SelectCustom } from '@/shared/components'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { ModalBan } from '@/widgets/superAdmin/userList/banUser/ModalBan'
import { DebouncedInput } from '@/widgets/superAdmin/userList/DebouncedInput'
import { ModalDelete } from '@/widgets/superAdmin/userList/deleteUser/ModalDelete'
import { getValueByLang, statusType } from '@/widgets/superAdmin/userList/getValueByLang'
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
export type ShowModalBanType = {
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
  const [sort, setSort] = useState<SortDirection | 'default'>(SortDirection.DESC)
  const [defaultValue, setDefaultValue] = useState<statusType>(() => {
    if (typeof window !== 'undefined') {
      return (
        (localStorage.getItem('lang') as statusType) ?? (t.user_list.not_selected as statusType)
      )
    }

    return t.user_list.not_selected as statusType
  })
  const [showModalDelete, setShowModalDelete] = useState<ShowModalType>({
    isShow: false,
    userId: null,
    userName: null,
  })
  const [showModalBan, setShowModalBan] = useState<ShowModalBanType>({
    isShow: false,
    userId: null,
    userName: null,
  })
  const [banUser, { isLoading: isLoadingBan }] = useBanUserMutation()
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation()
  const [data] = useGetUsersMutation()
  const options: OptionsType[] = [
    { label: t.user_list.not_selected, value: t.user_list.not_selected },
    { label: t.user_list.blocked, value: t.user_list.blocked },
    { label: t.user_list.not_blocked, value: t.user_list.not_blocked },
  ]

  const status = {
    [t.user_list.not_selected]: UserBlockStatus.ALL,
    [t.user_list.blocked]: UserBlockStatus.BLOCKED,
    [t.user_list.not_blocked]: UserBlockStatus.UNBLOCKED,
  }

  const onSelectChange = (value: statusType) => {
    const currentValue = getValueByLang(value)

    localStorage.setItem('lang', t.user_list[currentValue as keyof typeof t.user_list])
    setDefaultValue(t.user_list[currentValue as keyof typeof t.user_list] as statusType)
  }

  useEffect(() => {
    onSelectChange(defaultValue)
  }, [router.locale])
  const valueBanUser = (id: number, name: string) => {
    setShowModalBan({
      userId: id,
      userName: name,
      isShow: true,
    })
  }

  useEffect(() => {
    const initObjectUsers: GetUsersType = {
      pageSize,
      pageNumber: currentPage as number,
      sortBy: 'createdAt',
      sortDirection: sort === 'default' ? SortDirection.DESC : (sort as SortDirection),
      searchTerm: valueSearch,
      statusFilter: status[defaultValue as string] as UserBlockStatus,
    }

    data(initObjectUsers)
      .unwrap()
      .then(res => {
        setUsers(res.data.getUsers.users)
        setValuePagination(res.data.getUsers.pagination)
      })
      .catch(er => console.error(er))
  }, [data, currentPage, isSuccess, valueSearch, pageSize, defaultValue, sort, isLoadingBan])

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

  const onSortChange = () => {
    if (sort === SortDirection.DESC) setSort(SortDirection.ASC)
    if (sort === SortDirection.ASC) setSort('default')
    if (sort === 'default') setSort(SortDirection.DESC)
  }

  const changeIcon = () => {
    if (sort === SortDirection.DESC) return <Polygon />
    if (sort === SortDirection.ASC) return <PolygonUp />
    if (sort === 'default') return <Filter />
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

  useFetchLoader(isLoading || isLoadingBan)

  return (
    <div>
      <div className={s.panelSearchAndSort}>
        <div className={s.search}>
          <DebouncedInput callback={onDebounce} />
        </div>
        <div className={s.select}>
          <SelectCustom
            value={defaultValue as string}
            options={options}
            onValueChange={onSelectChange}
          />
        </div>
      </div>
      <table className={s.table}>
        <tbody>
          <tr>
            <th>{t.user_list.id}</th>
            <th onClick={onSortChange} className="flex items-center gap-1 cursor-pointer">
              {t.user_list.name}
              {changeIcon()}
            </th>
            <th>{t.user_list.profile}</th>
            <th onClick={onSortChange} className={s.date}>
              {t.user_list.date}
              {changeIcon()}
            </th>
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
                <ModalAction
                  trigger={<EllipsisIcon className={s.ellipsis} />}
                  userId={user.id}
                  userName={user.userName}
                  addValuesUser={addValuesUser}
                  valueBanUser={valueBanUser}
                />
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
      <ModalBan
        isLoadingBan={isLoadingBan}
        banUser={banUser}
        showModalBan={showModalBan}
        isOpen={showModalBan.isShow}
        userName={showModalBan.userName}
        setShowModalBan={setShowModalBan}
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
