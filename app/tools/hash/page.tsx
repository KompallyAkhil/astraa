import { Metadata } from "next"
import { HashGeneratorClient } from "@/components/hash/hash-generator"
import { BackButton } from "@/components/back-button"

export const metadata: Metadata = {
  title: "Hash Generator | astraa",
  description: "Generate various hash outputs including MD5, SHA-1, SHA-256, and SHA-512",
  openGraph: {
    title: "Hash Generator",
    description: "Generate various hash outputs including MD5, SHA-1, SHA-256, and SHA-512",
  },
}

export default function HashGeneratorPage() {
  return (
    <div>
      <BackButton />
      <HashGeneratorClient />
    </div>
  )
}