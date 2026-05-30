"use client"

import { useEffect, useRef } from "react"

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: {
      x: number
      y: number
      size: number
      vx: number
      vy: number
      color: string
      pulse: number
    }[] = []
    let animationFrameId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      particles = []
      const density = (canvas.width * canvas.height) / 10000
      const count = Math.min(Math.floor(density), 150)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          color: i % 2 === 0 ? "#D4AF37" : "#F9E29C",
          pulse: Math.random() * Math.PI * 2,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (mouse.current.active) {
        const mGlow = ctx.createRadialGradient(
          mouse.current.x, mouse.current.y, 0,
          mouse.current.x, mouse.current.y, 400
        )
        mGlow.addColorStop(0, "rgba(212, 175, 55, 0.08)")
        mGlow.addColorStop(1, "rgba(212, 175, 55, 0)")
        ctx.fillStyle = mGlow
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.02

        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        if (mouse.current.active) {
          const dx = mouse.current.x - p.x
          const dy = mouse.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            p.x += dx * 0.01
            p.y += dy * 0.01
          }
        }

        const opacity = Math.sin(p.pulse) * 0.3 + 0.7
        ctx.globalAlpha = opacity
        ctx.fillStyle = p.color

        if (p.color === "#D4AF37") {
          ctx.shadowBlur = 10
          ctx.shadowColor = "#D4AF37"
        } else {
          ctx.shadowBlur = 0
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const lOpacity = (1 - dist / 180) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(212, 175, 55, ${lOpacity})`
            ctx.lineWidth = 1
            ctx.globalAlpha = 1
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const handleMouseLeave = () => {
      mouse.current.active = false
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    resize()
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
