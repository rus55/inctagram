import { FC, ReactElement, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { HeaderWidget } from '../../header'
import BottomNavigation from '../mobile-navigation/mobile-navigation'

import s from './MicrofrontLayout.module.scss'

import { Sidebar } from '@/shared/components/sidebar'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { useClient } from '@/shared/lib/hooks/useClient'

type Props = {
  children: ReactNode
}

export const MicrofrontLayout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const { isAuth } = useAuth()
  const { isClient } = useClient()

  useEffect(() => {
    if (!isAuth && isClient) router.push('/signin')
  }, [isAuth, isClient, router])
  if (!isAuth) return null

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <HeaderWidget />
      </div>
      <main className={s.main}>
        <div className={s.sidebar}>
          <Sidebar />
        </div>

        <div className={s.wrapperContent}>{children}</div>
      </main>
      <BottomNavigation />
    </div>
  )
}

export const getMicrofrontLayout = (page: ReactElement) => {
  return <MicrofrontLayout>{page}</MicrofrontLayout>
}
