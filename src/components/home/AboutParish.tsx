import { motion } from 'framer-motion'
import { Church, ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { site } from '@/data/siteContent'
import { SectionHeading } from '@/components/home/SectionHeading'

export function AboutParish() {
  return (
    <section id="parish" className="bg-stone-texture py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              eyebrow={site.sections.parishEyebrow}
              title={site.parish.name}
              description={site.parish.intro}
            />
            <p className="mt-4 text-sm text-stone-600">{site.parish.archdiocese}</p>
            <Button variant="outline" className="mt-6" asChild>
              <a href={site.parish.parentSiteUrl} target="_blank" rel="noreferrer">
                {site.parish.parentSiteLabel}
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-parish-blue to-gold opacity-20 blur-sm" />
            <Card className="relative overflow-hidden border-0 shadow-xl">
              <div className="flex items-center gap-3 bg-parish-blue px-6 py-4 text-white">
                <Church className="size-6 shrink-0 text-gold-light" />
                <span className="font-serif text-lg leading-snug md:text-xl">
                  {site.ui.ourChurchHistory}
                </span>
              </div>
              <CardContent className="max-h-[min(28rem,60vh)] overflow-y-auto p-0">
                {site.parish.history.map((row, i) => (
                  <div
                    key={row.year}
                    className={`grid gap-3 border-b border-stone-100 px-4 py-3 text-sm last:border-b-0 sm:grid-cols-[5.5rem_1fr] sm:px-6 sm:py-4 ${
                      i % 2 === 0 ? 'bg-white' : 'bg-stone-50/80'
                    }`}
                  >
                    <span className="shrink-0 font-semibold text-parish-blue">
                      {row.year}
                    </span>
                    <span className="leading-relaxed text-stone-700">{row.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
