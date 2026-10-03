import { site } from '@/data/siteContent'
import { useCountdownTo } from '@/hooks/useCountdownTo'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatDays(n: number) {
  return n >= 100 ? String(n) : pad(n)
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-[3.25rem] flex-col items-center rounded-xl border border-white/15 bg-white/5 px-2 py-2.5 sm:min-w-[3.75rem] sm:px-3">
      <span className="font-serif text-2xl font-semibold tabular-nums text-gold-light sm:text-3xl">
        {value}
      </span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-500">
        {label}
      </span>
    </div>
  )
}

export function FestivalLiveCountdown() {
  const d = site.financialDashboard
  const { days, hours, minutes, seconds } = useCountdownTo(d.festivalCountdownTargetIso)

  return (
    <div
      className="flex flex-wrap items-center gap-1.5 sm:gap-2"
      role="timer"
      aria-live="polite"
      aria-label={`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
    >
      <TimeBlock value={formatDays(days)} label={d.countdownDays} />
      <span className="pb-6 font-serif text-xl text-gold-light/60">:</span>
      <TimeBlock value={pad(hours)} label={d.countdownHours} />
      <span className="pb-6 font-serif text-xl text-gold-light/60">:</span>
      <TimeBlock value={pad(minutes)} label={d.countdownMinutes} />
      <span className="pb-6 font-serif text-xl text-gold-light/60">:</span>
      <TimeBlock value={pad(seconds)} label={d.countdownSeconds} />
      <p className="sr-only">
        {days} {d.daysToGoSuffixMl} · {d.daysToGoSuffix}
      </p>
    </div>
  )
}
