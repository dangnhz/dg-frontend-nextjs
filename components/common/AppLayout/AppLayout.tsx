import React from 'react'
import PageWrapper from '../PageWrapper'
import Footer from '@components/common/Footer'
import Navbar from '@components/common/Navbar'
import AnimatedCursor from '../AnimatedCursor/AnimatedCursor'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="app">
      <Navbar />
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <PageWrapper key={router.asPath}>{children}</PageWrapper>
      </AnimatePresence>
      <Footer />
      <AnimatedCursor />
    </div>
  )
}

export default AppWrapper
