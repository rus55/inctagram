import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useAppDispatch, useTranslation } from '.'

import { setAlert } from '@/application/services'
import { clearLocalUserData } from '@/entities/auth'

export const useErrorHandler = (error: CustomerError) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        dispatch(setAlert({ message: t.profile.auth_error, variant: 'error' }))
        dispatch(clearLocalUserData())
        router.push('/signin')
      } else {
        dispatch(setAlert({ message: t.profile.server_error, variant: 'error' }))
        console.error(error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])
}
