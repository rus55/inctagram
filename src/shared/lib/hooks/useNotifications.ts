import { Dispatch, useEffect, useState } from 'react'

import { format } from 'date-fns'

import { useNotificationQuery } from '@/entities/notifications'

const uniqueNotifications = (
  arrayNotify: NotificationItems[],
  callback: Dispatch<
    (prev: (MessagesNotif | NotificationItems)[]) => (MessagesNotif | NotificationItems)[]
  >
) => {
  if (!arrayNotify) return
  callback(prev => {
    const seenIds = new Set()

    return [...prev, ...arrayNotify].filter(item => {
      if (seenIds.has(item.id)) {
        return false
      } else {
        seenIds.add(item.id)

        return true
      }
    })
  })
}

const useNotifications = (accessToken: string, event?: MessagesNotif) => {
  const [currentNotification, setCurrentNotification] = useState<
    (MessagesNotif | NotificationItems)[]
  >([])

  const { data: notifications } = useNotificationQuery(accessToken)

  useEffect(() => {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    const lastMonthNotifications = notifications?.items.filter(
      (notification: NotificationItems) => {
        const notifyDate = new Date(notification.notifyAt)

        return notifyDate < now && notifyDate >= lastMonth
      }
    )

    if (lastMonthNotifications?.length !== 0) {
      uniqueNotifications(lastMonthNotifications, setCurrentNotification)
    }

    const formattedToday = format(new Date(), 'dd.MM.yyyy')

    const notification = notifications?.items.filter((notif: NotificationItems) => {
      const dateMatch = format(new Date(notif.notifyAt), 'dd.MM.yyyy')

      return dateMatch === formattedToday
    })

    uniqueNotifications(notification, setCurrentNotification)

    if (event?.message) {
      setCurrentNotification(prev => [...prev, event])
    }
  }, [notifications, event])

  return { currentNotification }
}

export default useNotifications
