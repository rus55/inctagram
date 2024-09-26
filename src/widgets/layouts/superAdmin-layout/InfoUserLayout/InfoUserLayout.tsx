import { FC, ReactElement, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { Scroller } from '@/shared/components/scroller/Scroller'
import { HeaderAdmin } from '@/widgets/headerAdmin'
import s from '@/widgets/layouts/superAdmin-layout/SuperAdminLayout.module.scss'

type Props = {
  children: ReactNode
}

export const InfoUserLayout: FC<Props> = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      router.push('/signin')
    }
  }, [router])

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <HeaderAdmin />
      </div>
      <main className={s.main}>
        <div className={s.wrapperContent}>
          <Scroller>{children}</Scroller>
        </div>
      </main>
    </div>
  )
}

export const getInfoUserLayout = (page: ReactElement) => {
  return <InfoUserLayout>{page}</InfoUserLayout>
}
