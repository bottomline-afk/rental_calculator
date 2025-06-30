import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePlannerStore, Operating } from '../store/usePlannerStore'

const schema = z.object({
  propTax: z.number(),
  taxGrowth: z.number(),
  insurance: z.number(),
  insGrowth: z.number(),
  maintenancePct: z.number(),
  capexSchedule: z.array(z.object({ year: z.number(), amount: z.number() })),
})

export function OperatingForm() {
  const { operating, update } = usePlannerStore()
  const { register, handleSubmit } = useForm<Operating>({
    resolver: zodResolver(schema),
    defaultValues: operating,
  })
  const onSubmit = (data: Operating) => update({ operating: data })

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-2">
      <input type="number" className="input" placeholder="Property Tax" {...register('propTax', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Tax Growth" {...register('taxGrowth', { valueAsNumber: true })} />
      <input type="number" className="input" placeholder="Insurance" {...register('insurance', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Ins Growth" {...register('insGrowth', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Maintenance %" {...register('maintenancePct', { valueAsNumber: true })} />
    </form>
  )
}
