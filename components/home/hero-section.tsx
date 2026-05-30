"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Video, Gift, ChevronDown } from "lucide-react"
import { StarsBackground } from "@/components/home/stars-background"
import { useLang } from "@/lib/i18n"

function GlassPanel({ icon: Icon, label, delay }: {
  icon: React.ElementType; label: string; delay: number
}) {
  const [spin, setSpin] = useState(false)
  return (
    <motion.div
      initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
      transition={{ delay, duration:0.6 }}
      onClick={() => { setSpin(true); setTimeout(()=>setSpin(false),900) }}
      className="cursor-pointer select-none"
      style={{ animation:`float 4s ease-in-out ${delay}s infinite` }}>
      <motion.div animate={spin?{rotate:360}:{rotate:0}} transition={{duration:0.9,ease:"easeInOut"}}>
        <div className="rounded-xl px-3 py-2.5 flex items-center gap-2 relative"
          style={{
            background:"rgba(8,14,40,0.82)", border:"1px solid rgba(201,168,76,0.4)",
            backdropFilter:"blur(20px)", boxShadow:"0 4px 24px rgba(0,0,0,0.4)",
            minWidth:"130px"
          }}>
          <div className="absolute top-0 left-3 right-3 h-[1px]"
            style={{background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.7),transparent)"}}/>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{background:"rgba(201,168,76,0.12)",border:"1px solid rgba(201,168,76,0.25)"}}>
            <Icon className="w-3.5 h-3.5 text-primary"/>
          </div>
          <p className="text-[11px] font-bold text-white leading-tight whitespace-pre-line">{label}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  const { t } = useLang()

  const panels = [
    { icon:Video,    label:t("hero_panel_live"), delay:0   },
    { icon:Gift,     label:t("hero_panel_free"), delay:0.6 },
    { icon:BookOpen, label:t("hero_panel_open"), delay:1.2 },
  ]

  const stats = [
    { n:"100%", l:t("stat_success") },
    { n:"5+",   l:t("stat_exp")     },
    { n:"C1",   l:t("stat_level")   },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden"
      style={{background:"radial-gradient(ellipse 100% 80% at 50% 0%, rgba(8,16,50,1) 0%, rgba(3,7,20,1) 60%)"}}>

      <StarsBackground/>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{background:"radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 60%)"}}/>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] pointer-events-none"
        style={{background:"radial-gradient(circle,rgba(30,60,160,0.12) 0%,transparent 60%)"}}/>

      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden w-full flex flex-col items-center pt-24 pb-8 px-4">

        {/* Title */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
          className="text-center mb-5 z-10">
          <h1 className="font-black uppercase leading-[0.95]" style={{fontSize:"clamp(1.7rem,8vw,2.6rem)"}}>
            <span style={{
              background:"linear-gradient(135deg,#b8912a,#FFD700,#e8c96d,#b8912a)",
              backgroundSize:"200% auto", WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent", backgroundClip:"text",
              animation:"shimmer 4s linear infinite"
            }}>
              TURK TILI DARSLARI 0 DAN
            </span>
          </h1>
          <h2 className="font-black uppercase leading-none mt-1" style={{
            fontSize:"clamp(2.4rem,11vw,3.8rem)",
            background:"linear-gradient(135deg,#e8c96d,#FFD700,#c9a84c)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"
          }}>
            MASHHURA
          </h2>
          <p className="mt-2 font-semibold uppercase tracking-widest text-muted-foreground text-[9px]">
            2026-YIL KURSGA QABUL DAVOM ETMOQDA
          </p>
        </motion.div>

        {/* Teacher image */}
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.2,duration:0.8}}
          className="relative w-full z-10 mb-5" style={{maxWidth:"340px",height:"320px"}}>
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{background:"radial-gradient(ellipse at 50% 70%,rgba(201,168,76,0.15) 0%,transparent 65%)",filter:"blur(15px)"}}/>
          <div className="absolute left-[8%] right-[5%] bottom-0 top-0 z-10">
            <Image src="/asoschi.jpg" alt="Mashhura Hoca" fill className="object-cover object-top"
              style={{maskImage:"linear-gradient(to bottom, black 65%, transparent 100%)"}} priority/>
          </div>
          <div className="absolute bottom-0 left-[12%] right-[8%] z-20">
            <div className="rounded-xl overflow-hidden"
              style={{background:"rgba(8,14,40,0.85)",border:"1px solid rgba(201,168,76,0.35)",backdropFilter:"blur(16px)"}}>
              <div className="py-2 text-center text-[10px] font-black tracking-[0.18em] uppercase"
                style={{background:"linear-gradient(90deg,rgba(180,138,50,0.9),rgba(220,185,80,0.95))",color:"#080e25"}}>
                MASHHURA HOCA
              </div>
              <div className="py-1.5 text-center text-[8px] tracking-widest text-muted-foreground uppercase">
                {t("hero_badge_sub")}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panels — horizontal scroll row */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.6}}
          className="w-full overflow-x-auto pb-2 mb-5 z-10" style={{scrollbarWidth:"none"}}>
          <div className="flex gap-3 px-1" style={{width:"max-content"}}>
            {panels.map((p,i)=>(
              <GlassPanel key={i} icon={p.icon} label={p.label} delay={p.delay}/>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.45,duration:0.6}}
          className="grid grid-cols-3 gap-3 w-full z-10 mb-6">
          {stats.map((s)=>(
            <div key={String(s.l)} className="rounded-xl py-4 text-center"
              style={{background:"rgba(8,14,40,0.7)",border:"1px solid rgba(201,168,76,0.2)",backdropFilter:"blur(12px)"}}>
              <div className="text-xl font-black leading-none"
                style={{background:"linear-gradient(135deg,#FFD700,#e8c96d)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                {s.n}
              </div>
              <div className="text-[8px] text-muted-foreground mt-1.5 tracking-widest uppercase">{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.55,duration:0.6}}
          className="flex gap-3 w-full z-10">
          <Link href="/connect" className="flex-1">
            <button className="w-full py-3.5 rounded-xl font-black text-sm tracking-wider uppercase"
              style={{background:"linear-gradient(135deg,#8a6820,#C9A84C)",color:"#04081c",boxShadow:"0 4px 20px rgba(201,168,76,0.35)"}}>
              {t("nav_contact") as string}
            </button>
          </Link>
          <Link href="/about" className="flex-1">
            <button className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase"
              style={{background:"rgba(8,14,40,0.7)",border:"1px solid rgba(201,168,76,0.35)",color:"rgba(201,168,76,0.9)"}}>
              {t("nav_about") as string}
            </button>
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{opacity:0}} animate={{opacity:0.5}} transition={{delay:1}}
          className="mt-6 flex flex-col items-center gap-1" style={{animation:"bounce 2s ease-in-out infinite"}}>
          <span className="text-[9px] tracking-widest uppercase text-primary/60">Pastga</span>
          <ChevronDown className="w-4 h-4 text-primary/60"/>
        </motion.div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:flex w-full flex-col items-center pt-20 pb-10">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
          className="relative z-10 text-center px-4 mb-6">
          <h1 className="font-black uppercase leading-[0.92]" style={{fontSize:"clamp(2rem,5.5vw,6rem)"}}>
            <span style={{
              background:"linear-gradient(135deg,#b8912a 0%,#FFD700 40%,#e8c96d 60%,#b8912a 100%)",
              backgroundSize:"200% auto", WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent", backgroundClip:"text",
              animation:"shimmer 4s linear infinite"
            }}>
              TURK TILI DARSLARI 0 DAN
            </span>
          </h1>
          <motion.h2 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.7}}
            className="font-black uppercase leading-none mt-1"
            style={{
              fontSize:"clamp(1.6rem,4.5vw,5rem)",
              background:"linear-gradient(135deg,#e8c96d,#FFD700,#c9a84c)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"
            }}>
            MASHHURA
          </motion.h2>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.28,duration:0.7}}
            className="mt-3 font-semibold uppercase tracking-[0.28em] text-muted-foreground"
            style={{fontSize:"clamp(0.6rem,1.1vw,0.82rem)"}}>
            2026-YIL KURSGA QABUL DAVOM ETMOQDA
          </motion.p>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1200px] px-4 flex items-center gap-6 lg:gap-8">
          <motion.div initial={{opacity:0,x:-50}} animate={{opacity:1,x:0}} transition={{delay:0.3,duration:0.9}}
            className="flex-shrink-0 relative" style={{width:480,height:480}}>
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{background:"radial-gradient(ellipse at 50% 70%,rgba(201,168,76,0.12) 0%,transparent 65%)",filter:"blur(20px)"}}/>
            <div className="absolute left-[12%] right-[5%] bottom-0 top-[2%] z-10 pointer-events-none">
              <Image src="/asoschi.jpg" alt="Mashhura Hoca" fill className="object-cover object-center"
                style={{maskImage:"linear-gradient(to bottom, black 70%, transparent 100%)"}} priority/>
            </div>
            <div className="absolute bottom-4 left-[18%] right-[10%] z-20 pointer-events-none">
              <div className="rounded-xl overflow-hidden"
                style={{background:"rgba(8,14,40,0.82)",border:"1px solid rgba(201,168,76,0.35)",backdropFilter:"blur(16px)"}}>
                <div className="py-2 text-center text-[11px] font-black tracking-[0.18em] uppercase"
                  style={{background:"linear-gradient(90deg,rgba(180,138,50,0.9),rgba(220,185,80,0.95))",color:"#080e25"}}>
                  MASHHURA HOCA
                </div>
                <div className="py-1.5 text-center text-[9px] tracking-widest text-muted-foreground uppercase">
                  {t("hero_badge_sub")}
                </div>
              </div>
            </div>
            <div className="absolute top-[8%] left-[-5%] z-20" style={{animation:"float 4s ease-in-out 0s infinite"}}>
              <GlassPanel icon={Video} label={t("hero_panel_live")} delay={0}/>
            </div>
            <div className="absolute top-[12%] right-[-4%] z-20" style={{animation:"float 4s ease-in-out 0.6s infinite"}}>
              <GlassPanel icon={Gift} label={t("hero_panel_free")} delay={0.6}/>
            </div>
            <div className="absolute bottom-[18%] right-[2%] z-20" style={{animation:"float 4s ease-in-out 1.2s infinite"}}>
              <GlassPanel icon={BookOpen} label={t("hero_panel_open")} delay={1.2}/>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} transition={{delay:0.4,duration:0.9}}
            className="flex-1 flex flex-col min-w-0">
            <div className="relative w-full rounded-2xl overflow-hidden"
              style={{height:360,border:"1px solid rgba(201,168,76,0.25)",boxShadow:"0 0 60px rgba(201,168,76,0.08)"}}>
              <Image src="/glavni.jpg" alt="Mashhura Hoca Academy" fill className="object-cover object-center" priority/>
              <div className="absolute inset-0 pointer-events-none"
                style={{background:"linear-gradient(135deg,rgba(5,9,26,0.15) 0%,transparent 50%,rgba(5,9,26,0.15) 100%)"}}/>
              <div className="absolute bottom-0 left-0 right-0 z-10 py-3 text-center"
                style={{background:"linear-gradient(0deg,rgba(4,8,28,0.88) 0%,transparent 100%)"}}>
                <p className="text-[9px] tracking-[0.22em] text-muted-foreground uppercase">{t("hero_img_sub")}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {stats.map((s)=>(
                <div key={String(s.l)} className="rounded-xl py-4 text-center transition-all hover:border-primary/50 cursor-default"
                  style={{background:"rgba(8,14,40,0.7)",border:"1px solid rgba(201,168,76,0.2)",backdropFilter:"blur(12px)"}}>
                  <div className="text-xl font-black leading-none"
                    style={{background:"linear-gradient(135deg,#FFD700,#e8c96d)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                    {s.n}
                  </div>
                  <div className="text-[9px] text-muted-foreground mt-1.5 tracking-widest uppercase">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
      `}</style>
    </section>
  )
}
