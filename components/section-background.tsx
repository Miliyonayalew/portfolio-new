import React, { useRef, useState, useEffect } from "react"

interface SectionBackgroundProps {
  color?: string
  particleCount?: number
  z?: string
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ 
  color = "from-blue-500/10 via-purple-500/10 to-pink-500/10", 
  particleCount = 20,
  z = "z-0"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })

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

    // Parse color classes to get actual colors
    const color1 = color.includes("blue") ? "rgba(59,130,246,0.1)" : "rgba(99,102,241,0.1)"
    const color2 = color.includes("purple") ? "rgba(147,51,234,0.1)" : "rgba(236,72,153,0.1)"
    const color3 = color.includes("pink") ? "rgba(236,72,153,0.1)" : "rgba(59,130,246,0.1)"
    const particleColor = "rgba(236,72,153,0.3)"

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.2 + 0.05,
      o: Math.random() * 0.3 + 0.1,
    }))

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += Math.cos(p.a) * p.s
        p.y += Math.sin(p.a) * p.s
        p.a += (Math.random() - 0.5) * 0.01

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.shadowColor = "rgba(99,102,241,0.1)"
        ctx.shadowBlur = 8
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
  }, [color, particleCount, z])

  return (
    <>
      <div
        className={`pointer-events-none absolute inset-0 w-full h-full ${z}`}
        style={{
          background: `radial-gradient(ellipse 60% 40% at ${pos.x}% ${pos.y}%, ${color.replace(/\//g, " ")} 0%, transparent 100%)`,
          transition: "background 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      />
      <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${z} pointer-events-none`} />
    </>
  )
}

export default SectionBackground 