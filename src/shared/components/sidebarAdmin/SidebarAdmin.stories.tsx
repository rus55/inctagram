import { Meta } from '@storybook/react'

import { SidebarAdmin } from './SidebarAdmin'

export default {
  title: 'Components/Sidebar',
  component: SidebarAdmin,
} as Meta<typeof SidebarAdmin>

export const Default = {
  // @ts-ignore
  render: args => {
    return (
      <div>
        <div style={{ height: '50px', borderBottom: 'solid 1px #333' }}>Header</div>
        <div>
          <SidebarAdmin />
        </div>
      </div>
    )
  },
}