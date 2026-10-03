import { Check, Pencil, Trash2, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { RecentContribution, UnitId } from '@/data/financialTypes'
import { formatInr } from '@/lib/formatInr'
import { UNIT_META } from '@/lib/financial/unitMeta'

const selectClass =
  'flex h-9 w-full min-w-[140px] rounded-lg border border-stone-200 bg-white px-2 text-sm text-navy focus-visible:border-parish-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parish-blue/20'

type Props = {
  row: RecentContribution
  onUpdate: (
    id: string,
    input: {
      contributorName: string
      amountInr: number
      unitId: UnitId
      contributedOn: string
    },
  ) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onError: (message: string) => void
}

export function ContributionTableRow({ row, onUpdate, onDelete, onError }: Props) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(row.contributorName)
  const [amount, setAmount] = useState(String(row.amountInr))
  const [unitId, setUnitId] = useState<UnitId>(row.unitId)
  const [contributedOn, setContributedOn] = useState(row.contributedOn)
  const [saving, setSaving] = useState(false)

  function startEdit() {
    setName(row.contributorName)
    setAmount(String(row.amountInr))
    setUnitId(row.unitId)
    setContributedOn(row.contributedOn)
    setEditing(true)
  }

  function cancelEdit() {
    setEditing(false)
  }

  async function saveEdit() {
    const amountInr = Number(amount.replace(/,/g, ''))
    if (!name.trim()) {
      onError('Enter contributor name.')
      return
    }
    if (!Number.isFinite(amountInr) || amountInr <= 0) {
      onError('Enter a valid amount.')
      return
    }
    setSaving(true)
    try {
      await onUpdate(row.id, {
        contributorName: name.trim(),
        amountInr,
        unitId,
        contributedOn,
      })
      setEditing(false)
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Could not save changes.')
    } finally {
      setSaving(false)
    }
  }

  if (editing) {
    return (
      <tr className="border-b border-stone-100 bg-parish-blue/5">
        <td className="px-4 py-2 md:px-6">
          <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9" />
        </td>
        <td className="px-4 py-2 md:px-6">
          <Input
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-9"
          />
        </td>
        <td className="px-4 py-2 md:px-6">
          <select
            value={unitId}
            onChange={(e) => setUnitId(e.target.value as UnitId)}
            className={selectClass}
          >
            {UNIT_META.map((u) => (
              <option key={u.unitId} value={u.unitId}>
                {u.unitName}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-2 md:px-6">
          <Input
            type="date"
            value={contributedOn}
            onChange={(e) => setContributedOn(e.target.value)}
            className="h-9"
          />
        </td>
        <td className="px-4 py-2 text-right md:px-6">
          <div className="flex justify-end gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-emerald-700 hover:bg-emerald-50"
              disabled={saving}
              onClick={() => void saveEdit()}
              aria-label="Save changes"
            >
              <Check className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={cancelEdit}
              disabled={saving}
              aria-label="Cancel edit"
            >
              <X className="size-4" />
            </Button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className="border-b border-stone-50">
      <td className="px-6 py-3 font-medium text-navy">{row.contributorName}</td>
      <td className="px-6 py-3 font-serif text-parish-blue-dark">{formatInr(row.amountInr)}</td>
      <td className="px-6 py-3 text-stone-600">{row.unitName}</td>
      <td className="px-6 py-3 text-stone-500">{row.contributedOn}</td>
      <td className="px-6 py-3 text-right">
        <div className="flex justify-end gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-parish-blue hover:bg-parish-blue/10"
            onClick={startEdit}
            aria-label={`Edit ${row.contributorName}`}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => {
              void onDelete(row.id).catch((err: unknown) => {
                onError(err instanceof Error ? err.message : 'Could not delete record.')
              })
            }}
            aria-label={`Remove ${row.contributorName}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </td>
    </tr>
  )
}
