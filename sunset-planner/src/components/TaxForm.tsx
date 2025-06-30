import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePlannerStore, Tax } from '../store/usePlannerStore'

const schema = z.object({
  fedOrd: z.number(),
  njOrd: z.number(),
  fedCG: z.number(),
  njCG: z.number(),
  recapture: z.number(),
})

export function TaxForm() {
  const { tax, update } = usePlannerStore()
  const { register, handleSubmit } = useForm<Tax>({
    resolver: zodResolver(schema),
    defaultValues: tax,
  })
  const onSubmit = (data: Tax) => update({ tax: data })

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-2">
      <input type="number" step="0.01" className="input" placeholder="Fed Ord" {...register('fedOrd', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="NJ Ord" {...register('njOrd', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Fed CG" {...register('fedCG', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="NJ CG" {...register('njCG', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Recapture" {...register('recapture', { valueAsNumber: true })} />
    </form>
  )
}
