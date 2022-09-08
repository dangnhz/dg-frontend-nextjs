import React from 'react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { UIProvider } from 'context/UIContext'
import AppLayout from '@components/common/AppLayout'
import PageWrapper from '@components/common/PageWrapper'
import SearchProvider from 'context/SearchContext'
import AnimatedCursor from '@components/common/AnimatedCursor'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@components/ui/Navbar'
import Footer from '@components/ui/Footer'
import '../styles/globals.scss'

function MyApp({ Component, pageProps, router }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SearchProvider>
          <UIProvider>
            <AppLayout>
              <Navbar />
              <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
                <PageWrapper key={router.asPath}>
                  <Component {...pageProps} />
                </PageWrapper>
              </AnimatePresence>
              {/* <Footer /> */}
              <AnimatedCursor />
            </AppLayout>
          </UIProvider>
        </SearchProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}


export default MyApp
