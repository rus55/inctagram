import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  BookMarkIcon,
  CreateIcon,
  CreatesIcon,
  FavoritesIcon,
  HomesIcon,
  IconBxHomeAlt,
  IconUser,
  IconUser2,
  LogOutIcon,
  MessangersIcon,
  MessengerIcon,
  SearchIcon,
  StatisticsIcon,
  CardsIcon,
  PostIcon,
} from '../../assets'

import s from './SidebarAdmin.module.scss'

import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { LogOutButton } from '@/widgets/logOut'

export const SidebarAdmin = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { isOpen } = useModal()

  return (
    <div className={s.box}>
      <div className={s.contentBox}>
        <div className={s.marginTop}></div>
        <ul>
          <li>
            <Link href={'/userList'} className={s.content}>
              {router.pathname == '/userList' ? <IconUser2 /> : <IconUser />}
              <span className={router.pathname === '/userList' ? s.activeLink : ''}>
                {t.sidebarAdmin.userList}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={'/statistics'}
              className={
                router.pathname === '/statistics' ? clsx(s.activeLink, s.content) : s.content
              }
            >
              <StatisticsIcon /> {t.sidebarAdmin.statistics}
            </Link>
          </li>
          <li>
            <Link href={'/paymentsList'} className={s.content}>
              {router.pathname === '/paymentsList' ? <MessangersIcon /> : <CardsIcon />}
              <span className={router.pathname === '/paymentsList' ? s.activeLink : ''}>
                {t.sidebarAdmin.paymentsList}
              </span>
            </Link>
          </li>
          <li>
            <Link href={'/postsList'} className={s.content}>
              {router.pathname === '/postsList' ? <MessangersIcon /> : <PostIcon />}
              <span className={router.pathname === '/postsList' ? s.activeLink : ''}>
                {t.sidebarAdmin.postsList}
              </span>
            </Link>
          </li>
        </ul>
        <div className={s.marginBox}></div>

        <div className={s.largeMargin}></div>
        <ul>
          <LogOutButton>
            <li className={s.content}>
              <LogOutIcon /> {t.sidebar.log_out}
            </li>
          </LogOutButton>
        </ul>
      </div>
    </div>
  )
}
