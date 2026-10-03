import { ExternalLink } from 'lucide-react'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { site } from '@/data/siteContent'

const socialLinkClass =
  'flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-gold/40 hover:text-gold'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <BrandLogo className="mb-4 h-24 w-auto max-w-[220px]" />
          <p className="font-serif text-xl text-white">{site.themalikkara.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-stone-400">{site.ui.footerBlurb}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            {site.ui.parishLinks}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={site.parish.parentSiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-white"
              >
                {site.parish.parentSiteLabel}
                <ExternalLink className="size-3.5" />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            {site.ui.connect}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={site.ui.instagramLabel}
              title={site.social.instagramHandle}
              className={socialLinkClass}
            >
              <InstagramIcon />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-400 hover:text-white"
            >
              {site.social.instagramHandle}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {site.themalikkara.title} · {site.parish.name}
      </div>
    </footer>
  )
}
