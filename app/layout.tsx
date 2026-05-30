import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { LangProvider } from '@/lib/i18n'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans'
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  title: {
    default: 'Mashhura Hoca Academy | Global Language Excellence, Elevated',
    template: '%s | Mashhura Hoca Academy'
  },
  description: 'Premium language education.',
  keywords: ['Turkish', 'language learning', 'Istanbul Academy'],
  authors: [{ name: 'Mashhura Hoca' }],
  creator: 'Mashhura Hoca Academy',
}

export const viewport: Viewport = {
  themeColor: '#0a0e1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <LangProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LangProvider>
      </body>
    </html>
  )
}
