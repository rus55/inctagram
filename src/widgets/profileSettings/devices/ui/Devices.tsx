import React, {useEffect, useState} from 'react'

import s from './Devices.module.scss'

import {
    useDeleteAllMutation,
    useDeleteSessionMutation,
    useGetDevicesQuery,
} from "@/entities/device's"
import {ChromeIcon} from '@/shared/assets/icons/ChromeIcon'
import {MackIcon} from '@/shared/assets/icons/MackIcon'
import {PhoneIcon} from '@/shared/assets/icons/PhoneIcon'
import {Button, Typography} from '@/shared/components'
import {useErrorHandler, useFetchLoader, useTranslation} from '@/shared/lib'
import {useAuth} from '@/shared/lib/hooks/useAuth'
import {TabsLayout} from '@/widgets/layouts'
import {
    CardsActiveDevice,
    CardsCurrentDevice,
} from '@/widgets/profileSettings/devices/ui/CardsDevice/CardsDevice'

const Component = () => {
    const {accessToken} = useAuth()
    const [icon, setIcon] = useState<React.ReactNode>(null)

    const {data, isLoading, error} = useGetDevicesQuery({accessToken})
    const [deleteDevice, {isLoading: deleteLoadingAll, error: deleteErrorAll}] =
        useDeleteAllMutation()
    const {t} = useTranslation()
    const [deleteSessionDevice, {isLoading: deleteLoading, error: deleteError}] =
        useDeleteSessionMutation()



    useFetchLoader(isLoading || deleteLoading || deleteLoadingAll)

    useErrorHandler(
        (deleteError || deleteErrorAll) as CustomerError
    )
    const onClickHandler = () => {
        deleteDevice({accessToken})
    }

    const handleDeleteSession = () => {
        data && deleteSessionDevice({deviceId: data[0].deviceId, accessToken})
    }

    useEffect(() => {
        if (data && data[0].deviceName === 'phone') {
            setIcon(<PhoneIcon/>)
        } else if (data && data[0].osName === 'IOS') {
            setIcon(<MackIcon/>)
        } else {
            setIcon(<ChromeIcon/>)
        }
    }, [data])

    return (
        <div>
            {data && data.length > 0 ? (
                <>
                    <Typography variant="h3">Current Device</Typography>
                    <CardsCurrentDevice
                        key={data[0].deviceId}
                        icon={icon}
                        IP={data[0].ip}
                        deviceName={data[0].osName}
                    />
                    <div className={s.button}>
                        <Button onClick={onClickHandler} variant="outline" disabled={!data || data.length === 0}>
                            {t.devices.Terminate_sessions}
                        </Button>
                    </div>

                    {data.slice(0).map(device => (
                        <React.Fragment key={device.deviceId}>
                            <div className={s.spacer}></div>
                            <Typography variant="h3">Active Sessions</Typography>
                            <CardsActiveDevice
                                key={device.deviceId}
                                visited={device.lastActive}
                                icon={icon}
                                deviceName={device.osName}
                                IP={device.ip}
                                handleDeleteSession={handleDeleteSession}
                            />
                        </React.Fragment>
                    ))}
                </>
            ) : (
                ''
            )}
        </div>
    )
}

export const Devices = () => {
    return (
        <TabsLayout>
            <Component/>
        </TabsLayout>
    )
}
