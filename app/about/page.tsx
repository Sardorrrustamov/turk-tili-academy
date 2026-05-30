import type { Metadata } from "next"
import { AboutPageContent } from "./about-content"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Mashhura Hoca, her journey, achievements, and commitment to language education excellence.",
}

export default function AboutPage() {
  return <AboutPageContent />
}
