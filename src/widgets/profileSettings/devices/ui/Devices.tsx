import React, { useEffect, useState } from 'react'

import s from './Devices.module.scss'

import {
  useDeleteAllMutation,
  useDeleteSessionMutation,
  useGetDevicesQuery,
} from "@/entities/device's"
import { ChromeIcon } from '@/shared/assets/icons/ChromeIcon'
import { MackIcon } from '@/shared/assets/icons/MackIcon'
import { PhoneIcon } from '@/shared/assets/icons/PhoneIcon'
import { Button, Typography } from '@/shared/components'
import { useErrorHandler, useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { TabsLayout } from '@/widgets/layouts'
import {
  CardsActiveDevice,
  CardsCurrentDevice,
} from '@/widgets/profileSettings/devices/ui/CardsDevice/CardsDevice'

const Component = () => {
  const { t } = useTranslation()

  const { accessToken } = useAuth()
  const { data, isLoading, error } = useGetDevicesQuery({ accessToken })
  const [deleteDevice, { isLoading: deleteLoadingAll, error: deleteErrorAll }] =
    useDeleteAllMutation()

  const [deleteSessionDevice, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteSessionMutation()
  const [sortedDevices, setSortedDevices] = useState<Device[]>([])

  useEffect(() => {
    if (data && data.length > 0) {
      const parsedData = data.map((item: Device) => ({
        ...item,
      }))
      const sorted = parsedData.sort((a, b) => {
        return a.deviceId - b.deviceId
      })

      setSortedDevices(sorted)
    }
  }, [data])

  useFetchLoader(isLoading || deleteLoading || deleteLoadingAll)

  useErrorHandler((deleteError || deleteErrorAll) as CustomerError)
  const onClickHandler = () => {
    deleteDevice({ accessToken })
  }

  const handleDeleteSession = (deviceId: number) => {
    data && deleteSessionDevice({ deviceId, accessToken })
  }

  return (
    <div>
      {sortedDevices.length > 0 && (
        <>
          <Typography className={s.typorhy} variant="h3">
            Current Device
          </Typography>
          <CardsCurrentDevice
            key={sortedDevices[0].deviceId}
            icon={sortedDevices[0].deviceType === 'mobile' ? <PhoneIcon /> : <MackIcon />}
            IP={sortedDevices[0].ip}
            deviceName={sortedDevices[0].osName}
          />
          <div className={s.button}>
            <Button
              onClick={onClickHandler}
              variant="outline"
              disabled={!sortedDevices || sortedDevices.length === 0}
            >
              {t.devices.Terminate_sessions}
            </Button>
          </div>
        </>
      )}

      {sortedDevices.length > 0 && (
        <>
          {sortedDevices.slice(1).map(device => (
            <React.Fragment key={device.deviceId}>
              <Typography className={s.typorhy} variant="h3">
                Active Devices
              </Typography>
              <CardsActiveDevice
                key={device.deviceId}
                visited={device.lastActive}
                icon={device.deviceType === 'mobile' ? <PhoneIcon /> : <MackIcon />}
                deviceName={device.osName}
                IP={device.ip}
                deviceId={device.deviceId}
                handleDeleteSession={handleDeleteSession}
              />
            </React.Fragment>
          ))}
        </>
      )}

      <div className={s.spacer}></div>
    </div>
  )
}

export const Devices = () => {
  return (
    <TabsLayout>
      <Component />
    </TabsLayout>
  )
}
