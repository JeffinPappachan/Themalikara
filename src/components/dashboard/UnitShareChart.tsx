import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { useFinancial } from '@/context/FinancialContext'
import { site } from '@/data/siteContent'
import { formatInr } from '@/lib/formatInr'

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: { name: string; value: number } }[]
}) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  return (
    <div className="rounded-lg border border-white/15 bg-navy px-3 py-2 text-sm shadow-xl">
      <p className="font-medium text-white">{row.name}</p>
      <p className="text-gold-light">{formatInr(row.value)}</p>
    </div>
  )
}

export function UnitShareChart() {
  const d = site.financialDashboard
  const { unitBreakdown } = useFinancial()
  const data = unitBreakdown.map((u) => ({
    name: u.unitName.replace(" Unit", ''),
    value: u.collectedInr,
    color: u.chartColor,
  }))

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-300">
        {d.shareByUnit}
      </h3>
      <div className="mt-4 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={92}
              paddingAngle={3}
              stroke="transparent"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {data.map((entry) => (
          <li key={entry.name} className="flex items-center gap-2 text-xs text-stone-400">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="truncate">{entry.name}</span>
            <span className="ml-auto font-medium text-stone-200">{formatInr(entry.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
