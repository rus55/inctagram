import { FC, ReactElement, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { HeaderWidget } from '../../header'
import BottomNavigation from '../mobile-navigation/mobile-navigation'

import s from './SuperAdminLayout.module.scss'

import { Scroller } from '@/shared/components/scroller/Scroller'
import { Sidebar } from '@/shared/components/sidebar'
import { useAdmin } from '@/shared/lib/hooks/useAdmin'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { useClient } from '@/shared/lib/hooks/useClient'

type Props = {
  children: ReactNode
}

export const SuperAdminLayout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const { isAuth } = useAuth()
  const { isClient } = useClient()
  const { isAdmin } = useAdmin()

  useEffect(() => {
    if (isAdmin && !isAuth) router.push('/superAdmin')
  }, [isAdmin])

  // useEffect(() => {
  //     if (!isAuth && isClient && !isAdmin) router.push('/signin')
  // }, [isAuth, isClient, router])
  if (!isAuth) return null

  return (
    <div className={s.wrapper}>
      {/*<div className={s.header}>*/}
      {/*    <HeaderWidget/>*/}
      {/*</div>*/}
      {/*<main className={s.main}>*/}
      {/*    <div className={s.sidebar}>*/}
      {/*        <Sidebar/>*/}
      {/*    </div>*/}

      {/*    <div className={s.wrapperContent}>*/}
      {/*        <Scroller>{children}</Scroller>*/}
      {/*    </div>*/}
      {/*</main>*/}
      {/*<BottomNavigation/>*/}
    </div>
  )
}

export const getSuperAdminLayoutLayout = (page: ReactElement) => {
  return <SuperAdminLayout>{page}</SuperAdminLayout>
}
