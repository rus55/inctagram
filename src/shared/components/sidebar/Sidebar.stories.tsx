import { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from './Sidebar'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
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
