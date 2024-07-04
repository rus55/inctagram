import { Meta } from '@storybook/react'

import { DropDownNotification } from '..'

export default {
  component: DropDownNotification,
  title: 'Components/DropDownNotification',
  tags: ['autodocs'],
} as Meta<typeof DropDownNotification>

export const DropDownNotificationDefault = () => {
  return (
    <div>
      <DropDownNotification
        deleteNotifications={() => {}}
        getAllNotifications={() => {}}
        accessToken={''}
        toggle={true}
        setCount={() => {}}
      />
    </div>
  )
}
