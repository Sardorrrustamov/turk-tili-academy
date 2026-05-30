"use client"

import Link from "next/link"
import Image from "next/image"
import { useLang } from "@/lib/i18n"

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/mashhura_hoca",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@mashhura_hoca",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    label: "Telegram",
    href: "https://t.me/Mashhura_hoca",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-17 7.35a2.25 2.25 0 0 0 .126 4.17l3.857 1.274 1.917 5.75a1 1 0 0 0 1.7.33l2.694-2.905 4.568 3.516a2.249 2.249 0 0 0 3.511-1.494l2.5-16.5a2.249 2.249 0 0 0-2.851-2.706z"/></svg>`,
  },
]

export function Footer() {
  const { t } = useLang()

  const navLinks = [
    { label: t("footer_about") as string, href: "/about" },
    { label: t("footer_contact") as string, href: "/connect" },
  ]

  return (
    <>
      <style>{`
        .footer-social-link {
          display:flex; align-items:center; justify-content:center;
          width:40px; height:40px; border-radius:50%;
          background:rgba(201,168,76,0.06);
          border:1px solid rgba(201,168,76,0.18);
          color:rgba(240,238,238,0.5);
          transition:all 0.2s;
          text-decoration:none;
        }
        .footer-social-link:hover {
          background:rgba(201,168,76,0.15);
          border-color:rgba(201,168,76,0.5);
          color:#FFD700;
          box-shadow:0 0 16px rgba(201,168,76,0.2);
        }
        .footer-nav-link {
          font-size:0.875rem;
          color:rgba(240,238,238,0.45);
          text-decoration:none;
          transition:color 0.2s;
        }
        .footer-nav-link:hover { color:#FFD700; }
        .footer-logo-text {
          font-size:1rem; font-weight:900; letter-spacing:0.1em; text-transform:uppercase;
          background:linear-gradient(135deg,#b8912a,#FFD700,#e8c96d,#b8912a);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
        }
      `}</style>

      <footer style={{ background:"rgba(4,8,28,0.98)", borderTop:"1px solid rgba(201,168,76,0.12)" }}>
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 items-center">

            {/* Links */}
            <div>
              <h4 style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(240,238,238,0.9)", marginBottom:"1.25rem" }}>
                {t("footer_links") as string}
              </h4>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-nav-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logo */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.75rem" }}>
              <div style={{ position:"relative", width:80, height:80 }}>
                <Image
                  src="/logo.png"
                  alt="Mashhura Hoca Logo"
                  fill
                  className="object-contain"
                  style={{ filter:"drop-shadow(0 0 12px rgba(201,168,76,0.5))" }}
                />
              </div>
              <span className="footer-logo-text">MASHHURA HOCA</span>
            </div>

            {/* Socials */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
              <h4 style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(240,238,238,0.9)", marginBottom:"1.25rem" }}>
                {t("footer_socials") as string}
              </h4>
              <div style={{ display:"flex", gap:"0.75rem" }}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label} className="footer-social-link"
                    dangerouslySetInnerHTML={{ __html: s.svg }} />
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ marginTop:"3rem", paddingTop:"2rem", borderTop:"1px solid rgba(201,168,76,0.1)", textAlign:"center" }}>
            <p style={{ fontSize:"0.75rem", color:"rgba(240,238,238,0.35)", letterSpacing:"0.2em", textTransform:"uppercase" }}>
              &copy; MASHHURA HOCA {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
