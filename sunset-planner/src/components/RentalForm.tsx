import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePlannerStore, Rental } from '../store/usePlannerStore'

const schema = z.object({
  nightly: z.number(),
  occupancy: z.number(),
  feePct: z.number(),
  cleaning: z.number(),
  mgmtPct: z.number(),
  linens: z.number(),
  effortHours: z.number(),
  effortRate: z.number(),
})

export function RentalForm() {
  const { rental, update } = usePlannerStore()
  const { register, handleSubmit } = useForm<Rental>({
    resolver: zodResolver(schema),
    defaultValues: rental,
  })
  const onSubmit = (data: Rental) => update({ rental: data })

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-2">
      <label className="block">
        <span className="label">Nightly Rate</span>
        <input type="number" className="input" {...register('nightly', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Occupancy</span>
        <input type="number" step="0.01" className="input" {...register('occupancy', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Fee %</span>
        <input type="number" step="0.01" className="input" {...register('feePct', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Cleaning</span>
        <input type="number" className="input" {...register('cleaning', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Mgmt %</span>
        <input type="number" step="0.01" className="input" {...register('mgmtPct', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Linens</span>
        <input type="number" className="input" {...register('linens', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Effort Hours</span>
        <input type="number" className="input" {...register('effortHours', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Effort Rate</span>
        <input type="number" className="input" {...register('effortRate', { valueAsNumber: true })} />
      </label>
    </form>
  )
}
