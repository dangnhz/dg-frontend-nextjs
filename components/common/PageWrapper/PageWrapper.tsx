import React, { CSSProperties } from 'react'
import { useUI } from 'context/UIContext'

export interface CustomCSS extends CSSProperties {
  '--page-main-color': string
}

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useUI()
  return (
    <div className="page-wrapper" style={{ '--page-main-color': theme.primaryColor } as CustomCSS}>
      {children}
    </div>
  )
}

export default PageWrapper
