"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
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

function useAnimatedCounter(end: number, duration = 2000, start = 0) {
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
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  const typingTexts = ["Full-Stack Developer", "AI Enthusiast", "Problem Solver", "Software Engineer"]
  const typedText = useTypingAnimation(typingTexts)

  const projectsCompleted = useAnimatedCounter(30)
  const clientsSatisfied = useAnimatedCounter(10)
  const cupsOfCoffee = useAnimatedCounter(500)
  const yearsExperience = useAnimatedCounter(4)

  const aboutSection = useIntersectionObserver(0.3)
  const skillsSection = useIntersectionObserver(0.3)
  const projectsSection = useIntersectionObserver(0.3)
  const experienceSection = useIntersectionObserver(0.3)

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsFormSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsFormSubmitting(false)
    setFormSubmitted(true)

    setTimeout(() => setFormSubmitted(false), 5000)
  }

  const skills = [
    { name: "JavaScript", category: "frontend", icon: "☕️" },
    { name: "React", category: "frontend", icon: "⚛️" },
    { name: "Redux", category: "frontend", icon: "✨" },
    { name: "HTML5", category: "frontend", icon: "🌐" },
    { name: "CSS3", category: "frontend", icon: "🎨" },
    { name: "Bootstrap", category: "frontend", icon: "🛡️" },
    { name: "TypeScript", category: "frontend", icon: "📘" },
    { name: "Webpack", category: "frontend", icon: "📦" },
    { name: "TailwindCSS", category: "frontend", icon: "💨" },
    { name: "AntD", category: "frontend", icon: "🐜" },
    { name: "Ruby", category: "backend", icon: "💎" },
    { name: "Ruby on Rails", category: "backend", icon: "🛤️" },
    { name: "Strapi", category: "backend", icon: "🚀" },
    { name: "MongoDB", category: "backend", icon: "🍃" },
    { name: "MySQL", category: "backend", icon: "🐬" },
    { name: "PostgreSQL", category: "backend", icon: "🐘" },
    { name: "NodeJS", category: "backend", icon: "🟢" },
    { name: "Express", category: "backend", icon: "⚡️" },
    { name: "GraphQL", category: "backend", icon: "📊" },
    { name: "Machine Learning", category: "ai", icon: "🤖" },
    { name: "LLMs", category: "ai", icon: "🧠" },
    { name: "NLP", category: "ai", icon: "🗣️" },
    { name: "Vite", category: "testing", icon: "⚡" },
    { name: "Jest", category: "testing", icon: "🃏" },
    { name: "TDD", category: "testing", icon: "✅" },
    { name: "Playwright", category: "testing", icon: "🎭" },
    { name: "Chrome Dev Tools", category: "testing", icon: "⚙️" },
    { name: "Git", category: "tools", icon: "🌱" },
    { name: "GitHub", category: "tools", icon: "🐙" },
    { name: "VS Code", category: "tools", icon: "💻" },
    { name: "Cursor", category: "tools", icon: "🗂️" },
    { name: "AWS", category: "tools", icon: "☁️" },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      github: "#",
      live: "#",
      featured: true,
      stats: { users: "10K+", revenue: "$500K+" },
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, team collaboration, and analytics.",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "#",
      live: "#",
      featured: true,
      stats: { teams: "200+", tasks: "50K+" },
    },
    {
      title: "AI Content Generator",
      description: "AI-powered content creation platform with multiple templates and export options.",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Python", "FastAPI", "OpenAI API", "React"],
      github: "#",
      live: "#",
      featured: false,
      stats: { content: "1M+", users: "5K+" },
    },
    {
      title: "Real Estate Platform",
      description: "Modern real estate platform with virtual tours, mortgage calculator, and agent dashboard.",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Next.js", "Three.js", "Prisma", "Stripe"],
      github: "#",
      live: "#",
      featured: false,
      stats: { properties: "2K+", views: "100K+" },
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "10 Academy",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Miliyon's work on our AI-driven assignment system was exceptional. His ability to integrate complex AI features while maintaining excellent user experience is remarkable. The 50% reduction in grading time speaks volumes about his technical expertise.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "CTO",
      company: "Ibex Technology",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Working with Miliyon was a game-changer for our commodity distribution platform. His full-stack expertise and attention to detail helped us deliver a robust solution that improved our efficiency by 20%. Highly recommended!",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Senior Developer",
      company: "TechStart Inc.",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "Miliyon's mentoring at Microverse was invaluable. His code reviews were thorough and his guidance helped me become a better developer. His passion for teaching and sharing knowledge is truly inspiring.",
      rating: 5,
    },
    {
      name: "Ahmed Hassan",
      role: "Project Lead",
      company: "Digital Solutions",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The multilingual dashboard Miliyon built for us exceeded all expectations. His expertise in React and TypeScript, combined with his understanding of user experience, delivered exactly what we needed.",
      rating: 5,
    },
  ]

  const experience = [
    {
      title: "Front-end Developer",
      company: "10 Academy",
      period: "August 2023 - Present",
      location: "Remote",
      description:
        "Developing user interfaces and implementing front-end logic for web applications. Collaborating with designers and back-end developers to deliver high-quality products.",
      achievements: [
        "Developed and maintained responsive web applications using React and related technologies.",
        "Collaborated with designers to implement UI/UX designs and ensure a seamless user experience.",
        "Participated in code reviews and contributed to improving code quality and maintainability.",
        "Integrated front-end components with back-end APIs and data sources.",
        "Implemented testing strategies to ensure the reliability and performance of web applications.",
      ],
      technologies: ["React", "JavaScript", "HTML", "CSS", "Redux", "TailwindCSS"],
    },
    {
      title: "Intern",
      company: "10 Academy",
      period: "July 2023 - August 2023",
      location: "Remote",
      description:
        "Assisted senior developers in building and maintaining web applications. Gained experience in front-end development and software engineering best practices.",
      achievements: [
        "Assisted in the development of new features and enhancements for existing web applications.",
        "Participated in code reviews and learned about software engineering best practices.",
        "Contributed to the improvement of code quality and maintainability.",
        "Worked with a team of developers to deliver high-quality products.",
        "Gained experience in front-end development and software engineering.",
      ],
      technologies: ["React", "JavaScript", "HTML", "CSS"],
    },
    {
      title: "Full Stack Developer",
      company: "Ibex Technology",
      period: "January 2023 - June 2023",
      location: "Remote",
      description:
        "Developed and maintained full-stack web applications using modern technologies. Collaborated with designers and product managers to deliver high-quality products.",
      achievements: [
        "Developed and maintained full-stack web applications using React, Node.js, and related technologies.",
        "Collaborated with designers and product managers to implement UI/UX designs and ensure a seamless user experience.",
        "Participated in code reviews and contributed to improving code quality and maintainability.",
        "Integrated front-end components with back-end APIs and data sources.",
        "Implemented testing strategies to ensure the reliability and performance of web applications.",
      ],
      technologies: ["React", "Node.js", "JavaScript", "HTML", "CSS", "MongoDB"],
    },
    {
      title: "Mentor",
      company: "MICROVERSE",
      period: "September 2022 - October 2022",
      location: "Remote",
      description:
        "Mentored junior developers and provided guidance on software engineering best practices. Assisted students in completing coding projects and preparing for technical interviews.",
      achievements: [
        "Mentored junior developers and provided guidance on software engineering best practices.",
        "Assisted students in completing coding projects and preparing for technical interviews.",
        "Provided feedback on code quality and maintainability.",
        "Helped students improve their problem-solving skills and technical knowledge.",
        "Contributed to the success of the Microverse program.",
      ],
      technologies: ["JavaScript", "HTML", "CSS", "React"],
    },
  ]

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const projectInterval = setInterval(nextProject, 5000)
    return () => clearInterval(projectInterval)
  }, [])

  useEffect(() => {
    const testimonialInterval = setInterval(nextTestimonial, 4000)
    return () => clearInterval(testimonialInterval)
  }, [])

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
                Miliyon
              </span>
              <span className="ml-1 transition-all duration-300 group-hover:text-primary"> Ayalew</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
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
              {/* Mobile Menu Button */}
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
            {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
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

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div
                  className="text-primary font-medium text-lg animate-fade-in-up opacity-0"
                  style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                >
                  Hello, I'm
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up opacity-0"
                  style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
                >
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Miliyon Ayalew
                  </span>
                </h1>
                <div
                  className="text-xl sm:text-2xl text-muted-foreground h-8 animate-fade-in-up opacity-0"
                  style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
                >
                  {typedText}
                  <span className="animate-pulse text-primary">|</span>
                </div>
                <p
                  className="text-lg text-muted-foreground max-w-2xl animate-fade-in-up opacity-0"
                  style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
                >
                  A passionate and versatile full-stack developer with a knack for crafting innovative solutions.
                  Dedicated to continuous learning and pushing the boundaries of what's possible.
                </p>
              </div>

              <div
                className="flex flex-wrap gap-4 animate-fade-in-up opacity-0"
                style={{ animationDelay: "1s", animationFillMode: "forwards" }}
              >
                <Button
                  onClick={() => scrollToSection("projects")}
                  size="lg"
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  View My Work
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="group transition-all duration-300 hover:scale-105 hover:shadow-lg border-primary/50 hover:border-primary"
                >
                  Get In Touch
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="ghost" size="lg" className="group transition-all duration-300 hover:scale-105">
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  Resume
                </Button>
              </div>

              <div
                className="flex space-x-4 animate-fade-in-up opacity-0"
                style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
              >
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

            <div
              className="relative animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              <div className="relative w-80 h-80 mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Miliyon Ayalew"
                  width={320}
                  height={320}
                  className="relative z-10 rounded-full object-cover border-4 border-primary/20 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 transition-opacity duration-300 group-hover:opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in-up opacity-0"
            style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
          >
            {[
              { icon: Award, label: "Projects Completed", value: projectsCompleted.count, ref: projectsCompleted.ref },
              { icon: Users, label: "Happy Clients", value: clientsSatisfied.count, ref: clientsSatisfied.ref },
              { icon: Coffee, label: "Cups of Coffee", value: cupsOfCoffee.count, ref: cupsOfCoffee.ref },
              { icon: Star, label: "Years Experience", value: yearsExperience.count, ref: yearsExperience.ref },
            ].map(({ icon: Icon, label, value, ref }) => (
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
              About Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A Full-Stack Developer with a background in Software Engineering from Haramaya University. Passionate
              about creating innovative solutions and dedicated to continuous learning.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 transition-all duration-1000 delay-200 ${
                aboutSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h3 className="text-2xl font-semibold">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                From my early days at Haramaya University to my current role as a Full-Stack Developer, I've always been
                driven by a passion for technology and a desire to create meaningful solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I thrive on challenges and enjoy working with cutting-edge technologies to build scalable and efficient
                applications. My goal is to leverage my skills and experience to make a positive impact on the world.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code, label: "Clean Code" },
                  { icon: Zap, label: "Performance" },
                  { icon: Smartphone, label: "Responsive" },
                  { icon: Globe, label: "Accessible" },
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg blur-xl"></div>
                <Card className="relative bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Problem Solving</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className="w-3 h-3 bg-primary rounded-full"></div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Team Collaboration</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              className={`w-3 h-3 rounded-full ${star <= 4 ? "bg-primary" : "bg-muted"}`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Learning Agility</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className="w-3 h-3 bg-primary rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
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
              Technical Skills
            </h2>
            <p className="text-lg text-muted-foreground">Technologies and tools I use to bring ideas to life</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Code,
                title: "Frontend Development",
                description: "Creating responsive, interactive user interfaces with modern frameworks and libraries.",
                skills: skills.filter((s) => s.category === "frontend"),
              },
              {
                icon: Server,
                title: "Backend Development",
                description: "Building scalable server-side applications and APIs with robust architecture.",
                skills: skills.filter((s) => s.category === "backend"),
              },
              {
                icon: Database,
                title: "AI & Machine Learning",
                description: "Developing AI solutions and implementing machine learning algorithms.",
                skills: skills.filter((s) => s.category === "ai"),
              },
              {
                icon: Database,
                title: "Testing",
                description:
                  "Implementing testing strategies to ensure the reliability and performance of web applications.",
                skills: skills.filter((s) => s.category === "testing"),
              },
              {
                icon: Database,
                title: "DevOps & Tools",
                description: "Implementing CI/CD pipelines and managing cloud infrastructure for optimal performance.",
                skills: skills.filter((s) => s.category === "tools"),
              },
            ].map((category, index) => (
              <Card
                key={category.title}
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-primary/20 ${
                  skillsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardHeader className="text-center">
                  <category.icon className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill) => (
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
            ))}
          </div>
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
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </div>

          {/* Project Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 mx-4">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Project Image */}
                        <div className="relative overflow-hidden h-64 md:h-auto">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {project.featured && (
                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600">
                              Featured
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

                        {/* Project Content */}
                        <div className="p-8 flex flex-col justify-center">
                          <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="text-base">{project.description}</CardDescription>
                          </CardHeader>

                          <CardContent className="p-0 space-y-6">
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="transition-all duration-300 hover:scale-105"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>

                            {project.stats && (
                              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                {Object.entries(project.stats).map(([key, value]) => (
                                  <div key={key} className="text-center">
                                    <div className="font-semibold text-primary text-lg">{value}</div>
                                    <div className="text-sm text-muted-foreground capitalize">{key}</div>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex space-x-4 pt-4">
                              <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                                <Link href={project.github}>
                                  <Github className="h-4 w-4 mr-2" />
                                  Code
                                </Link>
                              </Button>
                              <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">
                                <Link href={project.live}>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Live Demo
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
              onClick={prevProject}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
              onClick={nextProject}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => setCurrentProjectIndex(index)}
                />
              ))}
            </div>
          </div>
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
              Professional Experience
            </h2>
            <p className="text-lg text-muted-foreground">
              My journey through different roles and the impact I've made at each company.
            </p>
          </div>

          <ExperienceTimeline experiences={experience} isVisible={experienceSection.isVisible} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Testimonials from colleagues, clients, and mentees I've worked with.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-50" />

                        <blockquote className="text-lg text-muted-foreground leading-relaxed mb-8 italic">
                          "{testimonial.content}"
                        </blockquote>

                        <div className="flex items-center justify-center space-x-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-primary/20"
                          />
                          <div className="text-left">
                            <div className="font-semibold text-foreground">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                            <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                          </div>
                        </div>

                        <div className="flex justify-center space-x-1 mt-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonialIndex
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => setCurrentTestimonialIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Let's work together</h3>
                <p className="text-muted-foreground mb-6">
                  Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "miliayalew@gmail.com", href: "mailto:miliayalew@gmail.com" },
                  { icon: MapPin, label: "Remote (originally from Ethiopia)", href: "#" },
                  { icon: MapPin, label: "+251922765739", href: "#" },
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
                <CardTitle>Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold text-green-600">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon!</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          required
                          className="transition-all duration-300 focus:scale-105 bg-background/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="transition-all duration-300 focus:scale-105 bg-background/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="Project inquiry"
                        required
                        className="transition-all duration-300 focus:scale-105 bg-background/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project..."
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
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
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
              © {new Date().getFullYear()} Miliyon Ayalew. All rights reserved. Built with ❤️ using Next.js & Tailwind
              CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
