import React, { FC, useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './HeaderWidget.module.scss'

import { useLogOutMutation } from '@/entities/auth'
import { SocketApi } from '@/entities/socket/socket-api'
import { BookMarkIcon, FavoritesIcon, LogOutIcon, StatisticsIcon } from '@/shared/assets'
import { ProfileSettings } from '@/shared/assets/icons/ProfileSettings'
import { Button, CustomDropdown, CustomDropdownItem, Typography } from '@/shared/components'
import { NotificationBell } from '@/shared/components/notificatification-bell'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import useIndexedDB from '@/shared/lib/hooks/useIndexedDB'
import { DropDownNotification } from '@/widgets/dropDownNotification'
import { LangSelectWidget } from '@/widgets/langSelect'

export const HeaderWidget: FC = () => {
  const [toggle, setToggle] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  const [logOut] = useLogOutMutation()

  const [count, setCount] = useState<number>(0)
  const { isAuth, accessToken } = useAuth()
  const { addNotification, getAllNotifications, deleteNotifications } = useIndexedDB('myDatabase', {
    notificationStore: 'notification',
  })
  const router = useRouter()

  const updateStateNotifications = () => {
    getAllNotifications(notif => {
      setCount(notif.length)
    })
  }

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      !menuRef.current?.contains(e.target as Node) && setToggle(false)
    }

    document.addEventListener('mousedown', handler)

    if (isAuth) {
      SocketApi.creatConnection(accessToken as string)

      SocketApi.socket?.on('notifications', event => {
        if (event.length !== 0) {
          addNotification(event, updateStateNotifications)
        }
      })
    }

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [accessToken, SocketApi.socket, addNotification])

  return (
    <header
      className={'header-three sticky-header w-full h-16 sticky lg:relative top-0 z-20 bg-dark-700'}
    >
      <div className="flex justify-between items-center h-16 max-[480px]:px-1 px-6 sm:pl-16 sm:pr-19 py-3 border-b border-dark-300">
        {isAuth ? (
          <Link href="/my-profile" className="text-light-100 text-[26px] font-semibold">
            Inctagram
          </Link>
        ) : (
          <Link href="/public-page" className="text-light-100 text-[26px] font-semibold">
            Inctagram
          </Link>
        )}

        <div className="flex justify-center items-center space-x-6">
          {isAuth && (
            <div className="hidden lg:flex relative" ref={menuRef}>
              <NotificationBell count={count} toggle={toggle} setToggle={setToggle} />
              <DropDownNotification
                setCount={setCount}
                deleteNotifications={deleteNotifications}
                getAllNotifications={getAllNotifications}
                accessToken={accessToken as string}
                toggle={toggle}
              />
            </div>
          )}
          <LangSelectWidget />
          {!isAuth && (
            <div className="flex justify-center items-center">
              <Button style={{ border: 'inherit' }} variant="link">
                <Link href="/signin">{t.signin.log_in}</Link>
              </Button>
              <div className={s.buttonWrapper}>
                <Button variant="primary">
                  <Link href="/signup">{t.signin.sign_up}</Link>
                </Button>
              </div>
            </div>
          )}

          {isAuth && (
            <div className={s.wrappedActionMenu}>
              <CustomDropdown
                trigger={
                  <div>
                    <Typography variant="h1" className={s.content}>
                      ...
                    </Typography>
                  </div>
                }
                align={'end'}
                className="flex lg:hidden"
              >
                <CustomDropdownItem>
                  <Link
                    href={'/my-profile/general-information'}
                    className={clsx(
                      router.pathname === '/my-profile/general-information' && s.activeLink,
                      s.content
                    )}
                  >
                    <ProfileSettings /> {t.sidebar.settings}
                  </Link>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <Link
                    href={'/statistics'}
                    className={clsx(router.pathname === '/statistics' && s.activeLink, s.content)}
                  >
                    <StatisticsIcon />
                    {t.sidebar.statistics}
                  </Link>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <Link href={'/favorites'} className={clsx(s.content, s.largeMargin)}>
                    {router.pathname === '/favorites' ? <BookMarkIcon /> : <FavoritesIcon />}
                    <span className={router.pathname === '/favorites' ? s.activeLink : ''}>
                      {t.sidebar.favorites}
                    </span>
                  </Link>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <div onClick={() => logOut(accessToken as string)} className={s.content}>
                    <LogOutIcon /> {t.sidebar.log_out}
                  </div>
                </CustomDropdownItem>
              </CustomDropdown>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
