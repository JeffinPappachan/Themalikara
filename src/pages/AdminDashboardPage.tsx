import { LogOut, Plus } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { ContributionTableRow } from '@/components/admin/ContributionTableRow'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import { useFinancial } from '@/context/FinancialContext'
import type { UnitId } from '@/data/financialTypes'
import { site } from '@/data/siteContent'
import { formatLastUpdated } from '@/lib/formatLastUpdated'
import { formatInr } from '@/lib/formatInr'
import { UNIT_META } from '@/lib/financial/unitMeta'

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

export function AdminDashboardPage() {
  const { logout } = useAuth()
  const financial = useFinancial()
  const [targetInput, setTargetInput] = useState(String(financial.targetInr))
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [unitId, setUnitId] = useState<UnitId>('st-stephen')
  const [contributedOn, setContributedOn] = useState(todayIsoDate())
  const [formError, setFormError] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)

  async function handleTargetSave(e: FormEvent) {
    e.preventDefault()
    setActionError(null)
    const value = Number(targetInput.replace(/,/g, ''))
    if (!Number.isFinite(value) || value <= 0) return
    try {
      await financial.setTargetInr(value)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not save target.')
    }
  }

  async function handleAddContribution(e: FormEvent) {
    e.preventDefault()
    setFormError('')
    setActionError(null)
    const amountInr = Number(amount.replace(/,/g, ''))
    if (!name.trim()) {
      setFormError('Enter contributor name.')
      return
    }
    if (!Number.isFinite(amountInr) || amountInr <= 0) {
      setFormError('Enter a valid amount.')
      return
    }
    try {
      await financial.addContribution({
        contributorName: name.trim(),
        amountInr,
        unitId,
        contributedOn,
      })
      setName('')
      setAmount('')
      setContributedOn(todayIsoDate())
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not add record.')
    }
  }

  return (
    <div className="min-h-svh bg-stone-texture">
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-12 w-auto" />
            <div>
              <p className="font-serif text-lg font-semibold text-navy">Collection admin</p>
              <p className="text-xs text-stone-500">{site.themalikkara.title}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={site.routes.financial}>View public dashboard</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => void logout()}>
              <LogOut className="size-4" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {financial.syncError || actionError ? (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {actionError ?? financial.syncError}
          </p>
        ) : null}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-stone-500">Collected</p>
            <p className="font-serif text-2xl font-semibold text-parish-blue-dark">
              {formatInr(financial.collectedInr)}
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-stone-500">Target</p>
            <p className="font-serif text-2xl font-semibold text-parish-blue-dark">
              {formatInr(financial.targetInr)}
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-stone-500">Last updated</p>
            <p className="text-sm font-medium text-navy">
              {formatLastUpdated(financial.lastUpdatedAt)}
            </p>
          </div>
        </div>

        <section className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-navy">Festival target</h2>
          <form onSubmit={handleTargetSave} className="mt-4 flex flex-wrap items-end gap-3">
            <div className="min-w-[200px] flex-1 space-y-2">
              <Label htmlFor="target">Total target (₹)</Label>
              <Input
                id="target"
                inputMode="numeric"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
              />
            </div>
            <Button type="submit">Save target</Button>
          </form>
        </section>

        <section className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-navy">
            <Plus className="size-5" />
            Add contribution
          </h2>
          <form onSubmit={handleAddContribution} className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contributor">Contributor name</Label>
              <Input
                id="contributor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Family or person name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="5000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <select
                id="unit"
                value={unitId}
                onChange={(e) => setUnitId(e.target.value as UnitId)}
                className="flex h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-navy focus-visible:border-parish-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parish-blue/20"
              >
                {UNIT_META.map((u) => (
                  <option key={u.unitId} value={u.unitId}>
                    {u.unitName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={contributedOn}
                onChange={(e) => setContributedOn(e.target.value)}
              />
            </div>
            <div className="flex items-end sm:col-span-2">
              <Button type="submit" variant="gold">
                Add record
              </Button>
            </div>
          </form>
          {formError ? (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {formError}
            </p>
          ) : null}
        </section>

        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-100 px-6 py-4">
            <h2 className="font-serif text-xl font-semibold text-navy">All records</h2>
            <p className="text-sm text-stone-500">
              {financial.recentContributions.length} contribution
              {financial.recentContributions.length === 1 ? '' : 's'}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Unit</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold" aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {financial.recentContributions.map((row) => (
                  <ContributionTableRow
                    key={row.id}
                    row={row}
                    onUpdate={financial.updateContribution}
                    onDelete={financial.removeContribution}
                    onError={setActionError}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
