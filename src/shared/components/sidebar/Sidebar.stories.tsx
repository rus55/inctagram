import { Meta } from '@storybook/react'

import { Sidebar } from './Sidebar'

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as Meta<typeof Sidebar>

export const Default = {
  // @ts-ignore
  render: args => {
    return (
      <div>
        <div style={{ height: '50px', borderBottom: 'solid 1px #333' }}>Header</div>
        <div>
          <Sidebar />
        </div>
      </div>
    )
  },
}
