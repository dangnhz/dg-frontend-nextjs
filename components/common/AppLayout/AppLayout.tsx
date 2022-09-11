import React from 'react'
import PageWrapper from '../PageWrapper'
import Footer from '@components/common/Footer'
import Navbar from '@components/common/Navbar'
import AnimatedCursor from '../AnimatedCursor/AnimatedCursor'
import { useRouter } from 'next/router'

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="app">
      <Navbar />
        <PageWrapper key={router.asPath}>{children}</PageWrapper>
      <Footer />
      <AnimatedCursor />
    </div>
  )
}

export default AppWrapper
