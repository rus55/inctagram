import React, { MouseEventHandler, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import styles from './AccountManagement.module.scss'

import { useSubscribeMutation } from '@/entities/subscription'
import {
  useAutoRenewalMutation,
  useCurrentSubscriptionQuery,
  useGetPaymentsQuery,
} from '@/entities/subscription/api/subscriptionApi'
import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { RadioGr } from '@/shared/components/radio-group'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { addLangValue } from '@/shared/lib/utils/addLangValue'
import { ISubscriptionBody } from '@/shared/types'
import { TabsLayout } from '@/widgets/layouts'
import { BusinessType } from '@/widgets/profileSettings/account-management/ui/BusinessType'
import { InfoPanel } from '@/widgets/profileSettings/account-management/ui/InfoPanel'

const Component = () => {
  const { t } = useTranslation()
  const { accessToken } = useAuth()

  const [valuePrice, setValuePrice] = useState<ValuePriceType>(() => {
    return (localStorage.getItem('price') || t.subscription.day) as ValuePriceType
  })
  const [valueType, setValueType] = useState<ValueType>(() => {
    return (localStorage.getItem('type') || t.account_type.personal) as ValueType
  })
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isChecked, setChecked] = useState<boolean>(true)

  const [subscribe, { isLoading, isError }] = useSubscribeMutation()
  const [autoRenewal] = useAutoRenewalMutation()
  const { data: curData } = useCurrentSubscriptionQuery(accessToken)
  const { data: payments, isLoading: isLoadPayments } = useGetPaymentsQuery(accessToken)

  useFetchLoader(isLoading)
  useFetchLoader(isLoadPayments)

  const router = useRouter()

  const detectionEndDay = payments?.length
    ? new Date(payments[payments.length - 1].endDateOfSubscription).toLocaleDateString('ru-RU')
    : ''

  const [day, month, year] = detectionEndDay.split('.').map(Number)
  const subscriptionExpirationDate =
    router.locale === 'ru' ? new Date(year, month - 1, day) : new Date(detectionEndDay)
  const nextDay = new Date(
    subscriptionExpirationDate.setDate(subscriptionExpirationDate.getDate() + 1)
  ).toLocaleDateString('ru-RU')

  const typeAccount = [
    { label: t.account_type.personal, value: t.account_type.personal },
    { label: t.account_type.business, value: t.account_type.business },
  ]

  const businessPrice = [
    { label: t.subscription.day, value: t.subscription.day },
    { label: t.subscription.week, value: t.subscription.week },
    { label: t.subscription.month, value: t.subscription.month },
  ]

  const data: DataType = {
    [t.subscription.day]: { amount: '10', period: 'DAY' },
    [t.subscription.week]: { amount: '50', period: 'WEEKLY' },
    [t.subscription.month]: { amount: '100', period: 'MONTHLY' },
  }

  const handlerSubscribe: MouseEventHandler<HTMLButtonElement> = async e => {
    const body: ISubscriptionBody = {
      typeSubscription: data[valuePrice as ValuePriceType].period,
      paymentType: e.currentTarget.name.toUpperCase(),
      amount: Number(data[valuePrice as ValuePriceType].amount),
      baseUrl: window.location.href,
    }

    const result = await subscribe({
      body,
      accessToken,
    }).unwrap()

    window.location.href = result.url
  }

  const onSuccess = () => {
    if (isError) return

    setOpenModal(false)
  }

  const onChangTypeAccount = (value: ValueType) => {
    setValueType(value)
    localStorage.setItem('type', value)
    localStorage.setItem('price', t.subscription.day)
  }

  const onChangPrice = (value: ValuePriceType) => {
    localStorage.setItem('price', value)
    setValuePrice(value)
  }

  const onCheckbox = () => {
    autoRenewal(accessToken)
    setChecked(!isChecked)
  }

  useEffect(() => {
    if (router.query.success) {
      setOpenModal(true)
    }
  }, [router.query.success])

  useEffect(() => {
    setValueType(addLangValue<ValueType>(t.lg as LangType, valueType))
    setValuePrice(addLangValue<ValuePriceType>(t.lg as LangType, valuePrice))
  }, [router.locale, payments])

  return (
    <div className={styles.container}>
      {curData?.data.length && (
        <InfoPanel
          t={t}
          detectionEndDay={detectionEndDay}
          nextDay={nextDay}
          isChecked={isChecked}
          onCheckbox={onCheckbox}
        />
      )}
      <div>
        <Typography variant={'h3'}>{t.text_account}:</Typography>
        <div className={styles.wrapper}>
          <RadioGr
            onValueChange={value => onChangTypeAccount(value as ValueType)}
            options={typeAccount}
            value={valueType}
          />
        </div>
      </div>

      {valueType === t.account_type.business && (
        <BusinessType
          t={t}
          onChangPrice={onChangPrice}
          businessPrice={businessPrice}
          valuePrice={valuePrice}
          handlerSubscribe={handlerSubscribe}
        />
      )}
      {router.query.success && openModal ? (
        <Modal size={'sm'} open={openModal} title={t.text_success}>
          <Typography variant={'regular_text_16'}>{t.payment_success}</Typography>
          <Button className={styles.successButton} fullWidth onClick={onSuccess}>
            <Typography variant={'h3'}>{t.button_ok}</Typography>
          </Button>
        </Modal>
      ) : null}
      {isError && router.query.success && openModal ? (
        <Modal size={'sm'} open={openModal} title={t.text_error}>
          <Typography variant={'regular_text_16'}>{t.transaction_failed}</Typography>
          <Button className={styles.successButton} fullWidth onClick={onSuccess}>
            <Typography variant={'h3'}>{t.button_back}</Typography>
          </Button>
        </Modal>
      ) : null}
    </div>
  )
}

export const AccountManagement = () => {
  return (
    <TabsLayout>
      <Component />
    </TabsLayout>
  )
}
