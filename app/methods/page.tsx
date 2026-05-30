import type { Metadata } from "next"
import { MethodsPageContent } from "./methods-content"

export const metadata: Metadata = {
  title: "Methods",
  description: "Discover our proven teaching methodology combining traditional excellence with innovative learning techniques.",
}

export default function MethodsPage() {
  return <MethodsPageContent />
}
