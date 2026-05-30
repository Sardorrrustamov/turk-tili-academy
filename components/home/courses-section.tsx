"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Award } from "lucide-react"
import { useLang } from "@/lib/i18n"

const certs = [
  { id:1, src:"/cert1.jpg" },
  { id:2, src:"/cert2.jpg" },
  { id:3, src:"/cert3.jpg" },
  { id:4, src:"/cert4.jpg" },
  { id:5, src:"/cert5.jpg" },
]

function CertPlaceholder({ num, label, sub }: { num:number; label:string; sub:string }) {
  const colors = ["#1e3a5f","#1a3a2f","#3a1e2f","#2f2a1a","#1a2a3a"]
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{ background:`linear-gradient(135deg,${colors[(num-1)%5]},rgba(8,14,40,0.9))` }}>
      <div className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background:"rgba(201,168,76,0.15)", border:"2px solid rgba(201,168,76,0.4)" }}>
        <Award className="w-7 h-7 text-primary" />
      </div>
      <div className="text-center">
        <p className="font-black text-primary text-xs tracking-widest uppercase">{label} {num}</p>
        <p className="text-muted-foreground text-[10px] mt-1">{sub}</p>
      </div>
    </div>
  )
}

/* Corner SVG decoration */
function Corner({ flip }: { flip?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      style={{ transform: flip ? "scale(-1,1)" : undefined }}>
      <path d="M2 20 L2 4 Q2 2 4 2 L20 2" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <circle cx="2" cy="20" r="1.5" fill="#FFD700" opacity="0.7"/>
      <circle cx="20" cy="2" r="1.5" fill="#FFD700" opacity="0.7"/>
    </svg>
  )
}

function CertCard({ cert, i, t }: { cert: { id:number; src:string }; i:number; t:(k:any)=>any }) {
  return (
    <motion.div
      initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ delay: i*0.12 }}
      className="group cursor-pointer w-full">

      {/* Outer frame wrapper */}
      <div
        className="relative p-[10px] rounded-2xl transition-all duration-500"
        style={{
          background:"linear-gradient(145deg,rgba(12,18,45,0.95),rgba(6,10,28,0.98))",
          border:"1px solid rgba(201,168,76,0.3)",
          boxShadow:"0 6px 28px rgba(0,0,0,0.5)",
        }}
        onMouseEnter={e=>{
          const el = e.currentTarget as HTMLElement
          el.style.borderColor="rgba(201,168,76,0.75)"
          el.style.boxShadow="0 0 40px rgba(201,168,76,0.2), 0 12px 48px rgba(0,0,0,0.6)"
          el.style.transform="translateY(-5px)"
        }}
        onMouseLeave={e=>{
          const el = e.currentTarget as HTMLElement
          el.style.borderColor="rgba(201,168,76,0.3)"
          el.style.boxShadow="0 6px 28px rgba(0,0,0,0.5)"
          el.style.transform="translateY(0)"
        }}>

        {/* Top shimmer line */}
        <div className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full opacity-60"
          style={{ background:"linear-gradient(90deg,transparent,#FFD700,transparent)" }} />

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 z-20"><Corner /></div>
        <div className="absolute top-2 right-2 z-20"><Corner flip /></div>
        <div className="absolute bottom-2 left-2 z-20" style={{ transform:"scale(1,-1)" }}><Corner /></div>
        <div className="absolute bottom-2 right-2 z-20" style={{ transform:"scale(-1,-1)" }}><Corner /></div>

        {/* Inner gold border line */}
        <div className="absolute inset-[8px] rounded-xl pointer-events-none z-10"
          style={{ border:"1px solid rgba(201,168,76,0.18)" }} />

        {/* Image area */}
        <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio:"4/3" }}>
          <Image
            src={cert.src} alt={`${t("cert_label")} ${cert.id}`} fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={e=>{ e.currentTarget.style.display="none" }} />
          <div className="absolute inset-0 -z-10">
            <CertPlaceholder num={cert.id} label={t("cert_label")} sub={t("cert_student")} />
          </div>

          {/* Hover inner glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ background:"linear-gradient(135deg,rgba(201,168,76,0.07) 0%,transparent 55%)", boxShadow:"inset 0 0 30px rgba(201,168,76,0.1)" }} />
        </div>

        {/* Bottom label */}
        <div className="flex items-center justify-center gap-2 mt-2.5">
          <div className="h-[1px] flex-1" style={{ background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.35))" }} />
          <div className="flex items-center gap-1.5">
            <Award className="w-3 h-3 text-primary opacity-70" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{ color:"rgba(201,168,76,0.7)" }}>{t("cert_student")}</span>
          </div>
          <div className="h-[1px] flex-1" style={{ background:"linear-gradient(90deg,rgba(201,168,76,0.35),transparent)" }} />
        </div>
      </div>
    </motion.div>
  )
}

export function CoursesSection() {
  const { t } = useLang()

  return (
    <section className="py-12 lg:py-24 px-4 lg:px-8 relative"
      style={{ background:"linear-gradient(180deg,rgba(4,8,28,0) 0%,rgba(8,14,40,0.6) 100%)" }}>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="flex items-center justify-center gap-3 mb-3">
          <div className="w-8 h-[1px]" style={{ background:"linear-gradient(90deg,transparent,#FFD700)" }} />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">{t("courses_label")}</span>
          <div className="w-8 h-[1px]" style={{ background:"linear-gradient(90deg,#FFD700,transparent)" }} />
        </motion.div>
        <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
          className="text-2xl lg:text-3xl font-black"
          style={{ background:"linear-gradient(135deg,#FFD700,#e8c96d)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
          {t("courses_title")}
        </motion.h2>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.2 }}
          className="text-muted-foreground text-sm mt-2">
          {t("courses_sub")}
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Row 1 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {certs.slice(0,3).map((cert,i) => (
            <CertCard key={cert.id} cert={cert} i={i} t={t} />
          ))}
        </div>
        {/* Row 2 — 2 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:w-2/3 lg:mx-auto">
          {certs.slice(3).map((cert,i) => (
            <CertCard key={cert.id} cert={cert} i={i+3} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
