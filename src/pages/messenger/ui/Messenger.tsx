import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { getMicrofrontLayout } from '@/widgets/layouts/microfront-layout/MicrofrontLayout'

const MessengerApp = dynamic<{ language?: string }>(
  // eslint-disable-next-line import/no-unresolved
  async () => await import('messengerApp/MessengerBlock'),
  {
    ssr: false,
  }
)

function Messenger() {
  const { locale } = useRouter()

  return (
    <div className="bg-dark-700 pt-6 pl-6 md:pr-12 lg:pb-[25px] h-full">
      <MessengerApp language={locale} />
    </div>
  )
}

Messenger.getLayout = getMicrofrontLayout

export { Messenger }
