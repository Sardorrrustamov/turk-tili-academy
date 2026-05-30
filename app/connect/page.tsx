import type { Metadata } from "next"
import { ConnectPageContent } from "./connect-content "

export const metadata: Metadata = {
  title: "Connect",
  description: "Get in touch with Mashhura Hoca Academy. We are here to help you start your language learning journey.",
}

export default function ConnectPage() {
  return <ConnectPageContent />
}
