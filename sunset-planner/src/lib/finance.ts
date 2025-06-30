import { State } from '../store/usePlannerStore'

export interface NPVResult {
  pvHold: number
  pvSell: number
  delta: number
  cf: number[]
  years: number[]
}

// Simplified NPV calculation for demonstration
export function calcNPV(inputs: State): NPVResult {
  const { property, rental, operating, sale, tax, settings } = inputs

  const years = Array.from({ length: sale.yearsAhead }, (_, i) => i + 1)

  const cf = years.map(() => {
    const rent =
      rental.nightly * 365 * rental.occupancy -
      rental.nightly * 365 * rental.occupancy * rental.feePct -
      rental.cleaning -
      rental.nightly * 365 * rental.occupancy * rental.mgmtPct

    const expenses =
      operating.propTax +
      operating.insurance +
      operating.maintenancePct * property.marketValue +
      rental.linens / sale.yearsAhead

    return rent - expenses
  })

  const futureValue = property.marketValue * Math.pow(1 + sale.appreciation, sale.yearsAhead)
  const salePrice = futureValue * (1 - sale.sellCostPct)
  let taxableGain = futureValue - property.purchasePrice
  if (sale.homeSaleExclusion) {
    taxableGain = Math.max(0, taxableGain - 500000)
  }
  const taxes = taxableGain * (tax.fedCG + tax.njCG)
  const saleCF = salePrice - property.mortgageBalance - taxes
  cf[cf.length - 1] += saleCF

  const r = settings.discount
  const pvHold = cf.reduce((acc, val, i) => acc + val / Math.pow(1 + r, i + 1), 0)

  const nowPrice = property.marketValue * (1 - sale.sellCostPct)
  let nowGain = property.marketValue - property.purchasePrice
  if (sale.homeSaleExclusion) {
    nowGain = Math.max(0, nowGain - 500000)
  }
  const nowTaxes = nowGain * (tax.fedCG + tax.njCG)
  const pvSell = nowPrice - property.mortgageBalance - nowTaxes

  return { pvHold, pvSell, delta: pvHold - pvSell, cf, years }
}
