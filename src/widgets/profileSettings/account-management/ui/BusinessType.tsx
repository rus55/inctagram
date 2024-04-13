import React from 'react'

import { PayPal, Stripe } from '@/shared/assets'
import { Button, Typography } from '@/shared/components'
import { RadioGr } from '@/shared/components/radio-group'
import { LangType } from '@/shared/locales/en'
import styles from '@/widgets/profileSettings/account-management/ui/AccountManagement.module.scss'

type Props = {
  t: LangType
  onChangPrice: (value: ValuePriceType) => void
  businessPrice: { label: string; value: string }[]
  valuePrice: ValuePriceType
  handlerSubscribe: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const BusinessType = ({
  t,
  businessPrice,
  valuePrice,
  onChangPrice,
  handlerSubscribe,
}: Props) => {
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
