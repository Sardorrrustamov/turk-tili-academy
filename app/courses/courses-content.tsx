"use client"

import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Languages, Globe, Clock, Users, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const courses = [
  {
    icon: GraduationCap,
    title: "IELTS Mahorati",
    description: "Maqsadli ball olish uchun tasdiqlangan usullar bilan imtihonga kompleks tayyorgarlik. To'rtta modul bo'yicha ekspert yo'riqnomasi: Tinglash, O'qish, Yozish va Gapirish.",
    duration: "12 hafta",
    students: "2,500+",
    rating: "4.9",
    features: ["Sinov testlari", "1-ga-1 fikr-mulohaza", "Band 7+ kafolati", "Moslashuvchan jadval"],
    href: "/courses/ielts",
    popular: true,
  },
  {
    icon: Briefcase,
    title: "Professional Ingliz tili",
    description: "Interaktiv darslar orqali muhim biznes kommunikatsiya ko'nikmalarini rivojlantiring. Korporativ mutaxassislar, tadbirkorlar va karyera o'sishini istovchilar uchun ideal.",
    duration: "8 hafta",
    students: "1,800+",
    rating: "4.8",
    features: ["Biznes yozuvi", "Prezentatsiya ko'nikmalari", "Email mahorati", "Uchrashuv protokollari"],
    href: "/courses/professional",
    popular: false,
  },
  {
    icon: Languages,
    title: "Tabiiy Iboralar",
    description: "Tabiiy til ifodalari va idiomatik foydalanishni o'rganing. Kundalik vaziyatlarda ishonch va ravonlik bilan ona tilida gapiruvchi kabi muloqot qilishni o'rganing.",
    duration: "6 hafta",
    students: "1,200+",
    rating: "4.9",
    features: ["Idiomlar kutubxonasi", "Madaniy kontekst", "Haqiqiy suhbatlar", "Talaffuz mashg'uloti"],
    href: "/courses/expressions",
    popular: false,
  },
  {
    icon: Globe,
    title: "Global Til Dasturlari",
    description: "Akademik va professional kontekstlar uchun ilg'or nutq strategiyalari. Bizning kompleks global dasturimiz bilan kommunikatsiyangizni yangi darajaga ko'taring.",
    duration: "16 hafta",
    students: "800+",
    rating: "4.7",
    features: ["Ko'p tilli qo'llab-quvvatlash", "Xalqaro sertifikat", "Global tarmoq", "Karyera joylashtiruvi"],
    href: "/courses/global",
    popular: false,
  },
]

export function CoursesPageContent() {
  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Premium </span>
            <span className="text-gradient-gold">Kurslar</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Xalqaro tan olingan dasturlarimiz bilan til ko'nikmalaringizni o'zgartiring. 
            Har bir kurs o'lchanadigan natijalar berish uchun ekspert ta'limchilar tomonidan ishlab chiqilgan.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col relative overflow-hidden group hover:border-primary/50 transition-colors">
                {/* Popular badge */}
                {course.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Eng mashhur
                  </div>
                )}

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <course.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h2>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-primary" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {course.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Link href={course.href}>
                    <Button className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors group/btn">
                      <span>Batafsil</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-card rounded-2xl p-8 lg:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Qaysi kurs sizga mos ekanini bilmayapsizmi?
            </h3>
            <p className="text-muted-foreground mb-6">
              Joriy darajangizni aniqlash va shaxsiy tavsiyalar olish uchun bepul baholashimizni o'ting.
            </p>
            <Link href="/apply">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold font-semibold">
                Bepul baholashni boshlash
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
