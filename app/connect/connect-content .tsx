"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLang } from "@/lib/i18n"

const STORAGE_KEY = "mh_sent_contacts"
const onlyLetters = (v:string) => /^[a-zA-ZА-Яа-яЎўҚқҒғҲҳ\s'-]*$/.test(v)
const countWords  = (v:string) => v.trim()===""?0:v.trim().split(/\s+/).length
const normalize   = (v:string) => v.trim().toLowerCase().replace(/\s+/g," ")
interface SentRecord { fullName:string; phone:string }
function getSentList():SentRecord[] { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]") } catch { return [] } }
function addSentRecord(r:SentRecord) { const l=getSentList(); l.push(r); localStorage.setItem(STORAGE_KEY,JSON.stringify(l)) }
function checkDuplicate(fullName:string,phone:string):"name"|"phone"|null {
  const l=getSentList(),n=normalize(fullName),p=phone.replace(/\s/g,"")
  for(const r of l){ if(normalize(r.fullName)===n)return"name"; if(r.phone.replace(/\s/g,"")===p)return"phone" }
  return null
}

export function ConnectPageContent() {
  const { t } = useLang()
  const [submitted,   setSubmitted]   = useState(false)
  const [alreadySent, setAlreadySent] = useState<"name"|"phone"|null>(null)
  const [firstName,   setFirstName]   = useState("")
  const [lastName,    setLastName]    = useState("")
  const [phone,       setPhone]       = useState("+998")
  const [message,     setMessage]     = useState("")
  const [errors,      setErrors]      = useState({firstName:"",lastName:"",phone:"",message:""})

  const contactInfo = [
    { icon:Mail,   label:t("connect_email_label"),    value:"Imomovam74@gmail.com",  href:"mailto:Imomovam74@gmail.com" },
    { icon:Phone,  label:t("connect_phone"),           value:"+998 70 232 19 97",      href:"tel:+998702321997" },
    { icon:MapPin, label:t("connect_location_label"),  value:t("connect_location_value"),  href:"#" },
    { icon:Clock,  label:t("connect_hours_label"),     value:t("connect_hours_value"),  href:"#" },
  ]

  const handleName=(val:string,setter:(v:string)=>void,field:"firstName"|"lastName")=>{
    setter(val); setErrors(e=>({...e,[field]:val&&!onlyLetters(val)?"⚠":""}))
  }
  const handlePhone=(val:string)=>{
    if(!val.startsWith("+998"))val="+998"
    const d=val.slice(4).replace(/\D/g,"").slice(0,9)
    setPhone("+998"+d)
    setErrors(e=>({...e,phone:d.length>0&&d.length<9?"⚠ +998 + 9 raqam":""}))
  }
  const handleMessage=(val:string)=>{
    if(countWords(val)>50){setErrors(e=>({...e,message:"Max 50"}));return}
    setMessage(val); setErrors(e=>({...e,message:""}))
  }
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    const ne={
      firstName:!firstName?"!":!onlyLetters(firstName)?"⚠":"",
      lastName: !lastName ?"!":!onlyLetters(lastName) ?"⚠":"",
      phone:    phone.length<13?"⚠ +998 + 9 raqam":"",
      message:  !message.trim()?"!":countWords(message)>50?"Max 50":"",
    }
    setErrors(ne); if(Object.values(ne).some(Boolean))return
    const fullName=`${firstName} ${lastName}`
    const dup=checkDuplicate(fullName,phone)
    if(dup){setAlreadySent(dup);return}

    setSending(true)
    setSendError("")
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, message }),
      })
      if (!res.ok) throw new Error("Xatolik")
      addSentRecord({fullName,phone})
      setSubmitted(true)
    } catch {
      setSendError("Xabar yuborilmadi. Qayta urinib ko'ring.")
    } finally {
      setSending(false)
    }
  }

  const wordCount=countWords(message)

  if(alreadySent) return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-center min-h-[50vh]">
        <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
          className="glass-card rounded-2xl p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-5"
            style={{border:"1px solid rgba(239,68,68,0.35)"}}>
            <Ban className="w-8 h-8 text-red-400"/>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">
            {alreadySent==="name"?"Allaqachon yuborilgan":"Telefon allaqachon ishlatilgan"}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <a href="https://t.me/Mashhura_hoca" target="_blank" className="text-primary font-semibold hover:underline">Telegram</a>
          </p>
        </motion.div>
      </div>
    </div>
  )

  return (
    <div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8">

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-2xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{t("connect_title")}</span>
          </h1>
          <p className="text-sm lg:text-lg text-muted-foreground">{t("connect_sub")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Contact Info */}
          <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.2}} className="lg:col-span-1 space-y-4">
            {contactInfo.map((item,index)=>(
              <motion.a key={item.label} href={item.href}
                initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3+index*0.1}}
                className="glass-card rounded-xl p-3 lg:p-4 flex items-center gap-3 lg:gap-4 hover:border-primary/50 transition-colors block">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary"/>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="font-medium text-foreground">{item.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.3}} className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-5 lg:p-8">
              {submitted ? (
                <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary"/>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{t("connect_success_title")}</h3>
                  <p className="text-muted-foreground mb-6">{t("connect_success_sub")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t("connect_name")}</label>
                      <Input placeholder="Sardor" value={firstName}
                        onChange={e=>handleName(e.target.value,setFirstName,"firstName")}
                        className={`bg-secondary/50 border-border ${errors.firstName?"border-red-500":""}`}/>
                      {errors.firstName&&<p className="mt-1.5 text-xs text-red-400">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t("connect_lastname")}</label>
                      <Input placeholder="Rustamov" value={lastName}
                        onChange={e=>handleName(e.target.value,setLastName,"lastName")}
                        className={`bg-secondary/50 border-border ${errors.lastName?"border-red-500":""}`}/>
                      {errors.lastName&&<p className="mt-1.5 text-xs text-red-400">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t("connect_phone")}</label>
                    <Input type="tel" value={phone} onChange={e=>handlePhone(e.target.value)}
                      className={`bg-secondary/50 border-border ${errors.phone?"border-red-500":""}`}/>
                    {errors.phone&&<p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-foreground">{t("connect_message")}</label>
                      <span className={`text-xs ${wordCount>=50?"text-red-400":"text-muted-foreground"}`}>{wordCount}/50</span>
                    </div>
                    <Textarea placeholder="..." rows={5} value={message} onChange={e=>handleMessage(e.target.value)}
                      className={`bg-secondary/50 border-border resize-none ${errors.message?"border-red-500":""}`}/>
                    {errors.message&&<p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  </div>

                  {sendError && (
                    <p className="text-sm text-red-400 text-center -mb-2">{sendError}</p>
                  )}
                  <Button type="submit" size="lg" disabled={sending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold font-semibold disabled:opacity-60">
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"/>
                        Yuborilmoqda...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4"/>
                        {t("connect_send")}
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
