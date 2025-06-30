import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ----------------------
// Type Definitions
// ----------------------
export interface Property {
  address: string
  purchasePrice: number
  purchaseDate: string
  marketValue: number
  mortgageBalance: number
  rate: number
  term: number
}

export interface Rental {
  nightly: number
  occupancy: number
  feePct: number
  cleaning: number
  mgmtPct: number
  linens: number
  effortHours: number
  effortRate: number
}

export interface Operating {
  propTax: number
  taxGrowth: number
  insurance: number
  insGrowth: number
  maintenancePct: number
  capexSchedule: { year: number; amount: number }[]
}

export interface Tax {
  fedOrd: number
  njOrd: number
  fedCG: number
  njCG: number
  recapture: number
}

export interface Sale {
  yearsAhead: number
  sellCostPct: number
  appreciation: number
}

export interface Settings {
  discount: number
}

export interface State {
  property: Property
  rental: Rental
  operating: Operating
  tax: Tax
  sale: Sale
  settings: Settings
}

const defaultState: State = {
  property: {
    address: '1213 Sunset Ave, Asbury Park NJ',
    purchasePrice: 659000,
    purchaseDate: '2017-07-01',
    marketValue: 1400000,
    mortgageBalance: 440000,
    rate: 0.03,
    term: 30,
  },
  rental: {
    nightly: 475,
    occupancy: 0.55,
    feePct: 0.03,
    cleaning: 0,
    mgmtPct: 0.1,
    linens: 1500,
    effortHours: 12,
    effortRate: 0,
  },
  operating: {
    propTax: 18000,
    taxGrowth: 0.03,
    insurance: 2000,
    insGrowth: 0.03,
    maintenancePct: 0.01,
    capexSchedule: [{ year: 5, amount: 25000 }],
  },
  tax: {
    fedOrd: 0.35,
    njOrd: 0.1075,
    fedCG: 0.2,
    njCG: 0.1075,
    recapture: 0.25,
  },
  sale: {
    yearsAhead: 20,
    sellCostPct: 0.06,
    appreciation: 0.03,
  },
  settings: {
    discount: 0.05,
  },
}

interface PlannerStore extends State {
  update: (partial: Partial<State>) => void
}

export const usePlannerStore = create<PlannerStore>()(
  persist(
    (set) => ({
      ...defaultState,
      update: (partial) => set(partial as any),
    }),
    { name: 'sunset-planner' }
  )
)
