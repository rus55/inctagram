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
    const [sortedDevices, setSortedDevices] = useState<any>([]); // Создайте состояние для отсортированных устройств



    useEffect(() => {
        if (data && data.length > 0) {
            const sorted = data.slice().sort((a, b) => {
                const dateA = new Date(a.lastActive);
                const dateB = new Date(b.lastActive);
                return dateB.getTime() - dateA.getTime();
            });

            setSortedDevices(sorted);
            console.log(sorted)
        }
    }, [data, isLoading]);



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
        if (data && data[0].deviceType === 'mobile') {
            setIcon(<PhoneIcon/>)
        } else if (data && data[0].osName === 'iOS') {
            setIcon(<MackIcon/>)
        } else {
            setIcon(<ChromeIcon/>)
        }
    }, [data,isLoading])

    return (
        <div>
            {sortedDevices && sortedDevices.length > 0 ? (
                <>
                    <Typography variant="h3">Current Device</Typography>
                    <CardsCurrentDevice
                        key={sortedDevices[0].deviceId}
                        icon={icon}
                        IP={sortedDevices[0].ip}
                        deviceName={sortedDevices[0].osName}
                    />
                    <div className={s.button}>
                        <Button onClick={onClickHandler} variant="outline" disabled={!sortedDevices || sortedDevices.length === 0}>
                            {t.devices.Terminate_sessions}
                        </Button>
                    </div>

                    {sortedDevices.slice(1).map((device:Device) => (
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
