import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import styles from './AccountManagement.module.scss'
import { setLocalStorageAndValue } from './setLocalStorageAndValue'
import { StatusModal } from './StatusModal'

import { useSubscribeMutation } from '@/entities/subscription'
import {
  useCurrentSubscriptionQuery,
  useGetPaymentsQuery,
} from '@/entities/subscription/api/subscriptionApi'
import { Typography } from '@/shared/components'
import { RadioGr } from '@/shared/components/radio-group'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { addLangValue } from '@/shared/lib/utils/addLangValue'
import { ISubscriptionBody } from '@/shared/types'
import { TabsLayout } from '@/widgets/layouts'
import { BusinessType } from '@/widgets/profileSettings/account-management/ui/BusinessType'
import { InfoPanel } from '@/widgets/profileSettings/account-management/ui/InfoPanel'

const valueLS = {
  price: 'price' as PriceType,
  type: 'type' as PriceType,
}

const Component = () => {
  const { t } = useTranslation()
  const { accessToken } = useAuth()
  const router = useRouter()

  const [valuePrice, setValuePrice] = useState<ValuePriceType>(() => {
    return (localStorage.getItem(valueLS.price) || t.subscription.day) as ValuePriceType
  })
  const [valueType, setValueType] = useState<ValueType>(() => {
    return (localStorage.getItem(valueLS.type) || t.account_type.personal) as ValueType
  })
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [subscribe, { isLoading, isError }] = useSubscribeMutation()
  const { data: curData } = useCurrentSubscriptionQuery(accessToken)
  const { data: payments, isLoading: isLoadPayments } = useGetPaymentsQuery(accessToken)

  const typeAccount = [
    { label: t.account_type.personal, value: t.account_type.personal },
    { label: t.account_type.business, value: t.account_type.business },
  ]

  useFetchLoader(isLoading)
  useFetchLoader(isLoadPayments)

  let detectionEndDay
  let nextDay

  if (payments?.length > 0) {
    const endDate = new Date(payments[payments.length - 1].endDateOfSubscription)

    detectionEndDay = endDate.toLocaleDateString('ru-RU')
    nextDay = new Date(endDate.setDate(endDate.getDate() + 1)).toLocaleDateString('ru-RU')
  }

  const addSubscribe = async (body: ISubscriptionBody) => {
    const result = await subscribe({
      body,
      accessToken,
    }).unwrap()

    await router.push(result.url)
  }

  const onSuccess = () => {
    if (isError) return

    setOpenModal(false)
  }

  const onChangTypeAccount = (value: ValueType) => {
    setValueType(value)
    localStorage.setItem(valueLS.type, value)
    localStorage.setItem(valueLS.price, t.subscription.day)
  }

  useEffect(() => {
    if (router.query.success) {
      setOpenModal(true)
    }
  }, [router.query.success])

  useEffect(() => {
    setValueType(addLangValue<ValueType>(t.lg as LangType, valueType))
    setValuePrice(addLangValue<ValuePriceType>(t.lg as LangType, valuePrice))
  }, [router.locale, t.lg, valuePrice, valueType])

  useEffect(() => {
    if (curData?.data.length > 0) {
      setLocalStorageAndValue(t.account_type.business as ValueType, valueLS.type, setValueType)
    } else {
      setLocalStorageAndValue(t.account_type.personal as ValueType, valueLS.type, setValueType)
    }
  }, [curData, t.account_type.business, t.account_type.personal])

  return (
    <div className={styles.container}>
      {curData?.data.length > 0 && (
        <InfoPanel
          hasAutoRenewal={curData && curData.hasAutoRenewal}
          t={t}
          detectionEndDay={detectionEndDay}
          nextDay={nextDay}
        />
      )}
      {!isLoadPayments && (
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
      )}

      {valueType === t.account_type.business && (
        <BusinessType
          t={t}
          setValuePrice={setValuePrice}
          valuePrice={valuePrice}
          addSubscribe={addSubscribe}
        />
      )}
      {router.query.success && openModal ? (
        <StatusModal
          openModal={openModal}
          titleModal={t.text_success}
          callback={onSuccess}
          textButton={t.button_ok}
          textTypography={t.payment_success}
        />
      ) : null}
      {isError && router.query.success && openModal ? (
        <StatusModal
          openModal={openModal}
          titleModal={t.text_error}
          callback={onSuccess}
          textButton={t.button_back}
          textTypography={t.transaction_failed}
        />
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
