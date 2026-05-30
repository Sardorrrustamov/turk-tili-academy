"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useLang } from "@/lib/i18n"

const COLORS = [
  "#1e4a3a","#1a2e4a","#3a2a1a","#2a1a3a","#1a3a2a",
  "#2a3a1a","#3a1a2a","#1a3a3a","#2a1a1a","#1a2a1a","#2a1a3a"
]

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export function FacultySection() {
  const { t } = useLang()
  const reviews: { name:string; role:string; text:string }[] = t("faculty_reviews")

  const doubled = [...reviews, ...reviews]

  const trackRef = useRef<HTMLDivElement>(null)
  const animRef  = useRef<number | null>(null)
  const posRef   = useRef(0)
  const SPEED    = 0.5
  const CARD_W   = 300

  useEffect(() => {
    const total = CARD_W * reviews.length
    const loop = () => {
      posRef.current += SPEED
      if (posRef.current >= total) posRef.current = 0
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${posRef.current}px)`
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews.length])

  const pause  = () => { if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = null } }
  const resume = () => {
    if (animRef.current) return
    const total = CARD_W * reviews.length
    const loop = () => {
      posRef.current += SPEED
      if (posRef.current >= total) posRef.current = 0
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${posRef.current}px)`
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)
  }

  return (
    <section className="py-12 lg:py-20 relative overflow-hidden"
      style={{ background:"linear-gradient(180deg,rgba(8,14,40,0.6) 0%,rgba(4,8,28,0.8) 100%)" }}>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-8 text-center">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="flex items-center justify-center gap-3 mb-3">
          <div className="w-8 h-[1px]" style={{ background:"linear-gradient(90deg,transparent,#FFD700)" }} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">{t("faculty_label")}</span>
          <div className="w-8 h-[1px]" style={{ background:"linear-gradient(90deg,#FFD700,transparent)" }} />
        </motion.div>
        <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
          className="text-2xl lg:text-3xl font-black"
          style={{ background:"linear-gradient(135deg,#FFD700,#e8c96d)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
          {t("faculty_title")}
        </motion.h2>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.2 }}
          className="text-muted-foreground text-sm mt-2">
          {t("faculty_sub")}
        </motion.p>
      </div>

      {/* Infinite scroll */}
      <div className="relative overflow-hidden" onMouseEnter={pause} onMouseLeave={resume}>
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background:"linear-gradient(90deg,rgba(4,8,28,1) 0%,transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background:"linear-gradient(270deg,rgba(4,8,28,1) 0%,transparent 100%)" }} />

        <div ref={trackRef} className="flex gap-5 pl-8" style={{ willChange:"transform", width:"max-content" }}>
          {doubled.map((item, i) => {
            const idx = i % reviews.length
            return (
              <div key={i}
                className="flex-shrink-0 rounded-2xl p-5 relative overflow-hidden cursor-default flex flex-col"
                style={{ width:280, minHeight:210,
                  background:`linear-gradient(135deg,${COLORS[idx % COLORS.length]},rgba(8,14,40,0.95))`,
                  border:"1px solid rgba(201,168,76,0.18)",
                  boxShadow:"0 4px 20px rgba(0,0,0,0.35)",
                  transition:"border-color 0.25s,box-shadow 0.25s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(201,168,76,0.5)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.5)" }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(201,168,76,0.18)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.35)" }}>

                <div className="absolute top-0 left-0 right-0 h-[1.5px]"
                  style={{ background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)" }} />
                <div className="absolute top-3 right-4 opacity-10">
                  <Quote className="w-8 h-8 text-primary" />
                </div>

                <div className="flex gap-0.5 mb-3">
                  {Array.from({length:5}).map((_,j)=>(
                    <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Text grows to fill space */}
                <p className="text-sm text-foreground/85 leading-relaxed italic flex-1">
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* Author always at bottom */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0"
                    style={{ background:"rgba(201,168,76,0.15)", border:"1.5px solid rgba(201,168,76,0.35)", color:"#FFD700" }}>
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight">{item.name}</p>
                    <p className="text-[11px] text-primary/80 mt-0.5">{item.role}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 pointer-events-none"
        style={{ background:"radial-gradient(ellipse,rgba(201,168,76,0.06) 0%,transparent 70%)" }} />
    </section>
  )
}
