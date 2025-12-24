const COINGECKO_API_KEY = "CG-nrVyRWCGSZozXJpLvsBAmQo5"
const COINGECKO_API = "https://api.coingecko.com/api/v3"

export async function getCryptoPrice(cryptoId: string, currency: string) {
  const response = await fetch(
    `${COINGECKO_API}/simple/price?ids=${cryptoId}&vs_currencies=${currency.toLowerCase()}&x_cg_demo_api_key=${COINGECKO_API_KEY}`
  )
  const data = await response.json()
  return data[cryptoId][currency.toLowerCase()]
}

export async function getExchangeRate(from: string, to: string) {
  try {
    // Using the newer FawazAhmed0 API which is more reliable and free
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch rates')
    }

    const data = await response.json()
    // The API structure is { date: "...", [from]: { [to]: rate, ... } }
    return data[from.toLowerCase()][to.toLowerCase()]
  } catch (error) {
    console.error("Currency API Error:", error)
    // Fallback to the old API if the primary one fails, just in case
    try {
      const backupResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      const backupData = await backupResponse.json()
      return backupData.rates[to]
    } catch (backupError) {
      console.error("Backup Currency API Error:", backupError)
      throw new Error("Failed to fetch exchange rate")
    }
  }
}