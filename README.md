# Turk Tili Academy 🇹🇷

**Turk tili o'rganish uchun zamonaviy veb-platforma.**

## 🚀 Texnologiyalar

- **Next.js 16** — React freymvork
- **TypeScript** — Tipli JavaScript
- **Tailwind CSS v4** — Stillar
- **Framer Motion** — Animatsiyalar
- **Three.js / React Three Fiber** — 3D elementlar
- **shadcn/ui** — UI komponentlar
- **Telegram Bot API** — Ariza yuborish

## 📋 O'rnatish

### 1. Repozitoriyani klonlash

```bash
git clone https://github.com/YOUR_USERNAME/turk-tili-academy.git
cd turk-tili-academy
```

### 2. Paketlarni o'rnatish

```bash
npm install
```

### 3. Muhit o'zgaruvchilarini sozlash

`.env.local.example` faylini nusxalab, `.env.local` yarating:

```bash
cp .env.local.example .env.local
```

Keyin `.env.local` faylini oching va qiymatlarni to'ldiring:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

> **Telegram bot yaratish:**
> 1. [@BotFather](https://t.me/BotFather) ga yozing → `/newbot` → token oling
> 2. Botga xabar yuboring, so'ng `https://api.telegram.org/bot<TOKEN>/getUpdates` orqali `chat.id` ni toping

### 4. Loyihani ishga tushirish

```bash
npm run dev
```

Brauzerda [http://localhost:3000](http://localhost:3000) ni oching.

## 🌐 Deploy (Vercel)

```bash
npm run build
```

Yoki [Vercel](https://vercel.com) ga to'g'ridan-to'g'ri GitHub orqali ulang.

> ⚠️ Vercel dashboard-da `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` ni **Environment Variables** sifatida qo'shing.

## 📁 Loyiha tuzilishi

```
├── app/              # Next.js App Router sahifalari
│   ├── page.tsx      # Bosh sahifa
│   ├── about/        # Biz haqimizda
│   ├── courses/      # Kurslar
│   ├── methods/      # O'qitish metodlari
│   ├── apply/        # Ariza berish
│   ├── connect/      # Bog'lanish
│   └── api/          # Backend API yo'nalishlari
├── components/       # Qayta ishlatiladigan komponentlar
│   ├── ui/           # shadcn/ui bazaviy komponentlar
│   ├── layout/       # Header, Footer
│   ├── home/         # Bosh sahifa bo'limlari
│   └── 3d/           # Three.js komponentlar
├── hooks/            # Custom React hooks
├── lib/              # Yordamchi funksiyalar, i18n
├── public/           # Rasmlar va statik fayllar
└── styles/           # Global stillar
```

## 🌍 Til qo'llab-quvvatlash

Plahttps://github.com/Sardorrrustamov/turk-tili-academy.gittforma **O'zbek**, **ingliz** ,**Rus** va **Turk** tillarini qo'llab-quvvatlaydi.
