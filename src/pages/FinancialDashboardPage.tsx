import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { DashboardKpiStrip } from '@/components/dashboard/DashboardKpiStrip'
import { FinancialDashboardCard } from '@/components/dashboard/FinancialDashboardCard'
import { RecentContributionsTable } from '@/components/dashboard/RecentContributionsTable'
import { UnitBarChart } from '@/components/dashboard/UnitBarChart'
import { UnitMetricsGrid } from '@/components/dashboard/UnitMetricsGrid'
import { UnitShareChart } from '@/components/dashboard/UnitShareChart'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { useFinancial } from '@/context/FinancialContext'
import { site } from '@/data/siteContent'
import { formatLastUpdated } from '@/lib/formatLastUpdated'

export function FinancialDashboardPage() {
  const d = site.financialDashboard
  const { lastUpdatedAt, isLoading, syncError, dataSource } = useFinancial()
  const updatedLabel = formatLastUpdated(lastUpdatedAt)

  return (
    <>
      <Header />
      <main className="min-h-svh bg-navy pt-[4.5rem] md:pt-20">
        <div className="border-b border-white/10 bg-gradient-to-b from-navy-card/80 to-navy px-4 py-4 md:px-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            <Button
              variant="ghost"
              className="text-stone-300 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="size-4" />
                {site.ui.backToHome}
              </Link>
            </Button>
            <p className="text-xs text-stone-500">
              {d.lastUpdated}: {updatedLabel}
            </p>
          </div>
        </div>

        {syncError ? (
          <div className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
            <p className="rounded-lg border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              Could not load live data: {syncError}
            </p>
          </div>
        ) : null}

        <section className="border-b border-white/10 px-4 py-10 md:px-6 md:py-12">
          <div className="mx-auto max-w-7xl">
            {dataSource === 'supabase' && isLoading ? (
              <p className="mb-8 text-center text-sm text-stone-400">Loading live collections…</p>
            ) : null}
            <div className="mb-10 flex flex-col items-center text-center lg:mb-12">
              <BrandLogo className="mb-5 h-20 w-auto max-w-[200px] md:h-24" />
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-parish-blue">
                {site.ui.headerChurchLine}
              </p>
              <p className="font-ml mt-2 text-lg text-stone-300 md:text-xl">{d.festivalTitleMl}</p>
              <h1 className="mt-2 font-serif text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
                {d.pageTitle} · {d.year}
              </h1>
              <p className="mt-2 text-stone-400">{d.festivalTitle}</p>
            </div>

            <FinancialDashboardCard />
            <div className="mt-6">
              <DashboardKpiStrip />
            </div>
          </div>
        </section>

        <section className="px-4 py-10 md:px-6 md:py-14">
          <div className="mx-auto max-w-7xl space-y-10">
            <div className="grid gap-6 lg:grid-cols-2">
              <UnitShareChart />
              <UnitBarChart />
            </div>
            <UnitMetricsGrid />
          </div>
        </section>

        <section className="bg-stone-texture px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-7xl">
            <RecentContributionsTable />
            <p className="mt-6 text-center text-xs font-medium text-stone-600">
              {d.lastUpdated}: {updatedLabel}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
