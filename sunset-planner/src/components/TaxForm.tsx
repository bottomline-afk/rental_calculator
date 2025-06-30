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
      <label className="block">
        <span className="label">Fed Ord</span>
        <input type="number" step="0.01" className="input" {...register('fedOrd', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">NJ Ord</span>
        <input type="number" step="0.01" className="input" {...register('njOrd', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Fed CG</span>
        <input type="number" step="0.01" className="input" {...register('fedCG', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">NJ CG</span>
        <input type="number" step="0.01" className="input" {...register('njCG', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Recapture</span>
        <input type="number" step="0.01" className="input" {...register('recapture', { valueAsNumber: true })} />
      </label>
    </form>
  )
}
