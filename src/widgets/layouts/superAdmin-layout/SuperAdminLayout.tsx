import { FC, ReactElement, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import s from './SuperAdminLayout.module.scss'

import { Scroller } from '@/shared/components/scroller/Scroller'
import { SidebarAdmin } from '@/shared/components/sidebarAdmin/SidebarAdmin'
import { useAppSelector } from '@/shared/lib'
import { HeaderAdmin } from '@/widgets/headerAdmin/ui/HeaderAdmin'

type Props = {
  children: ReactNode
}

export const SuperAdminLayout: FC<Props> = ({ children }) => {
  const router = useRouter()

  const isAdmin = useAppSelector(store => store.adminSlice.isAdmin)

  useEffect(() => {
    if (isAdmin) router.push('/superAdmin')
  }, [isAdmin])

  useEffect(() => {
    if (!isAdmin) router.push('/signin')
  }, [router, isAdmin])

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <HeaderAdmin />
      </div>
      <main className={s.main}>
        <div className={s.sidebar}>
          <SidebarAdmin />
        </div>

        <div className={s.wrapperContent}>
          <Scroller>{children}</Scroller>
        </div>
      </main>
    </div>
  )
}

export const getSuperAdminLayoutLayout = (page: ReactElement) => {
  return <SuperAdminLayout>{page}</SuperAdminLayout>
}
