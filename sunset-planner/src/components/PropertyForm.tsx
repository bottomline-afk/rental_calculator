import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePlannerStore, Property } from '../store/usePlannerStore'

const schema = z.object({
  address: z.string(),
  purchasePrice: z.number(),
  purchaseDate: z.string(),
  marketValue: z.number(),
  mortgageBalance: z.number(),
  rate: z.number(),
  term: z.number(),
})

export function PropertyForm() {
  const { property, update } = usePlannerStore()
  const { register, handleSubmit } = useForm<Property>({
    resolver: zodResolver(schema),
    defaultValues: property,
  })

  const onSubmit = (data: Property) => update({ property: data })

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-2">
      <label className="block">
        <span className="label">Address</span>
        <input className="input" {...register('address')} />
      </label>
      <label className="block">
        <span className="label">Purchase Price</span>
        <input type="number" className="input" {...register('purchasePrice', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Purchase Date</span>
        <input type="date" className="input" {...register('purchaseDate')} />
      </label>
      <label className="block">
        <span className="label">Market Value</span>
        <input type="number" className="input" {...register('marketValue', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Mortgage Balance</span>
        <input type="number" className="input" {...register('mortgageBalance', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Rate</span>
        <input type="number" step="0.01" className="input" {...register('rate', { valueAsNumber: true })} />
      </label>
      <label className="block">
        <span className="label">Term (yrs)</span>
        <input type="number" className="input" {...register('term', { valueAsNumber: true })} />
      </label>
    </form>
  )
}
