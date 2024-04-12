import React, { MouseEventHandler, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import styles from './AccountManagement.module.scss'

import { useAppSelector } from '@/app/appStore'
import { selectSubscription, setTime } from '@/app/services/subscription-slice'
import { useSubscribeMutation } from '@/entities/subscription'
import {
  useAutoRenewalMutation,
  useCurrentSubscriptionQuery,
  useGetPaymentsQuery,
} from '@/entities/subscription/api/subscriptionApi'
import { PayPal, Stripe } from '@/shared/assets'
import { Button, SuperCheckbox, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { RadioGr } from '@/shared/components/radio-group'
import { useAppDispatch, useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { addLangValue } from '@/shared/lib/utils/addLangValue'
import { calculateDates } from '@/shared/lib/utils/сalculateDates'
import { ISubscriptionBody } from '@/shared/types'
import { TabsLayout } from '@/widgets/layouts'

enum PERIOD {
  DAY = 1,
  WEEK = 7,
  MONTH = 30,
}

const Component = () => {
  const { t } = useTranslation()
  const { accessToken } = useAuth()

  const { amountDays, isSubscription, subscriptionTo } = useAppSelector(selectSubscription)
  const [valuePrice, setValuePrice] = useState<ValuePriceType>(() => {
    return (localStorage.getItem('price') || t.subscription.day) as ValuePriceType
  })
  const [valueType, setValueType] = useState<ValueType>(() => {
    return (localStorage.getItem('type') || t.account_type.personal) as ValueType
  })
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isChecked, setChecked] = useState<boolean>(false)

  const [subscribe, { isLoading, isError }] = useSubscribeMutation()
  const [autoRenewal] = useAutoRenewalMutation()
  // const { data: curData } = useCurrentSubscriptionQuery(accessToken)
  const { data: payments } = useGetPaymentsQuery(accessToken)

  const [periodDays, setPeriodDays] = useState<PERIOD>(amountDays)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const [day, month, year] = subscriptionTo.split('.').map(Number)
  const subscriptionExpirationDate =
    router.locale === 'ru' ? new Date(year, month - 1, day) : new Date(subscriptionTo)
  const nextDay = new Date(
    subscriptionExpirationDate.setDate(subscriptionExpirationDate.getDate() + 1)
  ).toLocaleDateString(router.locale === 'en' ? 'en-EN' : 'ru-RU')

  useFetchLoader(isLoading)

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
    const price = localStorage.getItem('price')

    setOpenModal(false)
    let count: PERIOD

    if (data[price as ValuePriceType].period === 'DAY') {
      setPeriodDays(PERIOD.DAY)
      count = PERIOD.DAY
    } else if (data[price as ValuePriceType].period === 'WEEKLY') {
      setPeriodDays(PERIOD.WEEK)
      count = PERIOD.WEEK
    } else {
      setPeriodDays(PERIOD.MONTH)
      count = PERIOD.MONTH
    }

    dispatch(
      setTime({
        isSubscription: true,
        amountDays: count,
        currentPrice: price as ValuePriceType,
        subscriptionTo: calculateDates(count).toLocaleDateString(
          router.locale === 'en' ? 'en-EN' : 'ru-RU'
        ),
      })
    )
  }

  const onChangPrice = (value: ValuePriceType) => {
    localStorage.setItem('price', value)
    setValuePrice(value)
  }

  const onChangTypeAccount = (value: ValueType) => {
    setValueType(value)
    localStorage.setItem('type', value)
    localStorage.setItem('price', t.subscription.day)
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

    dispatch(
      setTime({
        currentPrice: valuePrice as ValuePriceType,
        amountDays,
        subscriptionTo: calculateDates(periodDays).toLocaleDateString(
          router.locale === 'en' ? 'en-EN' : 'ru-RU'
        ),
      })
    )
  }, [router.locale])

  return (
    <div className={styles.container}>
      {isSubscription && (
        <div>
          <Typography variant={'h3'}>{t.current_subscription}:</Typography>
          <div className={`${styles.wrapper} ${styles.wrapperWithFlex}`}>
            <div className={styles.time}>
              <Typography className={styles.colorText}>{t.expire_at}</Typography>
              <Typography variant={'regular_text_16'}>{subscriptionTo}</Typography>
            </div>
            <div className={styles.time}>
              <Typography className={styles.colorText}>{t.next_payment}</Typography>
              <Typography variant={'regular_text_16'}>{nextDay}</Typography>
            </div>
          </div>
          <SuperCheckbox
            className={styles.checkbox}
            label={t.auto_renewal}
            checked={isChecked}
            onCheckedChange={onCheckbox}
          />
        </div>
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
        <div className={styles.businessContainer}>
          <Typography variant={'h3'}>{t.text_subscription_costs}:</Typography>
          <div className={styles.wrapper}>
            <RadioGr
              onValueChange={value => onChangPrice(value as ValuePriceType)}
              options={businessPrice}
              value={valuePrice}
            />
          </div>
          <div className={styles.payPalAndStripe}>
            <Button onClick={handlerSubscribe} name="paypal">
              <PayPal className={styles.payPal} width={96} height={64} />
            </Button>
            <Typography>Or</Typography>
            <Button onClick={handlerSubscribe} name="stripe">
              <Stripe width={96} height={64} />
            </Button>
          </div>
        </div>
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
