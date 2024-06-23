import React, { Dispatch, FC, useEffect, useState } from 'react'

import { clsx } from 'clsx'
import { format } from 'date-fns'

import { Typography } from '../typography'

import s from './NotificationBell.module.scss'

import { FillBellIcon } from '@/shared/assets/icons/FillBellIcon'
import { OutlineBellIcon } from '@/shared/assets/icons/OutlineBellIcon'
import useNotifications from '@/shared/lib/hooks/useNotifications'

export type NotificationProps = {
  className?: string
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  accessToken: string
  eventNotif: MessagesNotif
}

export const NotificationBell = ({
  toggle,
  setToggle,
  accessToken,
  className,
  eventNotif,
}: NotificationProps) => {
  const classNames = {
    notificationBlock: clsx(s.notificationBlock, className),
  }

  const { currentNotification } = useNotifications(accessToken as string, eventNotif)

  let count: number = 0

  currentNotification.filter(notif => {
    if (format(new Date(), 'dd.MM.yyyy') <= format(new Date(notif.notifyAt), 'dd.MM.yyyy')) {
      ++count
    }
  })

  return (
    <button onClick={() => setToggle(!toggle)} className={classNames.notificationBlock}>
      {toggle ? <FillBellIcon className={s.iconColor} /> : <OutlineBellIcon className={s.icon} />}
      {!toggle && count !== 0 && (
        <Typography as="span" className={s.iconBadge}>
          {count}
        </Typography>
      )}
    </button>
  )
}
