import React, {CSSProperties} from 'react'
import { useUI } from 'context/UIContext';

import {motion} from 'framer-motion'

const transition = { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  initial: {
    opacity: 0,
    y: 30
  },
  enter: {
    opacity: 1,
    y:0,
    transition: transition
  },
  exit: {
    opacity: 0,
    scale: 1,
    transition: {
      ...transition
    }
  }
}

export interface CustomCSS extends CSSProperties {
  '--page-main-color': string;
}

const PageWrapper:React.FC<{ children: React.ReactNode }> = ({children} ) => {
  const {theme} = useUI();
  return (
    <motion.div className='page-wrapper' variants={variants} initial="initial" animate="enter" exit="exit"  style={{ "--page-main-color": theme.primaryColor } as CustomCSS}>{children}</motion.div>
  )
}


export default PageWrapper