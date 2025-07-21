import React, { createContext, useState } from 'react'

// Creo il contesto globale
export const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {
  // Stato globale di esempio
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')

  // Valore che verrà fornito ai componenti figli
  const value = {
    user,
    setUser,
    theme,
    setTheme,
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider