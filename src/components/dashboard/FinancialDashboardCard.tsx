import { motion } from 'framer-motion'

import { FestivalLiveCountdown } from '@/components/dashboard/FestivalLiveCountdown'
import { useFinancial } from '@/context/FinancialContext'
import { site } from '@/data/siteContent'
import { formatInr } from '@/lib/formatInr'

export function FinancialDashboardCard() {
  const d = site.financialDashboard
  const { collectedInr, targetInr } = useFinancial()
  const pct = Math.min(100, (collectedInr / targetInr) * 100)
  const remaining = targetInr - collectedInr

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-parish-blue/40 bg-gradient-to-br from-navy-card to-navy shadow-2xl"
    >
      <div className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
        <div>
          <p className="font-ml text-sm text-stone-400">{d.collectedLabelMl}</p>
          <p className="sr-only">{d.collectedLabel}</p>
          <p className="mt-1 font-serif text-5xl font-semibold text-gold-light md:text-6xl">
            {formatInr(collectedInr)}
          </p>
          <p className="mt-2 text-sm text-stone-400">
            Target {formatInr(targetInr)} · {pct.toFixed(1)}% achieved
          </p>
        </div>

        <div className="border-stone-700 md:border-l md:pl-10">
          <p className="font-ml text-sm text-stone-400">{d.festivalCountdownLabelMl}</p>
          <p className="sr-only">{d.festivalCountdownLabel}</p>
          <div className="mt-1">
            <FestivalLiveCountdown />
          </div>
          <p className="font-ml mt-2 text-sm text-stone-400">{d.festivalDateLabelMl}</p>
          <p className="sr-only">{d.festivalDateLabel}</p>
        </div>
      </div>

      <div className="px-8 md:px-10">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          />
        </div>
      </div>

      <div className="p-8 md:p-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center md:px-10">
          <p className="font-ml text-sm text-stone-400">{d.remainingLabelMl}</p>
          <p className="sr-only">{d.remainingLabel}</p>
          <p className="mt-2 font-serif text-4xl font-semibold text-gold-light md:text-5xl">
            {formatInr(remaining)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
