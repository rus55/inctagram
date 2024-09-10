import { Meta } from '@storybook/react'

import { SidebarAdmin } from './SidebarAdmin'

export default {
  title: 'Components/SidebarAdmin',
  component: SidebarAdmin,
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarAdmin>

export const Default = {
  render: () => {
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
