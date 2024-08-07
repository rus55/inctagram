import { Provider } from 'react-redux'

import store from '../appStore'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
