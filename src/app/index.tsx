import './styles/globals.css'
import './styles/index.scss'
import './styles/nprogress.css'

import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import type { ReactElement, ReactNode } from 'react'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import type { NextPage } from 'next'
import { AppProps } from 'next/app'

import { ReduxProvider } from './providers'

import { useLoader } from '@/shared/lib'
import { NotificationContainer } from '@/widgets/alertContainer'

TimeAgo.addLocale(en)
TimeAgo.addLocale(ru)

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page)

  useLoader()

  return (
    <ReduxProvider>
      <>
        {getLayout(
          <>
            <Component {...pageProps} />
            <NotificationContainer />
          </>
        )}
      </>
    </ReduxProvider>
  )
}
