import { Metadata } from "next"
import { PasswordGeneratorClient } from "@/components/password/password-generator"
import { BackButton } from "@/components/back-button"

export const metadata: Metadata = {
  title: "Password Generator | astraa",
  description: "Create strong, secure passwords with customizable options for length and character types",
  openGraph: {
    title: "Password Generator",
    description: "Create strong, secure passwords with customizable options for length and character types",
  },
}

export default function PasswordGeneratorPage() {
  return (
    <div>
      <BackButton />
      <PasswordGeneratorClient />
    </div>
  )
}