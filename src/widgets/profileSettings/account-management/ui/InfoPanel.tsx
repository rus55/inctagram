import React, { useState } from 'react'

import { useAutoRenewalMutation } from '@/entities/subscription/api/subscriptionApi'
import { SuperCheckbox, Typography } from '@/shared/components'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { LangType } from '@/shared/locales/en'
import styles from '@/widgets/profileSettings/account-management/ui/AccountManagement.module.scss'

type Props = {
  t: LangType
  detectionEndDay: string | undefined
  nextDay: string | undefined
  hasAutoRenewal: boolean | undefined
}

export const InfoPanel = ({ t, detectionEndDay, nextDay, hasAutoRenewal }: Props) => {
  const { accessToken } = useAuth()

  const [isChecked, setChecked] = useState<boolean>(hasAutoRenewal ?? true)
  const [autoRenewal] = useAutoRenewalMutation()

  const onCheckbox = () => {
    autoRenewal(accessToken)
    setChecked(!isChecked)
  }

  return (
    <div>
      <Typography variant={'h3'}>{t.current_subscription}:</Typography>
      <div className={`${styles.wrapper} ${styles.wrapperWithFlex}`}>
        <div className={styles.time}>
          <Typography className={styles.colorText}>{t.expire_at}</Typography>
          <Typography variant={'regular_text_16'}>{detectionEndDay}</Typography>
        </div>
        <div className={styles.time}>
          {isChecked && (
            <>
              <Typography className={styles.colorText}>{t.next_payment}</Typography>
              <Typography variant={'regular_text_16'}>{nextDay}</Typography>
            </>
          )}
        </div>
      </div>
      <SuperCheckbox
        className={styles.checkbox}
        label={t.auto_renewal}
        checked={isChecked}
        onCheckedChange={onCheckbox}
      />
    </div>
  )
}
