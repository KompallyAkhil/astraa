import { Metadata } from "next"
import { CurrencyConverterClient } from "@/components/currency/currency-converter"
import { BackButton } from "@/components/back-button"

export const metadata: Metadata = {
  title: "Currency Converter | astraa",
  description: "Convert between different currencies and cryptocurrencies using real-time rates",
  openGraph: {
    title: "Currency Converter",
    description: "Convert between different currencies and cryptocurrencies using real-time rates",
  },
}

export default function CurrencyConverterPage() {
  return (
    <div>
      <BackButton />
      <CurrencyConverterClient />
    </div>
  )
}