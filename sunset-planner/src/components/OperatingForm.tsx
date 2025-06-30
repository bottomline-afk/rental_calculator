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
      <label className="block">
        <span className="label">Property Tax</span>
        <input type="number" className="input" {...register('propTax', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Tax Growth</span>
        <input type="number" step="0.01" className="input" {...register('taxGrowth', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Insurance</span>
        <input type="number" className="input" {...register('insurance', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Ins Growth</span>
        <input type="number" step="0.01" className="input" {...register('insGrowth', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Maintenance %</span>
        <input type="number" step="0.01" className="input" {...register('maintenancePct', { valueAsNumber: true })} />
      </label>
    </form>
  )
}
