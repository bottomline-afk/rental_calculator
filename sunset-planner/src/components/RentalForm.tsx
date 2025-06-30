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
      <input type="number" className="input" placeholder="Nightly" {...register('nightly', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Occupancy" {...register('occupancy', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Fee %" {...register('feePct', { valueAsNumber: true })} />
      <input type="number" className="input" placeholder="Cleaning" {...register('cleaning', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Mgmt %" {...register('mgmtPct', { valueAsNumber: true })} />
      <input type="number" className="input" placeholder="Linens" {...register('linens', { valueAsNumber: true })} />
      <input type="number" className="input" placeholder="Effort Hours" {...register('effortHours', { valueAsNumber: true })} />
      <input type="number" className="input" placeholder="Effort Rate" {...register('effortRate', { valueAsNumber: true })} />
    </form>
  )
}
