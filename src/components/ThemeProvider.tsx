/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import { getCookie, setCookie } from "@/lib/cookies"

type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const THEME_COOKIE_NAME = "app_theme"
const SUPPORTED_THEMES = new Set<Theme>(["light", "dark"])

export const ThemeProvider = ({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => {
      const cookieTheme = getCookie(THEME_COOKIE_NAME) as Theme | undefined
      if (cookieTheme && SUPPORTED_THEMES.has(cookieTheme)) return cookieTheme

      const storedTheme = localStorage.getItem(storageKey) as Theme | null
      return (storedTheme && SUPPORTED_THEMES.has(storedTheme as Theme) ? storedTheme : null) || defaultTheme
    }
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setCookie(THEME_COOKIE_NAME, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
