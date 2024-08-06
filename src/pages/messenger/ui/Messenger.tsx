import dynamic from 'next/dynamic'

import { getHeaderWithSidebarLayout } from '@/widgets/layouts'

// eslint-disable-next-line import/no-unresolved
const MessengerApp = dynamic(() => import('messengerApp/MessengerBlock'), { ssr: false })

function Messenger() {
  return <MessengerApp />
}

Messenger.getLayout = getHeaderWithSidebarLayout

export { Messenger }
