import dynamic from 'next/dynamic'

import { getHeaderWithSidebarLayout } from '@/widgets/layouts'

// eslint-disable-next-line import/no-unresolved
const MessengerApp = dynamic(async () => await import('messengerApp/MessengerBlock'), {
  ssr: false,
})

function Messenger() {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <MessengerApp />
    </div>
  )
}

Messenger.getLayout = getHeaderWithSidebarLayout

export { Messenger }
