import { usePlannerStore } from '../store/usePlannerStore'
import { calcNPV, calcDerived } from '../lib/finance'

export function ResultsCard() {
  const state = usePlannerStore()
  const result = calcNPV(state)
  const derived = calcDerived(state)

  return (
    <div className="p-4 border rounded space-y-4">
      <div className="space-y-1 text-sm">
        <div className="font-bold text-lg">Derived Inputs</div>
        <div>Mortgage Payment: {derived.mortgagePayment.toFixed(0)}</div>
        <div>Annual Gross Rent: {derived.grossRent.toFixed(0)}</div>
        <div>Annual Net Rent: {derived.netRent.toFixed(0)}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="font-bold">Scenario 1: Hold &amp; Rent</div>
          <div>PV: {result.pvHold.toFixed(0)}</div>
          <ul className="list-disc pl-4">
            {result.cf.map((v, i) => (
              <li key={i}>Year {i + 1}: {v.toFixed(0)}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-bold">Scenario 2: Sell Now</div>
          <div>PV: {result.pvSell.toFixed(0)}</div>
        </div>
      </div>
      <div className="font-bold">Delta: {result.delta.toFixed(0)}</div>
    </div>
  )
}
