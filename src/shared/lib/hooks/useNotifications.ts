import { Dispatch, useEffect, useState } from 'react'

import { format } from 'date-fns'

import { useNotificationQuery } from '@/entities/notifications'
import { useCurrentSubscriptionQuery } from '@/entities/subscription/api/subscriptionApi'

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
  const { data: currentSubscription } = useCurrentSubscriptionQuery(accessToken)
  const { data: notifications } = useNotificationQuery(accessToken)

  useEffect(() => {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    const lastMonthNotifications = notifications?.items.filter((notif: NotificationItems) => {
      const notifyDate = new Date(notif.notifyAt)

      const isRelevantMessage =
        currentSubscription?.hasAutoRenewal ||
        notif.message !==
          'The next subscription payment will be debited from your account after 1 day.'

      const isWithinLastMonth = notifyDate < now && notifyDate >= lastMonth

      return isRelevantMessage && isWithinLastMonth
    })

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
