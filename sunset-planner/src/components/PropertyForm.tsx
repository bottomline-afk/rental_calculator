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
      <input className="input" placeholder="Address" {...register('address')} />
      <input type="number" className="input" placeholder="Purchase Price" {...register('purchasePrice', { valueAsNumber: true })} />
      <input type="date" className="input" {...register('purchaseDate')} />
      <input type="number" className="input" placeholder="Market Value" {...register('marketValue', { valueAsNumber: true })} />
      <input type="number" className="input" placeholder="Mortgage Balance" {...register('mortgageBalance', { valueAsNumber: true })} />
      <input type="number" step="0.01" className="input" placeholder="Rate" {...register('rate', { valueAsNumber: true })} />
      <input type="number" className="input" placeholder="Term" {...register('term', { valueAsNumber: true })} />
    </form>
  )
}
