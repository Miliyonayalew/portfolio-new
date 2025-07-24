"use client"

import type React from "react"
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

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  
  // Lazy-loaded data states
  const [lazyData, setLazyData] = useState<any>(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const typedText = useTypingAnimation(CORE_CONTENT.hero.typingTexts)

  const projectsCompleted = useAnimatedCounter(30, 1000)
  const clientsSatisfied = useAnimatedCounter(10, 1000)
  const cupsOfCoffee = useAnimatedCounter(500, 1000)
  const yearsExperience = useAnimatedCounter(4, 1000)

  const aboutSection = useIntersectionObserver(0.3)
  const skillsSection = useIntersectionObserver(0.3)
  const projectsSection = useIntersectionObserver(0.3)
  const experienceSection = useIntersectionObserver(0.3)

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

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsFormSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsFormSubmitting(false)
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 5000)
  }, [])



  const nextTestimonial = useCallback(() => {
    if (lazyData?.TESTIMONIALS_DATA?.length) {
      const totalGroups = Math.ceil(lazyData.TESTIMONIALS_DATA.length / 3)
      setCurrentTestimonialIndex((prev) => ((Math.floor(prev / 3) + 1) % totalGroups) * 3)
    }
  }, [lazyData])

  const nextProject = useCallback(() => {
    if (lazyData?.PROJECTS_DATA?.length) {
      const totalGroups = Math.ceil(lazyData.PROJECTS_DATA.length / 3)
      setCurrentProjectIndex((prev) => ((Math.floor(prev / 3) + 1) % totalGroups) * 3)
    }
  }, [lazyData])

  const prevProject = useCallback(() => {
    if (lazyData?.PROJECTS_DATA?.length) {
      const totalGroups = Math.ceil(lazyData.PROJECTS_DATA.length / 3)
      setCurrentProjectIndex((prev) => ((Math.floor(prev / 3) - 1 + totalGroups) % totalGroups) * 3)
    }
  }, [lazyData])



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
    { icon: Coffee, label: CORE_CONTENT.hero.stats.cupsOfCoffee, value: cupsOfCoffee.count, ref: cupsOfCoffee.ref },
    { icon: Star, label: CORE_CONTENT.hero.stats.yearsExperience, value: yearsExperience.count, ref: yearsExperience.ref },
  ], [projectsCompleted.count, clientsSatisfied.count, cupsOfCoffee.count, yearsExperience.count, projectsCompleted.ref, clientsSatisfied.ref, cupsOfCoffee.ref, yearsExperience.ref])

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
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
      <section id="home" className="pt-16 min-h-screen flex items-center relative">
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
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:miliayalew@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={label}
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
      <section id="about" className="py-20 relative">
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

          {isDataLoaded && lazyData?.ABOUT_CONTENT && (
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
      <section id="skills" className="py-20 bg-muted/30 relative">
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

          {isDataLoaded && lazyData?.SKILLS_CATEGORIES && (
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {lazyData.SKILLS_CATEGORIES.map((category: any, index: number) => {
                const IconComponent = category.category === "frontend" ? Code : 
                                    category.category === "backend" ? Server : Database;
                
                return (
                  <Card
                    key={category.title}
                    className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-primary/20 ${
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
      <section id="projects" className="py-20">
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

                    {isDataLoaded && lazyData?.PROJECTS_DATA && (
            <div className="relative max-w-5xl mx-auto">
              {/* Projects Carousel */}
              <div 
                className="overflow-hidden"
                onMouseEnter={() => setIsProjectPaused(true)}
                onMouseLeave={() => setIsProjectPaused(false)}
                onTouchStart={() => setIsProjectPaused(true)}
                onTouchEnd={() => {
                  // Resume after a delay on mobile to allow for touch interactions
                  setTimeout(() => setIsProjectPaused(false), 2000)
                }}
              >
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${Math.floor(currentProjectIndex / 3) * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(lazyData.PROJECTS_DATA.length / 3) }).map((_, groupIndex) => (
                    <div key={groupIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                      {lazyData.PROJECTS_DATA.slice(groupIndex * 3, groupIndex * 3 + 3).map((project: any, index: number) => (
                        <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
                          <div className="relative overflow-hidden h-48">
                            <Image
                              src={project.image || "/placeholder.jpg"}
                              alt={project.title}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
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

                          <CardContent className="p-6">
                            <CardHeader className="p-0 mb-4">
                              <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                {project.title}
                              </CardTitle>
                              <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                            </CardHeader>

                            <div className="space-y-4">
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

                              <div className="flex space-x-2 pt-2">
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
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: Math.ceil(lazyData.PROJECTS_DATA.length / 3) }).map((_, groupIndex) => (
                  <button
                    key={groupIndex}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(currentProjectIndex / 3) === groupIndex
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                        : "bg-muted hover:bg-muted-foreground/50"
                    }`}
                    onClick={() => {
                      setCurrentProjectIndex(groupIndex * 3)
                      // Briefly pause auto-advance when user manually selects a project group
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
      <section id="experience" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={experienceSection.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              experienceSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {CORE_CONTENT.sections.experience.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {CORE_CONTENT.sections.experience.subtitle}
            </p>
          </div>

          {isDataLoaded && lazyData?.EXPERIENCE_DATA && (
            <ExperienceTimeline experiences={lazyData.EXPERIENCE_DATA} isVisible={experienceSection.isVisible} />
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

          {isDataLoaded && lazyData?.TESTIMONIALS_DATA && (
            <div className="relative max-w-4xl mx-auto">
              <div 
                className="overflow-hidden"
                onMouseEnter={() => setIsTestimonialPaused(true)}
                onMouseLeave={() => setIsTestimonialPaused(false)}
                onTouchStart={() => setIsTestimonialPaused(true)}
                onTouchEnd={() => {
                  // Resume after a delay on mobile to allow for touch interactions
                  setTimeout(() => setIsTestimonialPaused(false), 3000)
                }}
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${Math.floor(currentTestimonialIndex / 3) * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(lazyData.TESTIMONIALS_DATA.length / 3) }).map((_, groupIndex) => (
                    <div key={groupIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                      {lazyData.TESTIMONIALS_DATA.slice(groupIndex * 3, groupIndex * 3 + 3).map((testimonial: any, index: number) => (
                        <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6 text-center">
                            <Quote className="h-8 w-8 text-primary mx-auto mb-4 opacity-50" />

                            <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6 italic line-clamp-4">
                              "{testimonial.content}"
                            </blockquote>

                                                         <div className="text-center space-y-2">
                              <div className="font-semibold text-foreground">{testimonial.name}</div>
                              <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                              <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: Math.ceil(lazyData.TESTIMONIALS_DATA.length / 3) }).map((_, groupIndex) => (
                  <button
                    key={groupIndex}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(currentTestimonialIndex / 3) === groupIndex
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                        : "bg-muted hover:bg-muted-foreground/50"
                    }`}
                    onClick={() => {
                      setCurrentTestimonialIndex(groupIndex * 3)
                      // Briefly pause auto-advance when user manually selects a testimonial group
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
      <section id="contact" className="py-20">
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
                  {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.sectionTitle : "Let's work together"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.description : "Whether you have a project in mind or just want to chat about technology, I'd love to hear from you."}
                </p>
              </div>

              {isDataLoaded && lazyData?.CONTACT_CONTENT && (
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
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:miliayalew@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={label}
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>

            <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>
                  {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.title : "Send me a message"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold text-green-600">
                      {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.success.title : "Message Sent!"}
                    </h3>
                    <p className="text-muted-foreground">
                      {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.success.message : "Thank you for reaching out. I'll get back to you soon!"}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.name : "Name"}
                        </label>
                        <Input
                          id="name"
                          placeholder={isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.namePlaceholder : "Your name"}
                          required
                          className="transition-all duration-300 focus:scale-105 bg-background/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.email : "Email"}
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.emailPlaceholder : "your@email.com"}
                          required
                          className="transition-all duration-300 focus:scale-105 bg-background/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.subject : "Subject"}
                      </label>
                      <Input
                        id="subject"
                        placeholder={isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.subjectPlaceholder : "Project inquiry"}
                        required
                        className="transition-all duration-300 focus:scale-105 bg-background/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.message : "Message"}
                      </label>
                      <Textarea
                        id="message"
                        placeholder={isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.fields.messagePlaceholder : "Tell me about your project..."}
                        rows={5}
                        required
                        className="transition-all duration-300 focus:scale-105 bg-background/50"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                      disabled={isFormSubmitting}
                    >
                      {isFormSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.buttons.sending : "Sending..."}
                        </>
                      ) : (
                        <>
                          {isDataLoaded && lazyData?.CONTACT_CONTENT ? lazyData.CONTACT_CONTENT.form.buttons.send : "Send Message"}
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