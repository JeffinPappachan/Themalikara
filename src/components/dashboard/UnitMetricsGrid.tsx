import { motion } from 'framer-motion'

import { useFinancial } from '@/context/FinancialContext'
import { site } from '@/data/siteContent'
import { formatInr } from '@/lib/formatInr'

export function UnitMetricsGrid() {
  const d = site.financialDashboard
  const { unitBreakdown } = useFinancial()

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-white md:text-3xl">
        {d.unitBreakdownTitle}
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-stone-400">{d.unitBreakdownDesc}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {unitBreakdown.map((unit, i) => (
          <motion.div
            key={unit.unitId}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.02] p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{unit.unitName}</p>
                <p className="mt-1 font-serif text-2xl font-semibold text-gold-light">
                  {formatInr(unit.collectedInr)}
                </p>
              </div>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
                style={{ backgroundColor: `${unit.chartColor}33`, color: unit.chartColor }}
              >
                {unit.contributors} {d.contributorsKpi.toLowerCase()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
