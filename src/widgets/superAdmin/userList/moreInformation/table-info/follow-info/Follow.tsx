import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import styles from './Follow.module.scss'

import { useGetFollowersMutation, useGetFollowingMutation } from '@/entities/users/api/usersApi'
import { Pagination, Typography } from '@/shared/components'
import { SortDirection } from '@/shared/constants/enum'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { useSortBy } from '@/shared/lib/hooks/useSortBy'
import { getPageItems } from '@/widgets/profileSettings/my-payments/utils/getPageItems'

type Props = {
  tab: 'followers' | 'following'
  userId: number
}
export const Follow = ({ tab, userId }: Props) => {
  const { t } = useTranslation()

  const [pageNumber, setPageNumber] = useState<number | string>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [followContent, setFollowContent] = useState<FollowContent | null>(null)
  const [items, setItems] = useState<FollowItems[]>([])

  const [getFollowers, { isLoading: loadFollowers }] = useGetFollowersMutation()
  const [getFollowing, { isLoading: loadFollowing }] = useGetFollowingMutation()

  const { icon, sort, onSortChange } = useSortBy()

  useFetchLoader(loadFollowers)
  useFetchLoader(loadFollowing)

  useEffect(() => {
    setFollowContent(null)
  }, [tab])

  useEffect(() => {
    const initialObj = {
      pageSize,
      pageNumber,
      sortBy: 'createdAt',
      sortDirection: sort === 'default' ? SortDirection.DESC : sort,
      userId,
    }

    const func = tab === 'followers' ? getFollowers : getFollowing

    func(initialObj)
      .unwrap()
      .then(res => {
        !followContent && setFollowContent(res.data.getFollowers)
      })

    const followItems = followContent?.items

    setItems(getPageItems<FollowItems>(pageNumber as number, pageSize, followItems || []))
  }, [pageSize, pageNumber, followContent, sort])

  return (
    <div>
      {items.length ? (
        <>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>{t.user_info.usertId}</th>
                <th
                  onClick={() => onSortChange('name')}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  {t.user_info.userName}
                  {icon('name')}
                </th>
                <th>{t.user_info.profileLink}</th>
                <th
                  onClick={() => onSortChange('subscription')}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  {t.user_info.subscriptionDate}
                  {icon('subscription')}
                </th>
              </tr>
              {items.map((item: FollowItems) => (
                <tr key={item.id}>
                  <td>{item.userId}</td>
                  <td>{item.userName}</td>
                  <td>
                    <Link href={`/public-posts/${userId}`}>
                      <Typography style={{ textDecoration: 'underline' }}>
                        {item.userName}
                      </Typography>
                    </Link>
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalCount={followContent?.totalCount}
            currentPage={pageNumber as number}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onCurrentPageChange={setPageNumber}
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
