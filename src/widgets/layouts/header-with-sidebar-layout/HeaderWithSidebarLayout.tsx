import { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useMemo } from 'react'

import { useRouter } from 'next/router'

import { HeaderWidget } from '../../header'

import s from './HeaderWithSidebarLayout.module.scss'

import { Scroller } from '@/shared/components/scroller/Scroller'
import { Sidebar } from '@/shared/components/sidebar'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { useClient } from '@/shared/lib/hooks/useClient'
type Props = {
  children: ReactNode
}

export const HeaderWithSidebarLayout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const { isClient } = useClient()
  const { isAuth } = useAuth()

  useEffect(() => {
    !isAuth && isClient && router.push('/signin')
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

        <div className={s.wrapperContent}>
          <Scroller>{children}</Scroller>
        </div>
      </main>
    </div>
  )
}

export const getHeaderWithSidebarLayout = (page: ReactElement) => {
  return <HeaderWithSidebarLayout>{page}</HeaderWithSidebarLayout>
}
