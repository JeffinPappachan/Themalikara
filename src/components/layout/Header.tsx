import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { Button } from '@/components/ui/button'
import { site } from '@/data/siteContent'
import { cn } from '@/lib/utils'

function navHref(hash: string) {
  return `/${hash}`
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const onFinancialPage = location.pathname === site.routes.financial

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solidHeader = onFinancialPage || scrolled

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solidHeader
          ? 'border-b border-white/10 bg-navy/90 shadow-lg backdrop-blur-md'
          : 'bg-gradient-to-b from-navy/80 to-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
          aria-label={site.ui.homeAria}
        >
          <BrandLogo className="h-14 max-h-14 w-auto shrink-0 md:h-16 md:max-h-16" />
          <div className="hidden min-w-0 text-left sm:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-light">
              {site.ui.headerChurchLine}
            </p>
            <p className="font-ml truncate text-base font-semibold leading-tight text-white/95 md:text-lg">
              {site.themalikkara.titleMl}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={navHref(item.href)}
              className="rounded-lg px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <Button variant="gold" size="sm" className="ml-2" asChild>
            <Link to={site.routes.financial}>{site.ui.collection}</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-white lg:hidden"
          aria-label={open ? site.ui.menuClose : site.ui.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={navHref(item.href)}
                className="rounded-lg px-3 py-3 text-white/90 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button variant="gold" className="mt-2 w-full" asChild>
              <Link to={site.routes.financial} onClick={() => setOpen(false)}>
                {site.ui.collectionDashboard}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
