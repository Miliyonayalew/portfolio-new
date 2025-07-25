import React, { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Send, Download, Github, Linkedin, Mail, ChevronDown, Award, Users, Coffee, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedBackground } from "./animated-background"
import { handleResumeAction } from "@/constants/resume-config"

interface Stat {
  icon: React.ElementType
  label: string
  value: number
  ref: React.RefObject<HTMLDivElement | null>
}

interface HeroSectionProps {
  typedText: string
  statsData: Stat[]
  scrollToSection: (sectionId: string) => void
  CORE_CONTENT: any
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

const HeroSection: React.FC<HeroSectionProps> = ({ typedText, statsData, scrollToSection, CORE_CONTENT }) => {
  return (
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
              <Button 
                variant="ghost" 
                size="lg" 
                className="group transition-all duration-300 hover:scale-105"
                onClick={handleResumeAction}
              >
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
                src="/miliyon.webp"
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
  )
}

export default React.memo(HeroSection) 