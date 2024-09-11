import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/application/appStore'
import { setLoginUser } from '@/entities/auth/model/authSlice'
import { useClient } from '@/shared/lib/hooks/useClient'

export function Github() {
  const searchParams = useSearchParams()

  const email = searchParams?.get('email') as string
  const accessToken = searchParams?.get('accessToken') as string

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isClient } = useClient()

  useEffect(() => {
    if (email && accessToken) {
      dispatch(setLoginUser({ email, accessToken }))
    }
    router.push('/my-profile')
  }, [accessToken, dispatch, email, router])

  return (
    <>
      <div>Github authorization...</div>
      {!accessToken && isClient && <div className="text-red-600">Authorization error!</div>}
    </>
  )
}
