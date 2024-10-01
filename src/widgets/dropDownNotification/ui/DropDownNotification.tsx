import React, { useEffect, useState } from 'react'

import { clsx } from 'clsx'
import { isAfter, subMonths } from 'date-fns'

import s from './DropDownNotification.module.scss'

import {
  useGetNotificationsQuery,
  useUpdateNotificationsMutation,
} from '@/entities/notifications/api/notificationsApi'
import { SocketApi } from '@/entities/socket/socket-api'
import { Typography } from '@/shared/components'
import { NotificationItem } from '@/shared/components/notification-item/NotificationItem'
import { Scroller } from '@/shared/components/scroller/Scroller'
import { useTranslation } from '@/shared/lib'
import { useVisibleItems } from '@/shared/lib/hooks/useVisibleItems'

type Props = {
  toggle: boolean
  accessToken: string
  getAllNotifications: (val: (v: MessagesNotif[]) => void) => void
  deleteNotifications: (keys: number[]) => void
  setCount: (val: number) => void
}
export const DropDownNotification = ({
  toggle,
  accessToken,
  getAllNotifications,
  deleteNotifications,
  setCount,
}: Props) => {
  const classNames = clsx(s.dropDownNotification, toggle ? s.active : s.inactive)

  const { t } = useTranslation()

  const [eventNotif, setEventNotif] = useState<MessagesNotif[]>([])
  const visibleItems = useVisibleItems(eventNotif, toggle)

  const { data: notifications, refetch } = useGetNotificationsQuery(accessToken)
  const [readNotifications] = useUpdateNotificationsMutation()

  const filterNotifications = (notifications: NotificationItems[]) => {
    const now = new Date()
    const lastMonth = subMonths(now, 1)

    return notifications?.filter(notification => {
      const notifyDate = new Date(notification.notifyAt)

      return isAfter(notifyDate, lastMonth)
    })
  }
  const filteredNotifications = filterNotifications(notifications?.items)

  useEffect(() => {
    getAllNotifications(notif => {
      if (notif.length === 0) return setEventNotif([])
      setEventNotif(prev => {
        const existingIds = prev.map(item => item.id)
        const uniqueNewItems = notif.filter(item => !existingIds.includes(item.id))

        return prev.concat(uniqueNewItems)
      })
    })
  }, [SocketApi.socket])

  useEffect(() => {
    if (visibleItems.length > 0) {
      readNotifications({ body: { ids: visibleItems }, accessToken })
      setCount(0)
    }

    return () => {
      deleteNotifications(visibleItems)
      if (visibleItems.length > 0) {
        refetch()
      }
    }
  }, [visibleItems])

  return (
    <div className={classNames}>
      <Typography className={s.header} variant="regular_text_16">
        {t.notification_menu.title}
      </Typography>
      <Scroller>
        {eventNotif.map(item => (
          <NotificationItem
            key={item.id}
            data-id={item.id.toString()}
            message={item.message}
            notifyAt={item.notifyAt}
            newMessage={!item.isRead}
          />
        ))}
        {filteredNotifications
          ?.filter((item: NotificationItems) => item.isRead)
          .map((notification: NotificationItems) => {
            return (
              <NotificationItem
                key={notification.id}
                message={notification.message}
                notifyAt={notification.notifyAt}
              />
            )
          })}
      </Scroller>
    </div>
  )
}
