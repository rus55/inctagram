import { useEffect, useState } from 'react'

import { SocketApi } from '@/entities/socket/socket-api'

export const useConnectSocket = (token: string, isAuth: boolean) => {
  const [event, setEvent] = useState<any[]>([])

  const connectSocket = () => {
    SocketApi.creatConnection(token)

    SocketApi.socket?.timeout(30000).on('notifications', event => {
      setEvent(prev => [event, ...prev])
    })
  }

  useEffect(() => {
    if (!isAuth) return
    connectSocket()
  }, [])

  return { event }
}
