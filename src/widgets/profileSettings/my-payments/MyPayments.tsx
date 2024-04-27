import { useEffect, useState } from 'react'

import styles from './MyPayments.module.scss'
import { getPageItems } from './utils/getPageItems'

import { useGetPaymentsQuery } from '@/entities/subscription/api/subscriptionApi'
import { Pagination } from '@/shared/components'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { IPayments } from '@/shared/types'
import { TabsLayout } from '@/widgets/layouts'

const Component = () => {
  const { t } = useTranslation()
  const { accessToken } = useAuth()

  const [currentPage, setCurrentPage] = useState<number | string>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [array, setArray] = useState<IPayments[]>([])

  const { data: payments, isLoading: isLoadPayments } = useGetPaymentsQuery(accessToken)

  useFetchLoader(isLoadPayments)

  const hashTabType: { [key: string]: string } = {
    'DAY': '1 day',
    'WEEKLY': '7 days',
    'MONTHLY': '1 month',
    'STRIPE': 'Stripe',
    'PAYPAL': 'PayPal'
  }

  const onCurrentPageChange = (value: number | string) => {
    setCurrentPage(value)
  }

  const onPageSizeChange = (value: number) => {
    setPageSize(value)
  }

  useEffect(() => {
    setArray(getPageItems(currentPage as number, pageSize, payments || []))
  }, [payments])

  return (
    !isLoadPayments && (
      <div>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>{t.date_of_payment}</th>
              <th>{t.end_date_of_subscription}</th>
              <th>{t.price}</th>
              <th>{t.subscription_type}</th>
              <th>{t.payment_type}</th>
            </tr>
            {array.map((item: IPayments) => (
              <tr key={item.subscriptionId}>
                <td>{new Date(item.dateOfPayment).toLocaleDateString('ru-RU')}</td>
                <td>{new Date(item.endDateOfSubscription).toLocaleDateString('ru-RU')}</td>
                <td>${item.price}</td>
                <td>{hashTabType[item.subscriptionType]}</td>
                <td>{hashTabType[item.paymentType]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalCount={payments.length}
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
  )
}

export const MyPayments = () => {
  return (
    <TabsLayout>
      <Component />
    </TabsLayout>
  )
}
