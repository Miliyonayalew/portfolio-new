"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef, useCallback } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const lastThemeRef = useRef<string | null>(null)

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

  // Monitor theme changes for system theme
  useEffect(() => {
    if (theme === "system" && resolvedTheme && resolvedTheme !== lastThemeRef.current) {
      lastThemeRef.current = resolvedTheme
      // Force a re-render when system theme changes
      const event = new CustomEvent('themechange', { detail: { theme: resolvedTheme } })
      window.dispatchEvent(event)
    }
  }, [theme, resolvedTheme])

  // Optimized theme change handler with performance improvements
  const handleThemeChange = useCallback(async (newTheme: string) => {
    if (isTransitioning || newTheme === theme) return
    
    setIsTransitioning(true)
    setIsDropdownOpen(false)
    
    // Immediate theme change for better responsiveness
    setTheme(newTheme)
    
    // Reset transition state after theme change
    setTimeout(() => setIsTransitioning(false), 200)
  }, [theme, setTheme, isTransitioning])

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

  const themeOptions = [
    {
      key: "light",
      label: "Light",
      icon: Sun,
      color: "text-amber-500",
      bgColor: "bg-gradient-to-br from-amber-400 to-orange-500",
      isActive: theme === "light",
      description: "Clean and bright"
    },
    {
      key: "dark",
      label: "Dark", 
      icon: Moon,
      color: "text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-500 to-purple-600",
      isActive: theme === "dark",
      description: "Easy on the eyes"
    },
    {
      key: "system",
      label: "System",
      icon: Monitor,
      color: "text-green-500",
      bgColor: "bg-gradient-to-br from-green-400 to-emerald-500",
      isActive: theme === "system",
      description: "Follows your OS",
      sublabel: theme === "system" ? `(${resolvedTheme === "dark" ? "Dark" : "Light"})` : undefined
    }
  ]

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        disabled={isTransitioning}
        className={`relative overflow-hidden theme-transition button-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label={`Current theme: ${getThemeLabel()}. Click to change theme.`}
        onClick={() => !isTransitioning && setIsDropdownOpen(!isDropdownOpen)}
        onMouseEnter={() => !isTransitioning && setIsDropdownOpen(true)}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex items-center justify-center w-[1.2rem] h-[1.2rem]">
          {/* Sun Icon with enhanced animations */}
          <Sun 
            className={`absolute h-[1.2rem] w-[1.2rem] theme-icon-transition ${
              shouldShowSun && !shouldShowMonitor
                ? "rotate-0 scale-100 opacity-100 text-amber-500" 
                : "rotate-90 scale-0 opacity-0"
            }`}
          />
          
          {/* Moon Icon with enhanced animations */}
          <Moon 
            className={`absolute h-[1.2rem] w-[1.2rem] theme-icon-transition ${
              shouldShowMoon && !shouldShowMonitor
                ? "rotate-0 scale-100 opacity-100 text-blue-400" 
                : "-rotate-90 scale-0 opacity-0"
            }`}
          />
          
          {/* Monitor Icon for System Theme */}
          <Monitor 
            className={`absolute h-[1.2rem] w-[1.2rem] theme-icon-transition ${
              shouldShowMonitor
                ? "rotate-0 scale-100 opacity-100 text-green-500" 
                : "rotate-180 scale-0 opacity-0"
            }`}
          />
        </div>
        
        {/* Transition indicator */}
        {isTransitioning && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
        )}
        
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Enhanced Dropdown */}
      <div
        ref={dropdownRef}
        className={`absolute right-0 top-full mt-2 w-56 z-50 transition-all duration-300 ease-out origin-top-right ${
          isDropdownOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
          <div className="py-3">
            {themeOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <button
                  key={option.key}
                  disabled={isTransitioning}
                  onClick={() => handleThemeChange(option.key)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 hover:bg-accent/50 focus:bg-accent/50 focus:outline-none group ${
                    option.isActive ? "bg-accent/30" : ""
                  } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{
                    transitionDelay: `${index * 75}ms`
                  }}
                >
                  <div className={`p-2 rounded-lg ${option.isActive ? option.bgColor + '/20' : 'bg-muted/50'} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    <IconComponent 
                      className={`h-4 w-4 ${option.isActive ? option.color : 'text-muted-foreground'} transition-all duration-300`} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold transition-colors duration-200 ${
                      option.isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-0.5">
                      {option.description}
                    </div>
                    {option.sublabel && (
                      <div className="text-xs text-primary/80 mt-0.5 font-medium">
                        {option.sublabel}
                      </div>
                    )}
                  </div>
                  
                  {option.isActive && (
                    <div className={`h-2 w-2 rounded-full ${option.bgColor} animate-pulse shadow-lg ring-2 ring-background`} />
                  )}
                </button>
              )
            })}
          </div>
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        </div>
        
        {/* Enhanced dropdown arrow */}
        <div className="absolute -top-1 right-4 w-2 h-2 bg-card/95 border-l border-t border-border/50 transform rotate-45 backdrop-blur-xl shadow-sm" />
      </div>
    </div>
  )
}
