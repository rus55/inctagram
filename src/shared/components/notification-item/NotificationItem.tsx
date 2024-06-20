import React from 'react'

import s from './NotificationItem.module.scss'

import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'

type Props = {
  message: string
}
export const NotificationItem = ({ message }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.wrapper}>
      <div>
        <Typography as="span" variant="bold_text_16">
          Новое уведомление!
        </Typography>
        <Typography as="span" variant="small_text" className={s.textSm}>
          Новое
        </Typography>
      </div>
      <Typography as="span" className={s.textBase}>
        {t.notification(message)}
      </Typography>
      <Typography variant="small_text" className={s.textSb}>
        1 день назад
      </Typography>
    </div>
  )
}
