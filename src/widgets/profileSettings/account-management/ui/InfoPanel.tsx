import React from 'react'

import { SuperCheckbox, Typography } from '@/shared/components'
import { LangType } from '@/shared/locales/en'
import styles from '@/widgets/profileSettings/account-management/ui/AccountManagement.module.scss'

type Props = {
  t: LangType
  detectionEndDay: string
  nextDay: string
  isChecked: boolean
  onCheckbox: () => void
}

export const InfoPanel = ({ t, detectionEndDay, nextDay, onCheckbox, isChecked }: Props) => {
  return (
    <div>
      <Typography variant={'h3'}>{t.current_subscription}:</Typography>
      <div className={`${styles.wrapper} ${styles.wrapperWithFlex}`}>
        <div className={styles.time}>
          <Typography className={styles.colorText}>{t.expire_at}</Typography>
          <Typography variant={'regular_text_16'}>{detectionEndDay}</Typography>
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
  )
}
