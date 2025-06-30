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
  const { rental, operating, sale, settings } = inputs
  const years = Array.from({ length: sale.yearsAhead }, (_, i) => i + 1)

  const cf = years.map(() => {
    const rent =
      rental.nightly * 365 * rental.occupancy -
      rental.nightly * 365 * rental.occupancy * rental.feePct -
      rental.cleaning -
      rental.nightly * 365 * rental.occupancy * rental.mgmtPct
    const expenses =
      operating.propTax + operating.insurance + operating.maintenancePct * inputs.property.marketValue + rental.linens / sale.yearsAhead
    return rent - expenses
  })

  const r = settings.discount
  const pvHold = cf.reduce((acc, val, i) => acc + val / Math.pow(1 + r, i + 1), 0)
  const sellProceeds = inputs.property.marketValue * (1 - sale.sellCostPct)
  const pvSell = sellProceeds / Math.pow(1 + r, 1)

  return { pvHold, pvSell, delta: pvHold - pvSell, cf, years }
}
