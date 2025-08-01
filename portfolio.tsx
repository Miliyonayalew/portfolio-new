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
  Bug,
  Shield,
  Wrench,
  Hammer,
  Target,
  CheckSquare,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import ContactForm from './components/contact-form'
import HeroSection from './components/hero-section'
import AboutSection from './components/about-section'
import SkillsSection from './components/skills-section'
import ProjectsSection from './components/projects-section'
import ExperienceSection from './components/experience-section'
import TestimonialsSection from './components/testimonials-section'
import ContactSection from './components/contact-section'
import Chatbot from './components/chatbot'
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
    { icon: Wrench, label: "Bugs Squashed", value: bugsSquashed.count, ref: bugsSquashed.ref },
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
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
      <HeroSection
        typedText={typedText}
        statsData={statsData}
        scrollToSection={scrollToSection}
        CORE_CONTENT={CORE_CONTENT}
      />

      {/* Sections load based on data availability */}
      {/* About Section */}
      <AboutSection
        CORE_CONTENT={CORE_CONTENT}
        lazyData={lazyData}
        isClient={isClient}
        isDataLoaded={isDataLoaded}
        aboutSection={aboutSection}
      />

      {/* Skills Section */}
      <SkillsSection
        CORE_CONTENT={CORE_CONTENT}
        lazyData={lazyData}
        isClient={isClient}
        isDataLoaded={isDataLoaded}
        skillsSection={skillsSection}
      />

      {/* Projects Section */}
      <ProjectsSection
        CORE_CONTENT={CORE_CONTENT}
        lazyData={lazyData}
        isClient={isClient}
        isDataLoaded={isDataLoaded}
        projectsSection={projectsSection}
        currentProjectIndex={currentProjectIndex}
        carouselIndex={carouselIndex}
        visibleCount={visibleCount}
        isTransitioning={isTransitioning}
        isProjectPaused={isProjectPaused}
        setIsProjectPaused={setIsProjectPaused}
        setCarouselIndex={setCarouselIndex}
        setIsTransitioning={setIsTransitioning}
        nextProject={nextProject}
        prevProject={prevProject}
        getClonedProjects={getClonedProjects}
      />

      {/* Experience Section */}
      <ExperienceSection
        CORE_CONTENT={CORE_CONTENT}
        lazyData={lazyData}
        isClient={isClient}
        isDataLoaded={isDataLoaded}
        experienceSection={experienceSection}
        experienceTab={experienceTab}
        setExperienceTab={setExperienceTab}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        CORE_CONTENT={CORE_CONTENT}
        lazyData={lazyData}
        isClient={isClient}
        isDataLoaded={isDataLoaded}
        currentTestimonialIndex={currentTestimonialIndex}
        isTestimonialPaused={isTestimonialPaused}
        setIsTestimonialPaused={setIsTestimonialPaused}
        setCurrentTestimonialIndex={setCurrentTestimonialIndex}
      />

      {/* Contact Section */}
      <ContactSection
        CORE_CONTENT={CORE_CONTENT}
        lazyData={lazyData}
        isClient={isClient}
        isDataLoaded={isDataLoaded}
        ContactFormProps={{
          lazyData,
          isClient,
          isDataLoaded
        }}
      />

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

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}