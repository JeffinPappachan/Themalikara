import type { RecentContribution, StoredFinancialRecords, UnitId } from '@/data/financialTypes'
import { sortContributionsNewestFirst, touchLastUpdated } from '@/lib/financial/computeFinancial'
import { unitNameFor } from '@/lib/financial/unitMeta'
import { getSupabaseClient } from '@/lib/supabase/client'

type ContributionRow = {
  id: string
  contributor_name: string
  amount_inr: number
  unit_id: UnitId
  contributed_on: string
  created_at: string
}

type SettingsRow = {
  target_inr: number
  updated_at: string
}

function mapRow(row: ContributionRow): RecentContribution {
  return {
    id: row.id,
    contributorName: row.contributor_name,
    amountInr: row.amount_inr,
    unitId: row.unit_id,
    unitName: unitNameFor(row.unit_id),
    contributedOn: row.contributed_on,
  }
}

export async function fetchFinancialRecords(): Promise<StoredFinancialRecords | null> {
  const supabase = getSupabaseClient()
  if (!supabase) return null

  const [settingsRes, contributionsRes] = await Promise.all([
    supabase.from('festival_settings').select('target_inr, updated_at').eq('id', 1).maybeSingle(),
    supabase
      .from('contributions')
      .select('id, contributor_name, amount_inr, unit_id, contributed_on, created_at')
      .order('contributed_on', { ascending: false })
      .order('created_at', { ascending: false }),
  ])

  if (settingsRes.error) throw settingsRes.error
  if (contributionsRes.error) throw contributionsRes.error

  const settings = settingsRes.data as SettingsRow | null
  const rows = (contributionsRes.data ?? []) as ContributionRow[]

  return {
    targetInr: settings?.target_inr ?? 600_000,
    lastUpdatedAt: settings?.updated_at ?? touchLastUpdated(),
    recentContributions: sortContributionsNewestFirst(rows.map(mapRow)),
  }
}

export async function updateTargetInr(targetInr: number): Promise<void> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase is not configured')

  const { error } = await supabase
    .from('festival_settings')
    .update({ target_inr: targetInr, updated_at: new Date().toISOString() })
    .eq('id', 1)

  if (error) throw error
}

export async function insertContribution(input: {
  contributorName: string
  amountInr: number
  unitId: UnitId
  contributedOn: string
}): Promise<void> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase is not configured')

  const { error: insertError } = await supabase.from('contributions').insert({
    contributor_name: input.contributorName,
    amount_inr: input.amountInr,
    unit_id: input.unitId,
    contributed_on: input.contributedOn,
  })

  if (insertError) throw insertError

  const { error: settingsError } = await supabase
    .from('festival_settings')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', 1)

  if (settingsError) throw settingsError
}

export async function updateContribution(
  id: string,
  input: {
    contributorName: string
    amountInr: number
    unitId: UnitId
    contributedOn: string
  },
): Promise<void> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase is not configured')

  const { error: updateError } = await supabase
    .from('contributions')
    .update({
      contributor_name: input.contributorName,
      amount_inr: input.amountInr,
      unit_id: input.unitId,
      contributed_on: input.contributedOn,
    })
    .eq('id', id)

  if (updateError) throw updateError

  const { error: settingsError } = await supabase
    .from('festival_settings')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', 1)

  if (settingsError) throw settingsError
}

export async function deleteContribution(id: string): Promise<void> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase is not configured')

  const { error: deleteError } = await supabase.from('contributions').delete().eq('id', id)
  if (deleteError) throw deleteError

  const { error: settingsError } = await supabase
    .from('festival_settings')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', 1)

  if (settingsError) throw settingsError
}
