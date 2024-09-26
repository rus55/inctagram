import React, { MouseEventHandler } from 'react'

import { PayPal, Stripe } from '@/shared/assets'
import { Button, Typography } from '@/shared/components'
import { RadioGr } from '@/shared/components/radio-group'
import { LangType } from '@/shared/locales/en'
import { ISubscriptionBody } from '@/shared/types'
import styles from '@/widgets/profileSettings/account-management/ui/AccountManagement.module.scss'

type Props = {
  t: LangType
  setValuePrice: (value: ValuePriceType) => void
  valuePrice: ValuePriceType
  addSubscribe: (body: ISubscriptionBody) => void
}

export const BusinessType = ({ t, valuePrice, addSubscribe, setValuePrice }: Props) => {
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

  const handlerSubscribe: MouseEventHandler<HTMLButtonElement> = e => {
    const body: ISubscriptionBody = {
      typeSubscription: data[valuePrice as ValuePriceType].period,
      paymentType: e.currentTarget.name.toUpperCase(),
      amount: Number(data[valuePrice as ValuePriceType].amount),
      baseUrl: window.location.href,
    }

    addSubscribe(body)
  }

  const onChangPrice = (value: ValuePriceType) => {
    localStorage.setItem('price', value)
    setValuePrice(value)
  }

  return (
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
  )
}
