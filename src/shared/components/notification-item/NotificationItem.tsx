import React from 'react'

import s from './NotificationItem.module.scss'

import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'

type Props = {
  message: string
  newMessage?: boolean
  notifyAt: Date
}
export const NotificationItem = ({ message, newMessage, notifyAt, ...restProps }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.wrapper} {...restProps}>
      <div>
        <Typography as="span" variant="bold_text_16">
          {t.new_notification}
        </Typography>
        {newMessage && (
          <Typography as="span" variant="small_text" className={s.textSm}>
            {t.new_title}
          </Typography>
        )}
      </div>
      <Typography as="span" className={s.textBase}>
        {t.notification(message)}
      </Typography>
      <Typography variant="small_text" className={s.textSb}>
        {new Date(notifyAt).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
          ? t.today
          : new Date(notifyAt).toLocaleDateString('ru-RU')}
      </Typography>
    </div>
  )
}
