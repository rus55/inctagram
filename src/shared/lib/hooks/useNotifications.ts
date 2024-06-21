import { useNotificationQuery } from '@/entities/notifications'
import { useEffect, useState } from "react";

const useNotifications = (accessToken: string, event?: MessagesNotif | any) => {
  const [currentNotification, setCurrentNotification] = useState<MessagesNotif[]>([])

  const { data: notifications } = useNotificationQuery(accessToken)

  useEffect(() => {
    const today = new Date();
    const formattedToday = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`

    const notification = notifications?.items.find((notif: NotificationItems) => {
      const dateMatch = notif.message.match(/(\d{2}\/\d{2}\/\d{4})/)
      return dateMatch && dateMatch[0] === formattedToday
    });

    if (notification) {
      setCurrentNotification(prev => [...prev, notification])
    }
    if (event.length) {
      setCurrentNotification(prev => [...prev, event])
    }
  }, [notifications, event])


  return {  currentNotification }
}

export default useNotifications
