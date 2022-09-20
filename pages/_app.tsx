import React, {useEffect} from 'react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { UIProvider } from 'context/UIContext'
import AppLayout from '@components/common/AppLayout'
import SearchProvider from 'context/SearchContext'
// Import Swiper styles
import 'swiper/css';

import '../styles/globals.scss'
import '@components/ui/Project/ProjectSlider/ProjectSlider.scss'

function MyApp({ Component, pageProps:p }: AppProps)  {
  const [queryClient] = React.useState(() => new QueryClient())
  const pageProps: any = p

  useEffect(() => {
    document.body.classList?.remove('is-loading')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SearchProvider>
          <UIProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </UIProvider>
        </SearchProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
