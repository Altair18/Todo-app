// src/context/ThemeContext.jsx
import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored !== null ? JSON.parse(stored) : false;
  });

  // toggles the <html> class so Tailwind’s dark: variants work
  useEffect(() => {
    const root = window.document.documentElement
    if (dark)  root.classList.add('dark')
    else       root.classList.remove('dark');
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
