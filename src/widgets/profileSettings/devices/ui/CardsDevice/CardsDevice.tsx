import React, { ReactNode } from 'react'

import { format } from 'date-fns'
import { LogOut } from 'lucide-react'

import s from './CardsDevice.module.scss'

import { LogOutIcon } from '@/shared/assets'
import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { LogOutButton } from '@/widgets/logOut'

type Props = {
  icon: ReactNode
  deviceName: string
  IP: string
  visited?: Date
  deviceId?: number
  handleDeleteSession?: (deviceId: number) => void
}

export const CardsCurrentDevice = ({ IP, deviceName, icon, visited }: Props) => {
  return (
    <div className={s.cardsDevice}>
      <svg className={s.icon}>{icon}</svg>
      <div className={s.details}>
        <Typography className={s.name} variant={'h3'}>
          {deviceName}
        </Typography>
        <Typography className={s.ip} variant={'small_text'}>
          IP:{IP}
        </Typography>
      </div>
    </div>
  )
}

export const CardsActiveDevice = ({
  IP,
  deviceName,
  icon,
  visited,
  handleDeleteSession,
  deviceId,
}: Props) => {
  const lastActiveDate = visited ? new Date(visited) : null
  const formattedDate = lastActiveDate ? format(lastActiveDate, 'yyyy-MM-dd') : ''
  const { t } = useTranslation()
  const onClikHandler = () => {
    handleDeleteSession && handleDeleteSession(deviceId!)
  }

  return (
    <div className={s.cardsDevice}>
      <svg className={s.icon}>{icon}</svg>
      <div className={s.details}>
        <Typography variant="h3" className={s.name}>
          {deviceName}
        </Typography>
        <Typography className={s.ip} variant="small_text">
          IP: {IP}
        </Typography>
        <Typography variant="small_text">Last Active: {formattedDate}</Typography>
      </div>
      <li className={s.button} onClick={onClikHandler}>
        <LogOutIcon /> {t.sidebar.log_out}
      </li>
    </div>
  )
}
