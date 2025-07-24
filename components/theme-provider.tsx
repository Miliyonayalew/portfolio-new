"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

interface CustomThemeProviderProps extends Omit<ThemeProviderProps, 'children'> {
  children: React.ReactNode
}

export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "portfolio-theme",
  ...props 
}: CustomThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      storageKey={storageKey}
      disableTransitionOnChange={false}
      themes={["light", "dark", "system"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

// Custom hook for theme-aware components
export function useThemeClasses() {
  return {
    card: "theme-transition-colors card-hover",
    button: "theme-transition button-hover",
    input: "theme-transition-colors",
    dropdown: "theme-transition-colors bg-card/95 backdrop-blur-md border-border/50",
  }
}
