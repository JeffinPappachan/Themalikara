import type {
  FinancialSummary,
  RecentContribution,
  StoredFinancialRecords,
  UnitFinance,
} from '@/data/financialTypes'
import { UNIT_META } from '@/lib/financial/unitMeta'

export type ComputedFinancial = StoredFinancialRecords & {
  collectedInr: number
  unitBreakdown: UnitFinance[]
  summary: FinancialSummary
}

export function computeFinancial(records: StoredFinancialRecords): ComputedFinancial {
  const contributions = records.recentContributions
  const collectedInr = contributions.reduce((sum, c) => sum + c.amountInr, 0)

  const unitBreakdown: UnitFinance[] = UNIT_META.map((meta) => {
    const forUnit = contributions.filter((c) => c.unitId === meta.unitId)
    return {
      unitId: meta.unitId,
      unitName: meta.unitName,
      chartColor: meta.chartColor,
      collectedInr: forUnit.reduce((s, c) => s + c.amountInr, 0),
      contributors: forUnit.length,
    }
  })

  const amounts = contributions.map((c) => c.amountInr)
  const summary: FinancialSummary = {
    totalContributors: contributions.length,
    averageContributionInr:
      contributions.length > 0 ? Math.round(collectedInr / contributions.length) : 0,
    largestSingleInr: amounts.length > 0 ? Math.max(...amounts) : 0,
  }

  return {
    ...records,
    collectedInr,
    unitBreakdown,
    summary,
  }
}

export function touchLastUpdated(): string {
  return new Date().toISOString()
}

export function sortContributionsNewestFirst(items: RecentContribution[]) {
  return [...items].sort((a, b) => b.contributedOn.localeCompare(a.contributedOn))
}
