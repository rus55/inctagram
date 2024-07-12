import { useEffect, useState } from 'react'

import styles from './Payments.module.scss'

import { useGetPaymentsByUserMutation } from '@/entities/users/api/usersApi'
import { Pagination, Typography } from '@/shared/components'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { getPageItems } from '@/widgets/profileSettings/my-payments/utils/getPageItems'

type Props = {
  userId: number
}

export const Payments = ({ userId }: Props) => {
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number | string>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [paymentUser, setPaymentUser] = useState<SuperAdminPagePaymentsByUser | null>(null)
  const [array, setArray] = useState<SuperAdminItemsByUser[]>([])

  const [data, { isLoading }] = useGetPaymentsByUserMutation()

  const tabType: { [key: string]: string } = {
    DAY: '1 day',
    WEEKLY: '7 days',
    MONTHLY: '1 month',
    STRIPE: 'Stripe',
    PAYPAL: 'PayPal',
  }

  const onCurrentPageChange = (value: number | string) => {
    setCurrentPage(value)
  }

  const onPageSizeChange = (value: number) => {
    setPageSize(value)
  }

  useEffect(() => {
    const initialObject = {
      userId: userId,
      pageSize,
      pageNumber: currentPage as number,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    }

    if (!paymentUser) {
      data(initialObject)
        .unwrap()
        .then(res => {
          setPaymentUser(res.data.getPaymentsByUser)
        })
    }

    const paymentArray = paymentUser?.items

    setArray(
      getPageItems<SuperAdminItemsByUser>(currentPage as number, pageSize, paymentArray || [])
    )
  }, [userId, currentPage, pageSize, setPaymentUser, setArray, paymentUser])

  useFetchLoader(isLoading)

  return (
    !isLoading && (
      <div>
        {array.length ? (
          <>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th>{t.date_of_payment}</th>
                  <th>{t.end_date_of_subscription}</th>
                  <th>{t.amount}, $</th>
                  <th>{t.subscription_type}</th>
                  <th>{t.payment_type}</th>
                </tr>
                {array.map((item: SuperAdminItemsByUser) => (
                  <tr key={item.id}>
                    <td>{new Date(item.dateOfPayment).toLocaleDateString('ru-RU')}</td>
                    <td>{new Date(item.endDate).toLocaleDateString('ru-RU')}</td>
                    <td>${item.price}</td>
                    <td>{tabType[item.type]}</td>
                    <td>{tabType[item.paymentType]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              totalCount={paymentUser?.items.length}
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
          </>
        ) : (
          <Typography className="text-center" variant={'h1'}>
            {t.user_info.not_found}
          </Typography>
        )}
      </div>
    )
  )
}
