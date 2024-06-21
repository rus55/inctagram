import React from 'react'

import { clsx } from 'clsx'

import s from './DropDownNotification.module.scss'

import { Typography } from '@/shared/components'
import { NotificationItem } from '@/shared/components/notification-item/NotificationItem'
import { Scroller } from '@/shared/components/scroller/Scroller'
import { useTranslation } from '@/shared/lib'

type Props = {
  toggle: boolean
  currentNotification: MessagesNotif[]
}
export const DropDownNotification = ({ toggle, currentNotification }: Props) => {

  console.log(currentNotification);
  const classNames = clsx(s.dropDownNotification, toggle ? s.active : s.inactive)

  const { t } = useTranslation()

  return (
    <div className={classNames}>
      <Typography className={s.header} variant="regular_text_16">
        {t.notification_menu.title}
      </Typography>
      <Scroller>
        {currentNotification?.map((item: MessagesNotif) => {
          return <NotificationItem key={item.id} message={item.message} />
        })}
      </Scroller>
    </div>
  )
}
