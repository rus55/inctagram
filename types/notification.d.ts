type NotificationItems = {
  id: number
  isRead: boolean
  message: string
  notifyAt: Date
}
interface INotification {
  pageSize: number
  totalCount: number
  items: NotificationItems[]
}