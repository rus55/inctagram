import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import s from './UserList.module.scss'

import {
  useDeleteUserMutation,
  useGetUsersMutation,
  useUnBanUserMutation,
  useBanUserMutation,
  useDeleteUserMutation,
  useGetUsersMutation,

} from '@/entities/users/api/usersApi'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { EllipsisIcon } from '@/shared/assets/icons/EllipsisIcon'
import { OptionsType, Pagination, SelectCustom } from '@/shared/components'
import { UserBlockStatus, SortDirection } from '@/shared/constants/enum'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { useSortBy } from '@/shared/lib/hooks/useSortBy'
import { ModalBan } from '@/widgets/superAdmin/userList/banUser/ModalBan'
import { DebouncedInput } from '@/widgets/superAdmin/userList/DebouncedInput'
import { ModalDelete } from '@/widgets/superAdmin/userList/deleteUser/ModalDelete'
import { getValueByLang, statusType } from '@/widgets/superAdmin/userList/getValueByLang'
import { ModalAction } from '@/widgets/superAdmin/userList/ModalAction'
import { ModalUnBan } from '@/widgets/superAdmin/userList/unBanUser/ModalUnBan'

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
  const [defaultValue, setDefaultValue] = useState<statusType>(() => {
    if (typeof window !== 'undefined') {
      return (
        (localStorage.getItem('lang') as statusType) ?? (t.user_list.not_selected as statusType)
      )
    }

    return t.user_list.not_selected as statusType
  })
  const [showModalUnban, setShowModalUnban] = useState<ShowModalType>({
    isShow: false,
    userId: null,
    userName: null,
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
  const [unblockUser, { isLoading: isLoadingUnBan, isSuccess: isSuccessUnBan }] =
    useUnBanUserMutation()
  const { icon, onSortChange, sort } = useSortBy()

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
  }, [data, currentPage, isSuccess, valueSearch, pageSize, defaultValue, sort, isSuccessUnBan])
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
  const addValuesUnBanUser = (id: number, name: string) => {
    setShowModalUnban({
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
              {icon()}
            </th>
            <th>{t.user_list.profile}</th>
            <th onClick={onSortChange} className={s.date}>
              {t.user_list.date}
              {icon()}
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
                  addValuesBanUser={addValuesUnBanUser}
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
      <ModalUnBan
        isLoadingUnBan={isLoadingUnBan}
        unblockUser={unblockUser}
        showModalUnban={showModalUnban}
        setShowModalUnban={setShowModalUnban}
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
