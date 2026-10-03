import * as React from 'react'

import { cn } from '@/lib/utils'

export function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-navy shadow-sm transition-colors placeholder:text-stone-400 focus-visible:border-parish-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parish-blue/20 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
