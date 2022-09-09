import React from 'react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";
import { UIProvider } from 'context/UIContext'
import AppLayout from '@components/common/AppLayout'
import SearchProvider from 'context/SearchContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
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
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}


export default MyApp
