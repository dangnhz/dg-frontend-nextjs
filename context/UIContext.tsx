import React, { FC, ReactNode, useState, useContext, createContext } from 'react'
import {colors, DGColor } from '@theme/colors';

interface ThemeState {
  theme: DGColor;
  setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
}

const initialState : ThemeState = {
  theme: {...colors},
  setCurrentTheme: () => {}
}

export const UIContext = createContext(initialState)

export const useUI = () => {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const UIProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [currentTheme, setCurrentTheme] = useState('green')
  const theme = {...colors, primaryColor:colors[currentTheme]}

  const value = {
    theme,
    setCurrentTheme
  }
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}
