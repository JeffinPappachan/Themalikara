import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  title: string
  titleMl?: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  titleMl,
  description,
  align = 'left',
  light = false,
}: Props) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.25em]',
            light ? 'text-gold-light' : 'text-parish-blue',
          )}
        >
          {eyebrow}
        </p>
      )}
      {titleMl && (
        <p
          className={cn(
            'font-ml mt-2 text-lg',
            light ? 'text-gold/90' : 'text-gold-dark',
          )}
        >
          {titleMl}
        </p>
      )}
      <h2
        className={cn(
          'mt-1 font-serif text-3xl font-semibold md:text-4xl',
          light ? 'text-white' : 'text-navy',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-3 text-base leading-relaxed',
            light ? 'text-stone-300' : 'text-stone-600',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
