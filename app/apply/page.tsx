import type { Metadata } from "next"
import { ApplyPageContent } from "./apply-content"

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to join Mashhura Hoca Academy and start your journey towards language excellence.",
}

export default function ApplyPage() {
  return <ApplyPageContent />
}
