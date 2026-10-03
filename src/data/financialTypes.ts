export type UnitId = 'st-stephen' | 'st-john' | 'st-sebastian' | 'st-thomas'

export type UnitFinance = {
  unitId: UnitId
  unitName: string
  collectedInr: number
  contributors: number
  chartColor: string
}

export type RecentContribution = {
  id: string
  contributorName: string
  amountInr: number
  unitId: UnitId
  unitName: string
  contributedOn: string
}

export type FinancialSummary = {
  totalContributors: number
  averageContributionInr: number
  largestSingleInr: number
}

/** Persisted shape (localStorage / future API) */
export type StoredFinancialRecords = {
  targetInr: number
  lastUpdatedAt: string
  recentContributions: RecentContribution[]
}
