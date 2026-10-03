import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { SectionHeading } from '@/components/home/SectionHeading'
import { site } from '@/data/siteContent'

export function AboutThemalikkara() {
  return (
    <section id="themalikkara" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 flex justify-center">
          <BrandLogo className="h-36 w-auto max-w-xs md:h-44 md:max-w-sm" />
        </div>
        <SectionHeading
          eyebrow={site.sections.themalikkaraEyebrow}
          title={site.sections.themalikkaraTitle}
          description={site.themalikkara.description}
          align="center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {site.themalikkara.karas.map((kara, i) => (
            <motion.div
              key={kara}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border p-6 text-center transition ${
                i === 0
                  ? 'border-gold/50 bg-gradient-to-br from-navy to-parish-blue-dark text-white shadow-lg shadow-navy/20'
                  : 'border-stone-200 bg-stone-50 text-stone-600'
              }`}
            >
              <MapPin
                className={`mx-auto size-6 ${i === 0 ? 'text-gold-light' : 'text-stone-400'}`}
              />
              <p className="mt-3 text-lg font-semibold">{kara}</p>
              {i === 0 && (
                <p className="mt-2 text-xs text-gold-light/90">{site.ui.thisWebsite}</p>
              )}
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-stone-500">
          {site.themalikkara.karaPlaceholderNote}
        </p>
      </div>
    </section>
  )
}
