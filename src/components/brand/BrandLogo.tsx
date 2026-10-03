import { site } from '@/data/siteContent'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <img
      src={site.brand.logo}
      alt={site.brand.logoAlt}
      className={cn('h-auto w-auto max-w-full object-contain', className)}
      decoding="async"
    />
  )
}
