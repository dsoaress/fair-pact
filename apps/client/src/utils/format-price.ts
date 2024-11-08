type Input = {
  price: number
  currency: string
}

type Output = {
  formattedPrice: string
  type: 'POSITIVE' | 'NEGATIVE' | 'ZERO'
}

export function formatPrice({ currency, price }: Input): Output {
  if (price === 0) return { formattedPrice: 'Quitado', type: 'ZERO' }
  const isNegativePrice = price < 0
  const formattedPrice = Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(
    (isNegativePrice ? -price : price) / 100
  )
  return { formattedPrice, type: isNegativePrice ? 'NEGATIVE' : 'POSITIVE' }
}
