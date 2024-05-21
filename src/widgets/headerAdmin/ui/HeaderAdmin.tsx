import React, { FC, useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './HeaderAdmin.module.scss'

import { useLogOutMutation } from '@/entities/auth'
import { BookMarkIcon, FavoritesIcon, LogOutIcon, StatisticsIcon } from '@/shared/assets'
import { ProfileSettings } from '@/shared/assets/icons/ProfileSettings'
import { Button, CustomDropdown, CustomDropdownItem, Typography } from '@/shared/components'
import { NotificationBell } from '@/shared/components/notificatification-bell'
import {useAppSelector, useTranslation} from '@/shared/lib'
import { useAdmin } from '@/shared/lib/hooks/useAdmin'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { DropDownNotification } from '@/widgets/dropDownNotification'
import { LangSelectWidget } from '@/widgets/langSelect'

export const HeaderAdmin: FC = () => {
  const [toggle, setToggle] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()



  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      !menuRef.current?.contains(e.target as Node) && setToggle(false)
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  return (
    <header
      className={'header-three sticky-header w-full h-16 sticky lg:relative top-0 z-20 bg-dark-700'}
    >
      <div className="flex justify-between items-center h-16 max-[480px]:px-1 px-6 sm:px-16 py-3 border-b border-dark-300">

          <Link href="/superAdmin" className="text-light-100 text-[26px] font-semibold">
            InctagramSuperAdmin
          </Link>


        <div className="flex justify-center items-center space-x-6">
          <LangSelectWidget />
        </div>
      </div>
    </header>
  )
}
