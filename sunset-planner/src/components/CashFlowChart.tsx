import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { usePlannerStore } from '../store/usePlannerStore'
import { calcNPV } from '../lib/finance'

export function CashFlowChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = usePlannerStore()
  const result = calcNPV(state)
  const sellCF = [result.pvSell, ...Array(result.cf.length - 1).fill(0)]

  useEffect(() => {
    if (!canvasRef.current) return
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: result.years,
        datasets: [
          { label: 'Hold & Rent', data: result.cf, backgroundColor: 'rgba(99,102,241,0.5)' },
          { label: 'Sell Now', data: sellCF, backgroundColor: 'rgba(239,68,68,0.5)' },
        ],
      },
    })
    return () => chart.destroy()
  }, [state])

  return <canvas ref={canvasRef} />
}
