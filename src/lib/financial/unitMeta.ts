import type { UnitId } from '@/data/financialDashboardData'

export type UnitMeta = {
  unitId: UnitId
  unitName: string
  chartColor: string
}

export const UNIT_META: UnitMeta[] = [
  {
    unitId: 'st-stephen',
    unitName: "St. Stephen's Unit",
    chartColor: '#8b5cf6',
  },
  {
    unitId: 'st-john',
    unitName: "St. John's Unit",
    chartColor: '#38bdf8',
  },
  {
    unitId: 'st-sebastian',
    unitName: "St. Sebastian's Unit",
    chartColor: '#fb7185',
  },
  {
    unitId: 'st-thomas',
    unitName: "St. Thomas's Unit",
    chartColor: '#34d399',
  },
]

export function unitNameFor(id: UnitId) {
  return UNIT_META.find((u) => u.unitId === id)?.unitName ?? id
}
