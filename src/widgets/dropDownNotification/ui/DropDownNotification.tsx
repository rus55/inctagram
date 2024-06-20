import React from 'react'

import { clsx } from 'clsx'

import s from './DropDownNotification.module.scss'

import { Typography } from '@/shared/components'
import { NotificationItem } from '@/shared/components/notification-item/NotificationItem'
import { Scroller } from '@/shared/components/scroller/Scroller'
import { useTranslation } from '@/shared/lib'
import useNotifications from '@/shared/lib/hooks/useNotifications'

type Props = {
  toggle: boolean
  accessToken: string
}
export const DropDownNotification = ({ toggle, accessToken }: Props) => {
  const { notifications } = useNotifications(accessToken)

  const classNames = clsx(s.dropDownNotification, toggle ? s.active : s.inactive)

  const { t } = useTranslation()

  console.log(notifications)

  return (
    <div className={classNames}>
      <Typography className={s.header} variant="regular_text_16">
        {t.notification_menu.title}
      </Typography>
      <Scroller>
        {/*{Array.from({ length: 10 }, (_, i) => (*/}
        {/*  <NotificationItem key={i} />*/}
        {/*))}*/}
        {notifications?.items.map((item: NotificationItems) => {
          return <NotificationItem key={item.id} message={item.message} />
        })}
      </Scroller>
    </div>
  )
}
