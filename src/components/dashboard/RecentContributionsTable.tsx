import { useFinancial } from '@/context/FinancialContext'
import { site } from '@/data/siteContent'
import { formatInr } from '@/lib/formatInr'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function RecentContributionsTable() {
  const d = site.financialDashboard
  const { recentContributions, unitBreakdown } = useFinancial()
  const rows = recentContributions
  const unitColorById = Object.fromEntries(
    unitBreakdown.map((u) => [u.unitId, u.chartColor]),
  ) as Record<string, string>

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-lg">
      <div className="border-b border-stone-100 px-5 py-5 md:px-8 md:py-6">
        <h2 className="font-serif text-2xl font-semibold text-navy md:text-3xl">
          {d.recentContributionsTitle}
        </h2>
        <p className="mt-1 text-sm text-stone-600">{d.recentContributionsDesc}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/80 text-xs uppercase tracking-wider text-stone-500">
              <th className="px-5 py-3 font-semibold md:px-8">{d.tableName}</th>
              <th className="px-5 py-3 font-semibold md:px-8">{d.tableAmount}</th>
              <th className="px-5 py-3 font-semibold md:px-8">{d.tableUnit}</th>
              <th className="hidden px-5 py-3 font-semibold sm:table-cell md:px-8">
                {d.tableDate}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}
              >
                <td className="px-5 py-3.5 font-medium text-navy md:px-8">
                  {row.contributorName}
                </td>
                <td className="px-5 py-3.5 font-serif text-base font-semibold text-parish-blue-dark md:px-8">
                  {formatInr(row.amountInr)}
                </td>
                <td className="px-5 py-3.5 md:px-8">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${unitColorById[row.unitId]}18`,
                      color: unitColorById[row.unitId],
                    }}
                  >
                    {row.unitName.replace(" Unit", '')}
                  </span>
                </td>
                <td className="hidden px-5 py-3.5 text-stone-500 sm:table-cell md:px-8">
                  {formatDate(row.contributedOn)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
