"use client"

import { motion } from "framer-motion"
import { Brain, Target, Repeat, MessageSquare, BarChart3, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const methodologies = [
  {
    icon: Brain,
    title: "Kognitiv immersiya",
    description: "Uzoq muddatli eslab qolish uchun bir nechta kognitiv yo'llarni jalb qiladigan chuqur o'rganish stsenariylari.",
    features: ["Neyral yo'lni faollashtirish", "Kontekstga asoslangan o'rganish", "Ko'p sensorli jalb qilish"],
  },
  {
    icon: Target,
    title: "Maqsadga yo'naltirilgan mashq",
    description: "Akademik yoki professional maqsadlaringizga qaratilgan maxsus mashqlar.",
    features: ["Shaxsiylashtirilgan maqsadlar", "Ilg'arilik bosqichlari", "Yutuqlarni kuzatish"],
  },
  {
    icon: Repeat,
    title: "Intervallar bilan takrorlash",
    description: "Uzoq muddatli xotirani maksimal saqlash uchun ilmiy asoslangan ko'rib chiqish intervallari.",
    features: ["Optimallashtirilgan takrorlash sikllari", "Moslashuvchan qiyinlik", "Xotirani mustahkamlash"],
  },
  {
    icon: MessageSquare,
    title: "Interaktiv muloqot",
    description: "Ona tilida so'zlashuvchilar bilan haqiqiy suhbat amaliyoti va AI asosidagi fikr-mulohaza tizimlari.",
    features: ["Ona tilida so'zlashuvchilar bilan seanslar", "AI suhbatdoshlari", "Tezkor fikr-mulohaza"],
  },
]

const process = [
  { step: 1, title: "Baholash", description: "Joriy darajangizni kompleks baholash" },
  { step: 2, title: "Shaxsiylashtirish", description: "Maqsadlaringizga asoslangan maxsus o'quv yo'li" },
  { step: 3, title: "Immersiya", description: "Ekspert yo'riqnomasi bilan intensiv mashq" },
  { step: 4, title: "Mustahkamlash", description: "Muntazam ko'rib chiqish va ilg'arilikni kuzatish" },
  { step: 5, title: "Mahorat", description: "Til maqsadlaringizga erishish" },
]

export function MethodsPageContent() {
  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Tasdiqlangan metodologiya</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Bizning </span>
            <span className="text-gradient-gold">Metodlar</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Kognitiv fan, tilshunoslik va o'nlab yillik o'qitish tajribasini birlashtirgan ilmiy asoslangan yondashuv.
          </p>
        </motion.div>

        {/* Methodologies Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {methodologies.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <method.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{method.title}</h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{method.description}</p>
                </div>
              </div>
              <div className="space-y-2 ml-18">
                {method.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
            <span className="text-foreground">Bizning </span>
            <span className="text-gradient-gold">Jarayon</span>
          </h2>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex-1 relative"
              >
                <div className="glass-card rounded-xl p-6 text-center relative z-10">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-full h-px bg-border translate-x-1/2 z-0" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-8 lg:p-12 text-center"
        >
          <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Tasdiqlangan natijalar
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Bizning metodologiyamiz izchil, o'lchanadigan yaxshilanishlarni ta'minlaydi. 
            Talabalarning 98% birinchi urinishda maqsadli ballariga erishadi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="border-border hover:border-primary hover:text-primary">
                Kurslarni ko'rish
              </Button>
            </Link>
            <Link href="/apply">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold font-semibold">
                O'qishni boshlash
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
