import { usePlannerStore } from '../store/usePlannerStore'
import { calcNPV } from '../lib/finance'

export function SensitivityChips() {
  const state = usePlannerStore()
  const up = { ...state.sale, appreciation: state.sale.appreciation + 0.01 }
  const down = { ...state.sale, appreciation: state.sale.appreciation - 0.01 }
  const moreOcc = { ...state.rental, occupancy: state.rental.occupancy * 1.1 }
  const lessOcc = { ...state.rental, occupancy: state.rental.occupancy * 0.9 }

  const upRes = calcNPV({ ...state, sale: up })
  const downRes = calcNPV({ ...state, sale: down })
  const moreOccRes = calcNPV({ ...state, rental: moreOcc })
  const lessOccRes = calcNPV({ ...state, rental: lessOcc })

  return (
    <div className="flex gap-2 text-sm">
      <span className="px-2 py-1 bg-gray-200 rounded">+1% appr: {upRes.delta.toFixed(0)}</span>
      <span className="px-2 py-1 bg-gray-200 rounded">-1% appr: {downRes.delta.toFixed(0)}</span>
      <span className="px-2 py-1 bg-gray-200 rounded">+10% occ: {moreOccRes.delta.toFixed(0)}</span>
      <span className="px-2 py-1 bg-gray-200 rounded">-10% occ: {lessOccRes.delta.toFixed(0)}</span>
    </div>
  )
}
