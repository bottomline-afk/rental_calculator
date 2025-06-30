import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePlannerStore, Sale } from '../store/usePlannerStore'

const schema = z.object({
  yearsAhead: z.number(),
  sellCostPct: z.number(),
  appreciation: z.number(),
  homeSaleExclusion: z.boolean(),
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
      <label className="block">
        <span className="label">Years Ahead</span>
        <input type="number" className="input" {...register('yearsAhead', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Sell Cost %</span>
        <input type="number" step="0.01" className="input" {...register('sellCostPct', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Appreciation</span>
        <input type="number" step="0.01" className="input" {...register('appreciation', { valueAsNumber: true })} />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" className="" {...register('homeSaleExclusion')} />
        <span className="label m-0">$500k Home Sale Exclusion</span>
      </label>
    </form>
  )
}
