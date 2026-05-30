"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, Award, BookOpen, Globe2, Users, Clock, Star, Send, X, ZoomIn } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useLang } from "@/lib/i18n"

const ICONS = [GraduationCap, Award, BookOpen, Globe2, Users, Clock]


function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0,2).toUpperCase()
  return (parts[0][0] + parts[parts.length-1][0]).toUpperCase()
}

function ReviewCard({ item, i }: { item: { quote:string; author:string; role:string }; i:number }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6+i*0.1 }}
      className="relative rounded-2xl p-6 overflow-hidden flex flex-col h-full"
      style={{
        background:"linear-gradient(145deg,rgba(12,20,50,0.95),rgba(6,10,30,0.98))",
        border:"1px solid rgba(201,168,76,0.25)",
        boxShadow:"0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.1)",
      }}>
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background:"linear-gradient(90deg,transparent,#FFD700,#e8c96d,transparent)" }} />
      {/* Big quote mark */}
      <div className="absolute top-2 right-4 font-serif text-6xl leading-none select-none pointer-events-none"
        style={{ color:"rgba(201,168,76,0.12)", fontFamily:"Georgia,serif" }}>&ldquo;</div>
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({length:5}).map((_,j)=>(
          <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
        ))}
      </div>
      {/* Quote */}
      <p className="text-sm text-foreground/85 leading-relaxed italic flex-1 mb-5">
        &ldquo;{item.quote}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-3 pt-4"
        style={{ borderTop:"1px solid rgba(201,168,76,0.15)" }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0"
          style={{ background:"rgba(201,168,76,0.12)", border:"1.5px solid rgba(201,168,76,0.35)", color:"#FFD700" }}>
          {getInitials(item.author)}
        </div>
        <div>
          <p className="text-sm font-bold text-foreground leading-tight">{item.author}</p>
          <p className="text-[11px] mt-0.5 font-medium" style={{ color:"#c9a84c" }}>{item.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function AboutPageContent() {
  const [certOpen, setCertOpen] = useState(false)
  const { t } = useLang()

  const features: string[] = t("about_features")
  const stats = [
    { n:"100%", l:t("stat_success4") },
    { n:"5+",   l:t("stat_exp4")     },
    { n:"15+",  l:t("stat_books")    },
    { n:"C1",   l:t("stat_level4")   },
  ]
  const reviews: { quote:string; author:string; role:string }[] = t("about_reviews")

  return (
    <div className="pt-24 lg:pt-32 pb-20">

      {/* ── CERT MODAL ── */}
      <AnimatePresence>
        {certOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setCertOpen(false)}
            style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(4,8,28,0.92)", backdropFilter:"blur(8px)",
              display:"flex", alignItems:"center", justifyContent:"center", padding:"1.5rem" }}>
            <motion.div initial={{ opacity:0, scale:0.88, y:24 }} animate={{ opacity:1, scale:1, y:0 }}
              exit={{ opacity:0, scale:0.88, y:24 }} transition={{ type:"spring", stiffness:300, damping:28 }}
              onClick={e => e.stopPropagation()}
              style={{ position:"relative", maxWidth:640, width:"100%", borderRadius:20, overflow:"hidden",
                border:"1px solid rgba(201,168,76,0.35)", background:"rgba(8,14,40,0.98)" }}>
              <div style={{ height:3, background:"linear-gradient(90deg,#b8912a,#FFD700,#e8c96d,#b8912a)" }} />
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px 10px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Award className="w-4 h-4" style={{ color:"#FFD700" }} />
                  <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#FFD700" }}>
                    {t("cert_modal_title")}
                  </span>
                </div>
                <button onClick={() => setCertOpen(false)}
                  style={{ width:32, height:32, borderRadius:"50%", background:"rgba(201,168,76,0.08)",
                    border:"1px solid rgba(201,168,76,0.22)", display:"flex", alignItems:"center",
                    justifyContent:"center", cursor:"pointer", color:"rgba(240,238,238,0.7)" }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div style={{ position:"relative", width:"100%", aspectRatio:"4/3" }}>
                <Image src="/teacherCert.jpg" alt="TYS Certificate" fill className="object-contain"
                  style={{ padding:"0 12px 16px" }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

        {/* ── HERO BLOCK ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">

          {/* Photo */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio:"4/5" }}>
              <Image src="/asoschi.jpg" alt="Mashhura Imomova" fill className="object-cover object-top" priority />
              <div className="absolute bottom-0 left-0 right-0 h-32"
                style={{ background:"linear-gradient(0deg,rgba(5,9,26,0.92) 0%,transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 py-4 text-center">
                <p className="text-sm font-black tracking-[0.18em] uppercase"
                  style={{ background:"linear-gradient(135deg,#FFD700,#e8c96d)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  MASHHURA IMOMOVA
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 tracking-widest">TYS C1</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full pointer-events-none"
              style={{ background:"rgba(201,168,76,0.12)", filter:"blur(30px)" }} />

            <div className="grid grid-cols-4 gap-2 mt-4">
              {stats.map(s=>(
                <div key={String(s.l)} className="glass-card rounded-xl py-3 text-center" style={{ borderColor:"rgba(201,168,76,0.2)" }}>
                  <div className="text-base font-black" style={{ background:"linear-gradient(135deg,#FFD700,#e8c96d)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{s.n}</div>
                  <div className="text-[9px] text-muted-foreground mt-1 tracking-wide uppercase leading-tight">{s.l}</div>
                </div>
              ))}
            </div>

            <motion.button initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
              onClick={() => setCertOpen(true)} whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
              className="mt-3 w-full flex items-center justify-center gap-2.5 rounded-xl py-3 px-4 transition-all"
              style={{ background:"rgba(201,168,76,0.07)", border:"1px solid rgba(201,168,76,0.28)", cursor:"pointer", color:"#FFD700" }}>
              <Award className="w-4 h-4" style={{ color:"#FFD700" }} />
              <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                {t("cert_view")}
              </span>
              <ZoomIn className="w-3.5 h-3.5" style={{ color:"rgba(201,168,76,0.6)", marginLeft:"auto" }} />
            </motion.button>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-[1px]" style={{ background:"linear-gradient(90deg,#FFD700,transparent)" }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">{t("about_label")}</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-black mb-6 leading-tight text-foreground">
              {t("about_title")}
            </h1>

            <div className="flex flex-col gap-3 mb-8">
              {features.map((text, i)=>{
                const Icon = ICONS[i] ?? GraduationCap
                return (
                  <motion.div key={i}
                    initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.08 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-300 cursor-default"
                    style={{ background:"rgba(8,14,40,0.6)", border:"1px solid rgba(201,168,76,0.14)", backdropFilter:"blur(12px)", boxShadow:"none" }}
                    onMouseEnter={e=>{
                      const el = e.currentTarget as HTMLElement
                      el.style.border="1px solid rgba(201,168,76,0.55)"
                      el.style.boxShadow="0 0 18px rgba(201,168,76,0.18), inset 0 0 20px rgba(201,168,76,0.06)"
                      el.style.background="rgba(201,168,76,0.07)"
                    }}
                    onMouseLeave={e=>{
                      const el = e.currentTarget as HTMLElement
                      el.style.border="1px solid rgba(201,168,76,0.14)"
                      el.style.boxShadow="none"
                      el.style.background="rgba(8,14,40,0.6)"
                    }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
                      style={{ background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.22)" }}>
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed pt-1.5">
                      <span className="text-primary font-bold mr-1">—</span>{text}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85 }}
              className="rounded-2xl p-5 mb-4"
              style={{ background:"linear-gradient(135deg,rgba(201,168,76,0.1) 0%,rgba(201,168,76,0.04) 100%)", border:"1px solid rgba(201,168,76,0.3)", backdropFilter:"blur(16px)" }}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:"rgba(201,168,76,0.15)", border:"1px solid rgba(201,168,76,0.3)" }}>
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Kurs va uning narxlari haqida batafsil ma&apos;lumot olish uchun:
                  </p>
                  <Link href="https://t.me/ozturk_bot" target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                    style={{ background:"linear-gradient(135deg,#FFD700,#e8c96d)", color:"#080e25", boxShadow:"0 4px 20px rgba(201,168,76,0.3)" }}>
                    <Send className="w-4 h-4" /> @ozturk_bot ga yozing
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.95 }}
              className="rounded-2xl p-5"
              style={{ background:"rgba(8,14,40,0.7)", border:"1px solid rgba(201,168,76,0.18)", backdropFilter:"blur(16px)" }}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)" }}>
                  <span className="text-lg">📢</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Turk tilini <strong className="text-primary">BEPUL</strong> o&apos;rganishni xohlasangiz:
                  </p>
                  <Link href="https://t.me/Mashhura_hoca" target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:bg-primary/10"
                    style={{ border:"1px solid rgba(201,168,76,0.4)", color:"#FFD700" }}>
                    📢 @Mashhura_hoca kanaliga obuna bo&apos;ling
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── REVIEWS ── */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }} className="mb-16">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[1px] w-12" style={{ background:"linear-gradient(90deg,transparent,#FFD700)" }} />
              <Star className="w-4 h-4 text-primary fill-primary" />
              <div className="h-[1px] w-12" style={{ background:"linear-gradient(90deg,#FFD700,transparent)" }} />
            </div>
            <h2 className="text-2xl lg:text-3xl font-black">
              <span className="text-gradient-gold">{t("about_reviews_title")}</span>
            </h2>
          </div>

          {/* Row 1 — 3 cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {reviews.slice(0,3).map((item, i)=>(
              <ReviewCard key={item.author} item={item} i={i} />
            ))}
          </div>
          {/* Row 2 — 2 cards centered */}
          <div className="flex justify-center gap-5">
            {reviews.slice(3).map((item, i)=>(
              <div key={item.author} className="w-full md:w-[calc(33.333%-10px)]">
                <ReviewCard item={item} i={i+3} />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
