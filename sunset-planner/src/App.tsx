import { useState } from 'react'
import { PropertyForm } from './components/PropertyForm'
import { RentalForm } from './components/RentalForm'
import { OperatingForm } from './components/OperatingForm'
import { TaxForm } from './components/TaxForm'
import { SaleForm } from './components/SaleForm'
import { ResultsCard } from './components/ResultsCard'
import { CashFlowChart } from './components/CashFlowChart'
import { SensitivityChips } from './components/SensitivityChips'
import { PrintButton } from './components/PrintButton'
import './index.css'

function App() {
  const [tab, setTab] = useState<'hold' | 'sell'>('hold')

  return (
    <div className="p-4 grid md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button className={tab === 'hold' ? 'font-bold' : ''} onClick={() => setTab('hold')}>Hold & Rent</button>
          <button className={tab === 'sell' ? 'font-bold' : ''} onClick={() => setTab('sell')}>Sell</button>
        </div>
        <PropertyForm />
        {tab === 'hold' && <RentalForm />}
        <OperatingForm />
        <TaxForm />
        <SaleForm />
      </div>
      <div className="space-y-4">
        <ResultsCard />
        <CashFlowChart />
        <SensitivityChips />
        <PrintButton />
      </div>
    </div>
  )
}

export default App
