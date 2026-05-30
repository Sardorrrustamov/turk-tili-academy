import { NextRequest, NextResponse } from "next/server"

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID!

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, phone, message } = await req.json()

    if (!firstName || !lastName || !phone || !message) {
      return NextResponse.json({ error: "Maydonlar to'ldirilmagan" }, { status: 400 })
    }

    const text = `
🔔 *Yangi murojaat!*

👤 *Ism Familya:* ${firstName} ${lastName}
📞 *Telefon:* ${phone}
💬 *Xabar:* ${message}

🕐 ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}
    `.trim()

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    )

    const data = await res.json()
    if (!data.ok) {
      return NextResponse.json({ error: "Telegram xatosi", detail: data }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 })
  }
}
