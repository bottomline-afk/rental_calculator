import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePlannerStore, Sale } from '../store/usePlannerStore'

const schema = z.object({
  yearsAhead: z.number(),
  sellCostPct: z.number(),
  appreciation: z.number(),
})

export function SaleForm() {
  const { sale, update } = usePlannerStore()
  const { register, handleSubmit } = useForm<Sale>({
    resolver: zodResolver(schema),
    defaultValues: sale,
  })
  const onSubmit = (data: Sale) => update({ sale: data })

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-2">
      <input type="number" className="input" placeholder="Years Ahead" {...register('yearsAhead', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Sell Cost %" {...register('sellCostPct', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Appreciation" {...register('appreciation', { valueAsNumber: true })} />
    </form>
  )
}
