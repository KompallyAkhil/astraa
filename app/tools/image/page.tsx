import { Metadata } from "next"
import { ImageResizerClient } from "@/components/image/image-resizer"
import { BackButton } from "@/components/back-button"

export const metadata: Metadata = {
  title: "Image Resizer | astraa",
  description: "Upload and resize your images with multiple format options. Support for JPEG, PNG, and WebP formats with quality control.",
  openGraph: {
    title: "Image Resizer",
    description: "Upload and resize your images with multiple format options. Support for JPEG, PNG, and WebP formats with quality control.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer",
    description: "Upload and resize your images with multiple format options. Support for JPEG, PNG, and WebP formats with quality control.",
  },
  keywords: [
    "image resizer",
    "image converter",
    "webp converter",
    "jpeg optimizer",
    "png optimizer",
    "image compression",
    "image tools"
  ]
}

export default function ImageResizerPage() {
  return (
    <div>
      <BackButton />
      <ImageResizerClient />
    </div>
  )
}