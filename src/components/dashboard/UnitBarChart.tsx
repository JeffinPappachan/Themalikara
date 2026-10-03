import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useFinancial } from '@/context/FinancialContext'
import { site } from '@/data/siteContent'
import { formatInr } from '@/lib/formatInr'

function BarTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: { shortName: string; collected: number } }[]
}) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  return (
    <div className="rounded-lg border border-white/15 bg-navy px-3 py-2 text-sm shadow-xl">
      <p className="font-medium text-white">{row.shortName}</p>
      <p className="text-gold-light">{formatInr(row.collected)}</p>
    </div>
  )
}

export function UnitBarChart() {
  const d = site.financialDashboard
  const { unitBreakdown } = useFinancial()
  const data = unitBreakdown.map((u) => ({
    shortName: u.unitName.replace("St. ", '').replace(" Unit", ''),
    collected: u.collectedInr,
    fill: u.chartColor,
  }))

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-300">
        {d.collectionsByUnit}
      </h3>
      <div className="mt-4 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="shortName"
              tick={{ fill: '#a8a29e', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#a8a29e', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="collected" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {data.map((entry) => (
                <Cell key={entry.shortName} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
