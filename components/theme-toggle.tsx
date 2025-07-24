"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative overflow-hidden theme-transition"
        disabled
      >
        <div className="h-[1.2rem] w-[1.2rem] loading-shimmer rounded" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  const getThemeLabel = () => {
    if (theme === "system") {
      return `System (${resolvedTheme === "dark" ? "Dark" : "Light"})`
    }
    return theme === "dark" ? "Dark" : "Light"
  }

  // Determine which icons should be visible based on theme
  const shouldShowSun = theme === "light" || (theme === "system" && resolvedTheme === "light")
  const shouldShowMoon = theme === "dark" || (theme === "system" && resolvedTheme === "dark")
  const shouldShowMonitor = theme === "system"

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    setIsDropdownOpen(false)
  }

  const themeOptions = [
    {
      key: "light",
      label: "Light",
      icon: Sun,
      color: "text-amber-500",
      bgColor: "bg-amber-500",
      isActive: theme === "light"
    },
    {
      key: "dark",
      label: "Dark", 
      icon: Moon,
      color: "text-blue-400",
      bgColor: "bg-blue-400",
      isActive: theme === "dark"
    },
    {
      key: "system",
      label: "System",
      icon: Monitor,
      color: "text-green-500",
      bgColor: "bg-green-500",
      isActive: theme === "system",
      sublabel: theme === "system" ? `(${resolvedTheme === "dark" ? "Dark" : "Light"})` : undefined
    }
  ]

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="relative overflow-hidden theme-transition button-hover focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`Current theme: ${getThemeLabel()}. Click to change theme.`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onMouseEnter={() => setIsDropdownOpen(true)}
      >
        <div className="relative flex items-center justify-center w-[1.2rem] h-[1.2rem]">
          {/* Sun Icon */}
          <Sun 
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out ${
              shouldShowSun && !shouldShowMonitor
                ? "rotate-0 scale-100 opacity-100" 
                : "rotate-90 scale-0 opacity-0"
            }`}
          />
          
          {/* Moon Icon */}
          <Moon 
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out ${
              shouldShowMoon && !shouldShowMonitor
                ? "rotate-0 scale-100 opacity-100" 
                : "-rotate-90 scale-0 opacity-0"
            }`}
          />
          
          {/* Monitor Icon for System Theme */}
          <Monitor 
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-in-out ${
              shouldShowMonitor
                ? "rotate-0 scale-100 opacity-100" 
                : "rotate-180 scale-0 opacity-0"
            }`}
          />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Custom Smooth Dropdown */}
      <div
        ref={dropdownRef}
        className={`absolute right-0 top-full mt-2 w-48 z-50 transition-all duration-300 ease-out origin-top-right ${
          isDropdownOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <div className="bg-card/95 backdrop-blur-md border border-border/50 rounded-lg shadow-xl ring-1 ring-black/5 overflow-hidden">
          <div className="py-2">
            {themeOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <button
                  key={option.key}
                  onClick={() => handleThemeChange(option.key)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 hover:bg-accent/50 focus:bg-accent/50 focus:outline-none group ${
                    option.isActive ? "bg-accent/30" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <div className={`p-1.5 rounded-md ${option.isActive ? option.bgColor + '/20' : 'bg-muted/50'} transition-all duration-200 group-hover:scale-110`}>
                    <IconComponent 
                      className={`h-4 w-4 ${option.isActive ? option.color : 'text-muted-foreground'} transition-all duration-200`} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium transition-colors duration-200 ${
                      option.isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {option.label}
                    </div>
                    {option.sublabel && (
                      <div className="text-xs text-muted-foreground/70 mt-0.5">
                        {option.sublabel}
                      </div>
                    )}
                  </div>
                  
                  {option.isActive && (
                    <div className={`h-2 w-2 rounded-full ${option.bgColor} animate-pulse shadow-sm ring-2 ring-background`} />
                  )}
                </button>
              )
            })}
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        </div>
        
        {/* Dropdown arrow/pointer */}
        <div className="absolute -top-1 right-4 w-2 h-2 bg-card/95 border-l border-t border-border/50 transform rotate-45 backdrop-blur-md" />
      </div>
    </div>
  )
}
