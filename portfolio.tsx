"use client"

import React from "react"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { CORE_CONTENT } from "@/constants/core-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "./components/theme-toggle"
import { AnimatedBackground } from "./components/animated-background"
import { ScrollProgress } from "./components/scroll-progress"
import { ExperienceTimeline } from "./components/experience-timeline"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Server,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Download,
  Star,
  Users,
  Coffee,
  Award,
  Send,
  CheckCircle,
  Loader2,
  Zap,
  Smartphone,
  Globe,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
// Remove: import { useForm } from '@formspree/react'

// Custom hooks
function useTypingAnimation(texts: string[], speed = 100, deleteSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[currentIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    )

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting, texts, speed, deleteSpeed, pauseTime])

  return displayText
}

function useAnimatedCounter(end: number, duration = 1000, start = 0) {
  const [count, setCount] = useState(start)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const timer = setInterval(() => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(start + (end - start) * easeOutQuart))

            if (progress === 1) {
              clearInterval(timer)
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, end, duration, start])

  return { count, ref }
}

function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { isVisible, ref }
}

function HeroSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setPos({ x, y })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])
  // Animate on mobile
  useEffect(() => {
    let frame: number
    let t = 0
    function animate() {
      t += 0.01
      setPos((prev) => {
        if (window.innerWidth < 768) {
          return {
            x: 50 + Math.sin(t) * 20,
            y: 50 + Math.cos(t * 0.7) * 20,
          }
        }
        return prev
      })
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])
  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0"
      style={{
        background: `radial-gradient(ellipse 60% 40% at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.25) 0%, rgba(236,72,153,0.18) 60%, transparent 100%)`,
        transition: "background 0.3s cubic-bezier(.4,0,.2,1)",
      }}
    />
  )
}

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let width = 0, height = 0
    let animationId: number
    function resize() {
      if (!canvas) return
      width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth
      height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resize()
    window.addEventListener("resize", resize)
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1.5,
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.3 + 0.1,
      o: Math.random() * 0.5 + 0.2,
    }))
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += Math.cos(p.a) * p.s
        p.y += Math.sin(p.a) * p.s
        p.a += (Math.random() - 0.5) * 0.02
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(236,72,153,${p.o})`
        ctx.shadowColor = "rgba(99,102,241,0.18)"
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />
}

function SectionBackground({
  color1 = 'rgba(99,102,241,0.18)',
  color2 = 'rgba(236,72,153,0.12)',
  color3 = 'transparent',
  size = '60% 40%',
  x = 50,
  y = 50,
  particleColor = 'rgba(99,102,241,0.13)',
  particleCount = 18,
  z = 'z-0',
}: {
  color1?: string
  color2?: string
  color3?: string
  size?: string
  x?: number
  y?: number
  particleColor?: string
  particleCount?: number
  z?: string
}) {
  const [pos, setPos] = useState({ x, y })
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setPos({ x, y })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])
  // Animate on mobile
  useEffect(() => {
    let frame: number
    let t = 0
    function animate() {
      t += 0.01
      setPos((prev) => {
        if (window.innerWidth < 768) {
          return {
            x: x + Math.sin(t) * 20,
            y: y + Math.cos(t * 0.7) * 20,
          }
        }
        return prev
      })
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [x, y])
  // Particles
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let width = 0, height = 0
    let animationId: number
    function resize() {
      if (!canvas) return
      width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth
      height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resize()
    window.addEventListener("resize", resize)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1.5,
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.2 + 0.07,
      o: Math.random() * 0.4 + 0.15,
    }))
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += Math.cos(p.a) * p.s
        p.y += Math.sin(p.a) * p.s
        p.a += (Math.random() - 0.5) * 0.02
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.shadowColor = color1
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [color1, particleColor, particleCount])
  return (
    <>
      <div
        className={`pointer-events-none absolute inset-0 w-full h-full ${z}`}
        style={{
          background: `radial-gradient(ellipse ${size} at ${pos.x}% ${pos.y}%, ${color1} 0%, ${color2} 60%, ${color3} 100%)`,
          transition: "background 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      />
      <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${z} pointer-events-none`} />
    </>
  )
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [style, setStyle] = React.useState<React.CSSProperties>({})
  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * 12
    const rotateY = ((x - centerX) / centerX) * -12
    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    })
  }
  function handleMouseLeave() {
    setStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)"
    })
  }
  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 will-change-transform cursor-pointer"
    >
      {children}
    </div>
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isClient, setIsClient] = useState(false)

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  
  // Lazy-loaded data states
  const [lazyData, setLazyData] = useState<any>(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  const typedText = useTypingAnimation(CORE_CONTENT.hero.typingTexts)

  const projectsCompleted = useAnimatedCounter(30, 1000)
  const clientsSatisfied = useAnimatedCounter(10, 1000)
  const bugsSquashed = useAnimatedCounter(500, 1000)
  const yearsExperience = useAnimatedCounter(4, 1000)

  const aboutSection = useIntersectionObserver(0.3)
  const skillsSection = useIntersectionObserver(0.3)
  const projectsSection = useIntersectionObserver(0.3)
  const experienceSection = useIntersectionObserver(0.3)

  // Tab state for Experience/Education
  const [experienceTab, setExperienceTab] = useState<'experience' | 'education'>('experience')

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import("@/constants/lazy-data")
        setLazyData(data)
        setIsDataLoaded(true)
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    }
    
    // Use setTimeout to prevent blocking initial render
    setTimeout(loadData, 100)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }, [])

  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleContactFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsFormSubmitting(true)
    setFormError(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        setFormSubmitted(true)
        form.reset()
      } else {
        setFormError(result.error || 'Failed to send message.')
      }
    } catch (err) {
      setFormError('Failed to send message.')
    } finally {
      setIsFormSubmitting(false)
    }
  }

  const nextTestimonial = useCallback(() => {
    if (lazyData?.TESTIMONIALS_DATA?.length) {
      setCurrentTestimonialIndex((prev) => (prev + 1) % lazyData.TESTIMONIALS_DATA.length)
    }
  }, [lazyData])

  const [visibleCount, setVisibleCount] = useState(3)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Update the visibleCount logic in the responsive useEffect:
  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth >= 1024) setVisibleCount(3)
      else if (window.innerWidth >= 768) setVisibleCount(2)
      else setVisibleCount(1)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  // Infinite carousel logic
  const getClonedProjects = (projects: any[]) => {
    if (!projects) return []
    const head = projects.slice(0, visibleCount)
    const tail = projects.slice(-visibleCount)
    return [...tail, ...projects, ...head]
  }

  const [carouselIndex, setCarouselIndex] = useState(visibleCount)

  // Sync carouselIndex when visibleCount changes
  useEffect(() => {
    setCarouselIndex(visibleCount)
  }, [visibleCount, isDataLoaded])

  // Handle next/prev with infinite effect
  const nextProject = useCallback(() => {
    if (!lazyData?.PROJECTS_DATA?.length) return
    setIsTransitioning(true)
    setCarouselIndex((prev) => prev + 1)
  }, [lazyData])

  const prevProject = useCallback(() => {
    if (!lazyData?.PROJECTS_DATA?.length) return
    setIsTransitioning(true)
    setCarouselIndex((prev) => prev - 1)
  }, [lazyData])

  // After transition, jump if at clone
  useEffect(() => {
    if (!lazyData?.PROJECTS_DATA?.length) return
    if (!isTransitioning) return
    const total = lazyData.PROJECTS_DATA.length
    let timeout = setTimeout(() => {
      setIsTransitioning(false)
      if (carouselIndex === 0) {
        setCarouselIndex(total)
      } else if (carouselIndex === total + visibleCount) {
        setCarouselIndex(visibleCount)
      }
    }, 700) // match transition duration
    return () => clearTimeout(timeout)
  }, [carouselIndex, isTransitioning, lazyData, visibleCount])


  // Auto-advance testimonial carousel with pause on hover/touch
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false)
  
  // Auto-advance project carousel with pause on hover/touch
  const [isProjectPaused, setIsProjectPaused] = useState(false)

  useEffect(() => {
    if (lazyData?.TESTIMONIALS_DATA?.length && !isTestimonialPaused) {
      const interval = setInterval(nextTestimonial, 4000)
      return () => clearInterval(interval)
    }
  }, [nextTestimonial, lazyData, isTestimonialPaused])

  // Auto-advance project carousel
  useEffect(() => {
    if (lazyData?.PROJECTS_DATA?.length && !isProjectPaused) {
      const interval = setInterval(nextProject, 3000) // Faster than testimonials
      return () => clearInterval(interval)
    }
  }, [nextProject, lazyData, isProjectPaused])

  const statsData = useMemo(() => [
    { icon: Award, label: CORE_CONTENT.hero.stats.projectsCompleted, value: projectsCompleted.count, ref: projectsCompleted.ref },
    { icon: Users, label: CORE_CONTENT.hero.stats.happyClients, value: clientsSatisfied.count, ref: clientsSatisfied.ref },
    { icon: Coffee, label: "Bugs Squashed", value: bugsSquashed.count, ref: bugsSquashed.ref },
    { icon: Star, label: CORE_CONTENT.hero.stats.yearsExperience, value: yearsExperience.count, ref: yearsExperience.ref },
  ], [projectsCompleted.count, clientsSatisfied.count, bugsSquashed.count, yearsExperience.count, projectsCompleted.ref, clientsSatisfied.ref, bugsSquashed.ref, yearsExperience.ref])

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden">
      <AnimatedBackground />
      <ScrollProgress />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl group cursor-pointer" onClick={() => scrollToSection("home")}>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110 inline-block">
                {CORE_CONTENT.navigation.logo.firstName}
              </span>
              <span className="ml-1 transition-all duration-300 group-hover:text-primary"> {CORE_CONTENT.navigation.logo.lastName}</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {CORE_CONTENT.navigation.menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-primary relative group ${
                    activeSection === item ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full ${
                      activeSection === item ? "w-full" : ""
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                className="md:hidden transition-transform duration-300 hover:scale-110"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-80 py-4 border-t border-border/50" : "max-h-0"
            }`}
          >
            {CORE_CONTENT.navigation.menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-2 capitalize hover:text-primary transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Loads immediately */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <HeroSpotlight />
        <HeroParticles />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-primary font-medium text-lg opacity-100">
                  {CORE_CONTENT.hero.greeting}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight opacity-100">
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {CORE_CONTENT.hero.name}
                  </span>
                </h1>
                <div className="text-xl sm:text-2xl text-muted-foreground h-8 opacity-100">
                  {typedText}
                  <span className="animate-pulse text-primary">|</span>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl opacity-100">
                  {CORE_CONTENT.hero.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 opacity-100">
                <Button
                  onClick={() => scrollToSection("projects")}
                  size="lg"
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  {CORE_CONTENT.hero.buttons.viewWork}
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="group transition-all duration-300 hover:scale-105 hover:shadow-lg border-primary/50 hover:border-primary"
                >
                  {CORE_CONTENT.hero.buttons.getInTouch}
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="ghost" size="lg" className="group transition-all duration-300 hover:scale-105">
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  {CORE_CONTENT.hero.buttons.resume}
                </Button>
              </div>

              <div className="flex space-x-4 opacity-100">
                {[
                  { icon: Github, href: "https://github.com/Miliyonayalew", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/miliyon-ayalew", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:miliayalew@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={label}
                    target={label !== 'Email' ? '_blank' : undefined}
                    rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative opacity-100">
              <div className="relative w-80 h-80 mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                <Image
                  src="/miliyon.png"
                  alt="Miliyon Ayalew"
                  width={320}
                  height={320}
                  className="relative z-10 rounded-full object-cover border-4 border-primary/20 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 transition-opacity duration-300 group-hover:opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 opacity-100">
            {statsData.map(({ icon: Icon, label, value, ref }) => (
              <div key={label} ref={ref} className="text-center group">
                <Icon className="h-8 w-8 text-primary mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {value}+
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* Sections load based on data availability */}
      {/* About Section */}
      <section id="about" className="py-20 relative overflow-hidden">
        <SectionBackground color1="rgba(236,72,153,0.13)" color2="rgba(99,102,241,0.10)" x={30} y={60} size="50% 30%" particleColor="rgba(236,72,153,0.10)" particleCount={14} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={aboutSection.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              aboutSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {CORE_CONTENT.sections.about.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {CORE_CONTENT.sections.about.subtitle}
            </p>
          </div>

          {isClient && isDataLoaded && lazyData?.ABOUT_CONTENT && (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 transition-all duration-1000 delay-200 ${
                aboutSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
                <h3 className="text-2xl font-semibold">{lazyData.ABOUT_CONTENT.sectionTitle}</h3>
                {lazyData.ABOUT_CONTENT.description.map((paragraph: string, index: number) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              <div className="grid grid-cols-2 gap-4">
                {[
                    { icon: Code, label: lazyData.ABOUT_CONTENT.qualities[0].label },
                    { icon: Zap, label: lazyData.ABOUT_CONTENT.qualities[1].label },
                    { icon: Smartphone, label: lazyData.ABOUT_CONTENT.qualities[2].label },
                    { icon: Globe, label: lazyData.ABOUT_CONTENT.qualities[3].label },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center space-x-2 group">
                    <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-400 ${
                aboutSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {lazyData.ABOUT_CONTENT.skillRatings.map((rating: any) => (
                        <div key={rating.skill} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{rating.skill}</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                                className={`w-3 h-3 rounded-full ${star <= rating.rating ? "bg-primary" : "bg-muted"}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
        <SectionBackground color1="rgba(99,102,241,0.13)" color2="rgba(34,197,94,0.10)" x={70} y={40} size="60% 40%" particleColor="rgba(34,197,94,0.10)" particleCount={12} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={skillsSection.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              skillsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {CORE_CONTENT.sections.skills.title}
            </h2>
            <p className="text-lg text-muted-foreground">{CORE_CONTENT.sections.skills.subtitle}</p>
          </div>

          {isClient && isDataLoaded && lazyData?.SKILLS_CATEGORIES && (
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {lazyData.SKILLS_CATEGORIES.map((category: any, index: number) => {
                const IconComponent = category.category === "frontend" ? Code : 
                                    category.category === "backend" ? Server : Database;
                
                return (
              <Card
                key={category.title}
                className={`group hover:shadow-2xl hover:scale-105 transition-transform duration-500 transition-shadow hover:border-primary/40 hover:bg-primary/5 bg-card/50 backdrop-blur-sm border-primary/20 cursor-pointer ${
                  skillsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                      <IconComponent className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                        {category.skills.map((skill: any) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="transition-all duration-300 hover:scale-105 hover:bg-primary/20 flex items-center gap-2"
                      >
                        <span>{skill.icon}</span>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
                )
              })}
          </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative overflow-hidden">
        <SectionBackground color1="rgba(236,72,153,0.10)" color2="rgba(251,191,36,0.10)" x={60} y={70} size="55% 35%" particleColor="rgba(251,191,36,0.10)" particleCount={16} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={projectsSection.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              projectsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {CORE_CONTENT.sections.projects.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {CORE_CONTENT.sections.projects.subtitle}
            </p>
          </div>

          {isClient && isDataLoaded && lazyData?.PROJECTS_DATA && (
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Projects Carousel */}
              <div
                className="overflow-hidden"
                onMouseEnter={() => setIsProjectPaused(true)}
                onMouseLeave={() => setIsProjectPaused(false)}
                onTouchStart={() => setIsProjectPaused(true)}
                onTouchEnd={() => {
                  setTimeout(() => setIsProjectPaused(false), 2000)
                }}
                style={{ width: '100%' }}
              >
                <div
                  className="flex"
                  style={{
                    width: `${getClonedProjects(lazyData.PROJECTS_DATA).length * (100 / visibleCount)}%`,
                    transform: `translateX(-${(100 / getClonedProjects(lazyData.PROJECTS_DATA).length) * carouselIndex}%)`,
                    transition: 'transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)', // Smoother and longer
                  }}
                  onTransitionEnd={() => setIsTransitioning(false)}
                >
                  {getClonedProjects(lazyData.PROJECTS_DATA).map((project: any, index: number) => (
                    <div
                      key={index}
                      className="w-full px-4"
                      style={{ maxWidth: `${100 / visibleCount}%`, flexBasis: `${100 / visibleCount}%` }}
                    >
                      <TiltCard>
                        <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 h-full flex flex-col">
                          <div className="relative overflow-hidden h-48 md:h-56 lg:h-64 flex-shrink-0">
                            <Image
                              src={project.image || "/placeholder.jpg"}
                              alt={project.title}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.jpg";
                              }}
                            />
                            {project.featured && (
                              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600">
                                {lazyData.PROJECT_CONTENT?.featuredBadge || "Featured"}
                              </Badge>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="secondary" asChild>
                                  <Link href={project.github}>
                                    <Github className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button size="sm" variant="secondary" asChild>
                                  <Link href={project.live}>
                                    <ExternalLink className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-6 flex flex-col flex-1">
                            <CardHeader className="p-0 mb-4">
                              <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                {project.title}
                              </CardTitle>
                              <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                            </CardHeader>
                            <div className="space-y-4 flex-1 flex flex-col">
                              <div className="flex flex-wrap gap-1">
                                {project.tech.slice(0, 3).map((tech: string) => (
                                  <Badge
                                    key={tech}
                                    variant="outline"
                                    className="text-xs transition-all duration-300 hover:scale-105"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                                {project.tech.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{project.tech.length - 3}
                                  </Badge>
                                )}
                              </div>
                              {project.stats && (
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
                                  {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                                    <div key={key} className="text-center">
                                      <div className="font-semibold text-primary text-sm">{value as string}</div>
                                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="flex-1" />
                              <div className="flex space-x-2 pt-2 mt-auto">
                                <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent text-xs">
                                  <Link href={project.github}>
                                    <Github className="h-3 w-3 mr-1" />
                                    {lazyData.PROJECT_CONTENT?.buttons?.code || "Code"}
                                  </Link>
                                </Button>
                                <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-xs">
                                  <Link href={project.live}>
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Demo
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TiltCard>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {lazyData.PROJECTS_DATA.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      (carouselIndex - visibleCount + lazyData.PROJECTS_DATA.length) % lazyData.PROJECTS_DATA.length === idx
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                        : "bg-muted hover:bg-muted-foreground/50"
                    }`}
                    onClick={() => {
                      setCarouselIndex(idx + visibleCount)
                      setIsProjectPaused(true)
                      setTimeout(() => setIsProjectPaused(false), 2000)
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-muted/30 relative overflow-hidden">
        <SectionBackground color1="rgba(99,102,241,0.10)" color2="rgba(236,72,153,0.10)" x={40} y={50} size="60% 40%" particleColor="rgba(99,102,241,0.10)" particleCount={10} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={experienceSection.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              experienceSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Professional Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore my professional journey and academic background.
            </p>
            {/* Tabs */}
            <div className="flex justify-center mt-8 gap-2">
              <button
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none ${experienceTab === 'experience' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setExperienceTab('experience')}
              >
                Experience
              </button>
              <button
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none ${experienceTab === 'education' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setExperienceTab('education')}
              >
                Education
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {experienceTab === 'experience' && isClient && isDataLoaded && lazyData?.EXPERIENCE_DATA && (
            <ExperienceTimeline experiences={lazyData.EXPERIENCE_DATA} isVisible={experienceSection.isVisible} type="experience" />
          )}
          {experienceTab === 'education' && isClient && isDataLoaded && lazyData?.EDUCATION_DATA && (
            <ExperienceTimeline experiences={lazyData.EDUCATION_DATA} isVisible={experienceSection.isVisible} type="education" />
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {CORE_CONTENT.sections.testimonials.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {CORE_CONTENT.sections.testimonials.subtitle}
            </p>
          </div>

          {isClient && isDataLoaded && lazyData?.TESTIMONIALS_DATA && (
          <div className="relative max-w-4xl mx-auto">
              <div 
                className="overflow-hidden"
                onMouseEnter={() => setIsTestimonialPaused(true)}
                onMouseLeave={() => setIsTestimonialPaused(false)}
                onTouchStart={() => setIsTestimonialPaused(true)}
                onTouchEnd={() => {
                  setTimeout(() => setIsTestimonialPaused(false), 3000)
                }}
              >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
              >
                  {lazyData.TESTIMONIALS_DATA.map((testimonial: any, index: number) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-8 text-center">
                          <Quote className="h-8 w-8 text-primary mx-auto mb-4 opacity-50" />
                        <blockquote className="text-lg text-muted-foreground leading-relaxed mb-8 italic">
                          "{testimonial.content}"
                        </blockquote>
                          <div className="text-center space-y-2">
                            <div className="font-semibold text-foreground">{testimonial.name}</div>
                            <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                            <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center space-x-2 mt-8">
                {lazyData.TESTIMONIALS_DATA.map((_: any, index: number) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonialIndex
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                    onClick={() => {
                      setCurrentTestimonialIndex(index)
                      setIsTestimonialPaused(true)
                      setTimeout(() => setIsTestimonialPaused(false), 2000)
                    }}
                />
              ))}
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <SectionBackground color1="rgba(251,191,36,0.10)" color2="rgba(99,102,241,0.10)" x={50} y={60} size="50% 30%" particleColor="rgba(251,191,36,0.10)" particleCount={10} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {CORE_CONTENT.sections.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {CORE_CONTENT.sections.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.sectionTitle : "Let's work together"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.description : "Whether you have a project in mind or just want to chat about technology, I'd love to hear from you."}
                </p>
              </div>

              {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT && (
              <div className="space-y-4">
                {[
                    { icon: Mail, label: lazyData.CONTACT_CONTENT.contactInfo.email, href: `mailto:${lazyData.CONTACT_CONTENT.contactInfo.email}` },
                    { icon: MapPin, label: lazyData.CONTACT_CONTENT.contactInfo.location, href: "#" },
                    { icon: MapPin, label: lazyData.CONTACT_CONTENT.contactInfo.phone, href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center space-x-3 group hover:text-primary transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
              )}

              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "https://github.com/Miliyonayalew", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/miliyon-ayalew", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:miliayalew@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={label}
                    target={label !== 'Email' ? '_blank' : undefined}
                    rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>

            <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20 h-full min-h-0 flex flex-col">
              <CardHeader>
                <CardTitle>
                  {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.title : "Send me a message"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-[300px] flex flex-col justify-center w-full h-full">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center w-full h-full py-8 space-y-4 animate-fade-in max-w-full break-words overflow-hidden" aria-live="polite">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-bounce-in" />
                    <h3 className="text-xl font-semibold text-green-600 max-w-full break-words overflow-hidden">{isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.success.title : "Message Sent!"}</h3>
                    <p className="text-muted-foreground max-w-full break-words overflow-hidden">{isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.success.message : "Thank you for reaching out. I'll get back to you soon!"}</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactFormSubmit} className="flex flex-col h-full w-full space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4 w-full">
                      <div className="w-full">
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.name : "Name"}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.namePlaceholder : "Your name"}
                          required
                          className="transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-background/50 w-full"
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.email : "Email"}
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.emailPlaceholder : "your@email.com"}
                          required
                          className="transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-background/50 w-full"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.subject : "Subject"}
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder={isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.subjectPlaceholder : "Inquiry"}
                        required
                        className="transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-background/50 w-full"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.message : "Message"}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.messagePlaceholder : "Tell me about your project..."}
                        rows={5}
                        required
                        className="transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-background/50 w-full min-w-0 max-w-full"
                      />
                    </div>
                    {formError && (
                      <div className="text-red-500 text-sm transition-all duration-500 ease-in-out opacity-100 translate-y-0 max-w-full break-words overflow-hidden text-center mx-auto" aria-live="polite">
                        {formError}
                      </div>
                    )}
                    <Button
                      type="submit"
                      className={`w-full group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-primary/30 ${isFormSubmitting ? 'animate-pulse scale-98' : ''}`}
                      disabled={isFormSubmitting}
                    >
                      {isFormSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.buttons.sending : "Sending..."}
                        </>
                      ) : (
                        <>
                          {isClient && isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.buttons.send : "Send Message"}
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} {CORE_CONTENT.hero.name}. {CORE_CONTENT.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}