import React from 'react'

import { clsx } from 'clsx'
import { format } from 'date-fns'

import s from './DropDownNotification.module.scss'

import { Typography } from '@/shared/components'
import { NotificationItem } from '@/shared/components/notification-item/NotificationItem'
import { Scroller } from '@/shared/components/scroller/Scroller'
import { useTranslation } from '@/shared/lib'
import useNotifications from '@/shared/lib/hooks/useNotifications'
import { useCurrentSubscriptionQuery } from "@/entities/subscription/api/subscriptionApi";

type Props = {
  toggle: boolean
  accessToken: string
  eventNotif: MessagesNotif
}
export const DropDownNotification = ({ toggle, accessToken, eventNotif }: Props) => {
  const classNames = clsx(s.dropDownNotification, toggle ? s.active : s.inactive)

  const { t } = useTranslation()

  const { data: currentSubscription } = useCurrentSubscriptionQuery(accessToken)
  const { currentNotification } = useNotifications(accessToken as string, eventNotif)

  return (
    <div className={classNames}>
      <Typography className={s.header} variant="regular_text_16">
        {t.notification_menu.title}
      </Typography>
      <Scroller>
        {currentNotification?.filter(notif =>
          currentSubscription?.hasAutoRenewal
          || notif.message
          !== 'The next subscription payment will be debited from your account after 1 day.'
        ).map(item => {
          const newMessage =
            format(new Date(), 'dd.MM.yyyy') <= format(new Date(item.notifyAt), 'dd.MM.yyyy')

          return <NotificationItem key={item.id} message={item.message} newMessage={newMessage} />
        })}
      </Scroller>
    </div>
  )
}
