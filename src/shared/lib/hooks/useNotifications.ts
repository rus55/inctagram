import { useNotificationQuery } from '@/entities/notifications'

const useNotifications = (accessToken: string) => {
  const { data: notifications } = useNotificationQuery(accessToken)

  return { notifications }
}

export default useNotifications
