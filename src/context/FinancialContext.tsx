import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { defaultFinancialRecords } from '@/data/defaultFinancialRecords'
import type { RecentContribution, StoredFinancialRecords, UnitId } from '@/data/financialTypes'
import {
  computeFinancial,
  sortContributionsNewestFirst,
  touchLastUpdated,
  type ComputedFinancial,
} from '@/lib/financial/computeFinancial'
import { unitNameFor } from '@/lib/financial/unitMeta'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client'
import {
  deleteContribution as deleteContributionRemote,
  fetchFinancialRecords,
  insertContribution,
  updateContribution as updateContributionRemote,
  updateTargetInr,
} from '@/lib/supabase/financialRepository'

const STORAGE_KEY = 'themalikkara-financial-v1'

type FinancialContextValue = ComputedFinancial & {
  isLoading: boolean
  syncError: string | null
  dataSource: 'supabase' | 'local'
  setTargetInr: (targetInr: number) => Promise<void>
  addContribution: (input: {
    contributorName: string
    amountInr: number
    unitId: UnitId
    contributedOn: string
  }) => Promise<void>
  removeContribution: (id: string) => Promise<void>
  updateContribution: (
    id: string,
    input: {
      contributorName: string
      amountInr: number
      unitId: UnitId
      contributedOn: string
    },
  ) => Promise<void>
  refresh: () => Promise<void>
}

const FinancialContext = createContext<FinancialContextValue | null>(null)

function loadLocal(): StoredFinancialRecords {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultFinancialRecords
    const parsed = JSON.parse(raw) as StoredFinancialRecords
    if (
      typeof parsed.targetInr !== 'number' ||
      !Array.isArray(parsed.recentContributions)
    ) {
      return defaultFinancialRecords
    }
    return {
      targetInr: parsed.targetInr,
      lastUpdatedAt: parsed.lastUpdatedAt ?? defaultFinancialRecords.lastUpdatedAt,
      recentContributions: parsed.recentContributions,
    }
  } catch {
    return defaultFinancialRecords
  }
}

function persistLocal(records: StoredFinancialRecords) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function FinancialProvider({ children }: { children: ReactNode }) {
  const useRemote = isSupabaseConfigured()
  const [stored, setStored] = useState<StoredFinancialRecords>(
    useRemote ? defaultFinancialRecords : loadLocal,
  )
  const [isLoading, setIsLoading] = useState(useRemote)
  const [syncError, setSyncError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!useRemote) return
    setIsLoading(true)
    setSyncError(null)
    try {
      const remote = await fetchFinancialRecords()
      if (remote) setStored(remote)
    } catch (err) {
      setSyncError(err instanceof Error ? err.message : 'Failed to load from Supabase')
    } finally {
      setIsLoading(false)
    }
  }, [useRemote])

  useEffect(() => {
    void refresh()
  }, [refresh])

  useEffect(() => {
    if (!useRemote) return
    const supabase = getSupabaseClient()
    if (!supabase) return

    const channel = supabase
      .channel('themalikkara-finance')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contributions' },
        () => void refresh(),
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'festival_settings' },
        () => void refresh(),
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [refresh, useRemote])

  const commitLocal = useCallback((next: StoredFinancialRecords) => {
    const withTime = { ...next, lastUpdatedAt: touchLastUpdated() }
    persistLocal(withTime)
    setStored(withTime)
  }, [])

  const computed = useMemo(() => computeFinancial(stored), [stored])

  const setTargetInr = useCallback(
    async (targetInr: number) => {
      if (!Number.isFinite(targetInr) || targetInr <= 0) return
      const rounded = Math.round(targetInr)
      if (useRemote) {
        await updateTargetInr(rounded)
        await refresh()
        return
      }
      commitLocal({ ...stored, targetInr: rounded })
    },
    [commitLocal, refresh, stored, useRemote],
  )

  const addContribution = useCallback(
    async (input: {
      contributorName: string
      amountInr: number
      unitId: UnitId
      contributedOn: string
    }) => {
      const name = input.contributorName.trim()
      if (!name || !Number.isFinite(input.amountInr) || input.amountInr <= 0) return

      if (useRemote) {
        await insertContribution({
          contributorName: name,
          amountInr: Math.round(input.amountInr),
          unitId: input.unitId,
          contributedOn: input.contributedOn,
        })
        await refresh()
        return
      }

      const entry: RecentContribution = {
        id: crypto.randomUUID(),
        contributorName: name,
        amountInr: Math.round(input.amountInr),
        unitId: input.unitId,
        unitName: unitNameFor(input.unitId),
        contributedOn: input.contributedOn,
      }

      commitLocal({
        ...stored,
        recentContributions: sortContributionsNewestFirst([
          entry,
          ...stored.recentContributions,
        ]),
      })
    },
    [commitLocal, refresh, stored, useRemote],
  )

  const removeContribution = useCallback(
    async (id: string) => {
      if (useRemote) {
        await deleteContributionRemote(id)
        await refresh()
        return
      }
      commitLocal({
        ...stored,
        recentContributions: stored.recentContributions.filter((c) => c.id !== id),
      })
    },
    [commitLocal, refresh, stored, useRemote],
  )

  const updateContribution = useCallback(
    async (
      id: string,
      input: {
        contributorName: string
        amountInr: number
        unitId: UnitId
        contributedOn: string
      },
    ) => {
      const name = input.contributorName.trim()
      if (!name || !Number.isFinite(input.amountInr) || input.amountInr <= 0) return

      const patch: RecentContribution = {
        id,
        contributorName: name,
        amountInr: Math.round(input.amountInr),
        unitId: input.unitId,
        unitName: unitNameFor(input.unitId),
        contributedOn: input.contributedOn,
      }

      if (useRemote) {
        await updateContributionRemote(id, {
          contributorName: patch.contributorName,
          amountInr: patch.amountInr,
          unitId: patch.unitId,
          contributedOn: patch.contributedOn,
        })
        await refresh()
        return
      }

      commitLocal({
        ...stored,
        recentContributions: sortContributionsNewestFirst(
          stored.recentContributions.map((c) => (c.id === id ? patch : c)),
        ),
      })
    },
    [commitLocal, refresh, stored, useRemote],
  )

  const value = useMemo(
    () => ({
      ...computed,
      isLoading,
      syncError,
      dataSource: useRemote ? ('supabase' as const) : ('local' as const),
      setTargetInr,
      addContribution,
      removeContribution,
      updateContribution,
      refresh,
    }),
    [
      computed,
      isLoading,
      syncError,
      useRemote,
      setTargetInr,
      addContribution,
      removeContribution,
      updateContribution,
      refresh,
    ],
  )

  return <FinancialContext.Provider value={value}>{children}</FinancialContext.Provider>
}

export function useFinancial() {
  const ctx = useContext(FinancialContext)
  if (!ctx) throw new Error('useFinancial must be used within FinancialProvider')
  return ctx
}
