import { IndianRupee, Layers, TrendingUp, Users } from 'lucide-react'

import { useFinancial } from '@/context/FinancialContext'
import { site } from '@/data/siteContent'
import { formatInr } from '@/lib/formatInr'

const kpiClass =
  'rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm'

export function DashboardKpiStrip() {
  const d = site.financialDashboard
  const { targetInr, collectedInr, summary, unitBreakdown } = useFinancial()
  const remaining = targetInr - collectedInr
  const s = summary

  const items = [
    {
      icon: IndianRupee,
      label: d.remainingLabel,
      value: formatInr(remaining),
    },
    {
      icon: Users,
      label: d.contributorsKpi,
      value: String(s.totalContributors),
    },
    {
      icon: TrendingUp,
      label: d.averageGiftKpi,
      value: formatInr(s.averageContributionInr),
    },
    {
      icon: Layers,
      label: d.unitsKpi,
      value: String(unitBreakdown.length),
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className={kpiClass}>
          <div className="flex items-center gap-2 text-stone-400">
            <Icon className="size-4 text-gold-light/80" />
            <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
          </div>
          <p className="mt-2 font-serif text-2xl font-semibold text-gold-light md:text-3xl">
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}
