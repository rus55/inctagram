import React, { useEffect, useState } from 'react'

import styles from './PaymentsList.module.scss'

import { useGetPaymentsLIstMutation } from '@/entities/users/api/usersApi'
import { Pagination, Typography } from '@/shared/components'
import { AvatarSmallView } from '@/shared/components/avatarSmallView'
import { SortDirection } from '@/shared/constants/enum'
import { tabType } from '@/shared/constants/tab'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import usePagination from '@/shared/lib/hooks/usePagination'
import { useSortBy } from '@/shared/lib/hooks/useSortBy'
import { DebouncedInput } from '@/widgets/superAdmin/userList/DebouncedInput'

export const PaymentsList = () => {
  const { t } = useTranslation()
  const [searchUserName, setSearchUserName] = useState<string>('')
  const [pagedData, setPagedData] = useState<PaymentsAll | null>(null)

  const [getPayments, { isLoading }] = useGetPaymentsLIstMutation()
  const { pageSize, setPageSize, setCurrentPage, currentPage, sortBy, setSortBy } = usePagination()
  const { icon, onSortChange, sort } = useSortBy()

  useEffect(() => {
    const initialObject = {
      pageSize,
      pageNumber: currentPage as number,
      sortBy,
      sortDirection: sort === 'default' ? SortDirection.DESC : (sort as SortDirection),
      searchTerm: searchUserName,
    }

    getPayments(initialObject)
      .unwrap()
      .then(res => {
        if (JSON.stringify(res.data.getPayments) !== JSON.stringify(pagedData)) {
          setPagedData(res.data.getPayments)
        }
      })
      .catch(er => console.error(er))
  }, [currentPage, pageSize, searchUserName, sortBy, sort])

  const onDebounce = (value: string) => {
    setSearchUserName(value)
  }

  const onChangeSortBy = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>, key: string) => {
    setSortBy(`${e.currentTarget.innerText}`)
    onSortChange(key)
  }

  useFetchLoader(isLoading)

  return (
    <div>
      <div className={styles.search}>
        <DebouncedInput callback={onDebounce} />
      </div>
      {pagedData?.items.length ? (
        <>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tableRow}>
                <th className="cursor-pointer" onClick={e => onChangeSortBy(e, 'name')}>
                  {t.user_list.name}
                  {icon('name')}
                </th>
                <th className="cursor-pointer" onClick={e => onChangeSortBy(e, 'date')}>
                  {t.user_list.date}
                  {icon('date')}
                </th>
                <th className="cursor-pointer" onClick={e => onChangeSortBy(e, 'amount')}>
                  {t.amount}, ${icon('amount')}
                </th>
                <th>{t.subscription_text}</th>
                <th className="cursor-pointer" onClick={e => onChangeSortBy(e, 'method')}>
                  {t.payment_method}
                  {icon('method')}
                </th>
              </tr>
              {pagedData?.items.map(item => (
                <tr className={styles.tableContent} key={item.id}>
                  <td>
                    <AvatarSmallView
                      avatarOwner={item.avatars[1]?.url}
                      width={item.avatars[1]?.width}
                      height={item.avatars[1]?.height}
                    />
                    {item.userName}
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</td>
                  <td>{item.amount}</td>
                  <td>{tabType[item.type]}</td>
                  <td>{tabType[item.paymentMethod]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalCount={pagedData?.totalCount}
            currentPage={currentPage as number}
            pageSize={pageSize}
            onPageSizeChange={value => setPageSize(value)}
            onCurrentPageChange={value => setCurrentPage(value)}
            options={[
              { label: '10', value: '10' },
              { label: '20', value: '20' },
              { label: '30', value: '30' },
            ]}
            portionValue={pageSize.toString()}
          />
        </>
      ) : (
        <Typography className="text-center" variant={'h1'}>
          {t.user_info.not_found}
        </Typography>
      )}
    </div>
  )
}
