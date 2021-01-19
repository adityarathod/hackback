import { FC } from 'react'
import type { AppProps } from 'next/app'
import '../global.css'

import { Provider } from 'react-redux'
import store from '../store'

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
