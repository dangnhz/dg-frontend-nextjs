import React, { FC, ReactNode, useState, useContext, createContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { color } from 'theme/color';
import { theme} from 'theme/theme';

export const UIContext = createContext({})

export const useUI = () => {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const UIProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [currentTheme, setCurrentTheme] = useState('green')
  const newTheme = {...theme, primaryColor:color[currentTheme]}

  const value = {
    currentTheme,
    setCurrentTheme
  }
  return (
    <UIContext.Provider value={value}>
      <ThemeProvider theme={newTheme}>{children}</ThemeProvider>
    </UIContext.Provider>
  )
}
