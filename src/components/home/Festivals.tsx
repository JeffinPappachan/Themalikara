import { motion } from 'framer-motion'
import { CalendarDays, ChevronRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/home/SectionHeading'
import { site } from '@/data/siteContent'

export function Festivals() {
  const { festivals: f } = site

  return (
    <section id="festivals" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow={site.sections.festivalsEyebrow}
          title={f.sectionTitle}
          description={f.sectionDesc}
          align="center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {f.items.map((fest, i) => {
            const isFinancial =
              'financialLink' in fest && fest.financialLink === true

            const inner = (
              <>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={fest.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <p className="font-ml text-sm text-gold-light">{fest.titleMl}</p>
                      <h3 className="font-serif text-2xl text-white">{fest.title}</h3>
                    </div>
                    <Badge variant="blue" className="bg-white/10 text-white backdrop-blur">
                      <CalendarDays className="size-3.5" />
                      {fest.season}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3 p-6 md:p-8">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-parish-blue">
                    <Sparkles className="size-4 text-gold" />
                    {fest.highlight}
                  </p>
                  <p className="leading-relaxed text-stone-600">{fest.description}</p>
                  {isFinancial && (
                    <p className="inline-flex items-center gap-1 text-sm font-medium text-parish-blue group-hover:underline">
                      {site.financialDashboard.viewDashboardHint}
                      <ChevronRight className="size-4 transition group-hover:translate-x-0.5" />
                    </p>
                  )}
                </div>
              </>
            )

            return (
              <motion.div
                key={fest.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {isFinancial ? (
                  <Link
                    to={site.routes.financial}
                    className="group block overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 shadow-sm transition hover:border-parish-blue/40 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parish-blue"
                  >
                    {inner}
                  </Link>
                ) : (
                  <article className="group overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 shadow-sm">
                    {inner}
                  </article>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
