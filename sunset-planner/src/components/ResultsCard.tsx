import { usePlannerStore } from '../store/usePlannerStore'
import { calcNPV } from '../lib/finance'

export function ResultsCard() {
  const state = usePlannerStore()
  const result = calcNPV(state)

  return (
    <div className="p-4 border rounded space-y-2">
      <div>PV Hold: <b>{result.pvHold.toFixed(0)}</b></div>
      <div>PV Sell: <b>{result.pvSell.toFixed(0)}</b></div>
      <div>Delta: <b>{result.delta.toFixed(0)}</b></div>
    </div>
  )
}
