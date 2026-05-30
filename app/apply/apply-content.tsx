"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const courses = [
  { id: "ielts", name: "IELTS Mahorati", duration: "12 hafta" },
  { id: "professional", name: "Professional Ingliz tili", duration: "8 hafta" },
  { id: "expressions", name: "Tabiiy Iboralar", duration: "6 hafta" },
  { id: "global", name: "Global Til Dasturlari", duration: "16 hafta" },
]

const levels = [
  { id: "beginner", name: "Boshlang'ich", description: "Endigina boshlamoqdaman" },
  { id: "elementary", name: "Elementary", description: "Asosiy tushuncha" },
  { id: "intermediate", name: "O'rta", description: "Suhbat darajasi" },
  { id: "advanced", name: "Ilg'or", description: "Ravon muloqot" },
]

export function ApplyPageContent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    level: "",
    goals: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const totalSteps = 3

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const isStepValid = () => {
    if (step === 1) return formData.firstName && formData.lastName && formData.email
    if (step === 2) return formData.course && formData.level
    return true
  }

  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Akademiyamizga qo'shiling</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-foreground">Ariza </span>
              <span className="text-gradient-gold">topshirish</span>
            </h1>
            <p className="text-muted-foreground">
              Til mukammalligiga birinchi qadamni qo'ying
            </p>
          </motion.div>

          {/* Progress Steps */}
          {!submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                        step >= s
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                    </div>
                    {s < 3 && (
                      <div
                        className={cn(
                          "w-12 lg:w-20 h-1 mx-2 rounded-full transition-colors",
                          step > s ? "bg-primary" : "bg-secondary"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 lg:gap-16 mt-2 text-xs text-muted-foreground">
                <span>Shaxsiy ma'lumot</span>
                <span>Kurs tanlash</span>
                <span>Tasdiqlash</span>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 lg:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Ariza topshirildi!</h2>
                  <p className="text-muted-foreground mb-6">
                    Mashhura Hoca Akademiyasiga ariza topshirganingiz uchun rahmat. Jamoamiz arizangizni 
                    ko'rib chiqadi va 48 soat ichida siz bilan bog'lanadi.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tasdiqlash xati <span className="text-foreground">{formData.email}</span> manziliga yuborildi
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h2 className="text-xl font-semibold text-foreground mb-4">Shaxsiy ma'lumot</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                            Ism *
                          </label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                            className="bg-secondary/50 border-border"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                            Familiya *
                          </label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                            className="bg-secondary/50 border-border"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Telefon (Ixtiyoriy)
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Course Selection */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">Kursni tanlang</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {courses.map((course) => (
                            <button
                              key={course.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, course: course.id })}
                              className={cn(
                                "p-4 rounded-xl text-left transition-all",
                                formData.course === course.id
                                  ? "bg-primary/20 border-2 border-primary"
                                  : "bg-secondary/50 border-2 border-transparent hover:border-border"
                              )}
                            >
                              <div className="font-medium text-foreground">{course.name}</div>
                              <div className="text-sm text-muted-foreground">{course.duration}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Joriy darajangiz</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {levels.map((level) => (
                            <button
                              key={level.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, level: level.id })}
                              className={cn(
                                "p-4 rounded-xl text-left transition-all",
                                formData.level === level.id
                                  ? "bg-primary/20 border-2 border-primary"
                                  : "bg-secondary/50 border-2 border-transparent hover:border-border"
                              )}
                            >
                              <div className="font-medium text-foreground">{level.name}</div>
                              <div className="text-sm text-muted-foreground">{level.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Confirmation */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-semibold text-foreground mb-4">Arizangizni tasdiqlang</h2>
                      
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-secondary/50">
                          <div className="text-sm text-muted-foreground mb-1">Ism</div>
                          <div className="font-medium text-foreground">{formData.firstName} {formData.lastName}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-secondary/50">
                          <div className="text-sm text-muted-foreground mb-1">Email</div>
                          <div className="font-medium text-foreground">{formData.email}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-secondary/50">
                          <div className="text-sm text-muted-foreground mb-1">Tanlangan kurs</div>
                          <div className="font-medium text-foreground">
                            {courses.find((c) => c.id === formData.course)?.name || "Tanlanmagan"}
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-secondary/50">
                          <div className="text-sm text-muted-foreground mb-1">Joriy daraja</div>
                          <div className="font-medium text-foreground">
                            {levels.find((l) => l.id === formData.level)?.name || "Tanlanmagan"}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Ushbu arizani yuborish orqali qabul jamoamiz tomonidan bog'lanishga rozilik bildirasiz.
                      </p>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-border">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="border-border"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Orqaga
                      </Button>
                    ) : (
                      <div />
                    )}
                    
                    {step < totalSteps ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Davom etish
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                      >
                        Arizani yuborish
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
