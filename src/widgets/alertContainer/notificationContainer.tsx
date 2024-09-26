import { useEffect } from 'react'

import { clearAlert, selectAlert } from '@/application/services'
import { Alert } from '@/shared/components/alert/Alert'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

export const NotificationContainer = () => {
  const { message, variant } = useAppSelector(selectAlert)
  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(clearAlert())
  }

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        dispatch(clearAlert())
      }, 4000)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [message, dispatch])

  return <div>{message && <Alert message={message} onClose={onClose} variant={variant} />}</div>
}
