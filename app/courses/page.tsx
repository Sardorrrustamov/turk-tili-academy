import type { Metadata } from "next"
import { CoursesPageContent } from "./courses-content"

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore our premium language courses including IELTS Mastery, Professional English, and Global Language Programs.",
}

export default function CoursesPage() {
  return <CoursesPageContent />
}
