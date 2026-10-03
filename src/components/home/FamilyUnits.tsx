import { motion } from 'framer-motion'

import { Card, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/home/SectionHeading'
import { site } from '@/data/siteContent'

export function FamilyUnits() {
  const { familyUnits: fu } = site

  return (
    <section id="units" className="bg-stone-texture py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow={site.sections.unitsEyebrow}
          title={fu.sectionTitle}
          description={fu.sectionDesc}
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fu.units.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="h-full"
            >
              <Card className="h-full min-h-[220px] overflow-hidden border-0 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <div
                  className={`flex h-full min-h-[220px] flex-col justify-center bg-gradient-to-br ${unit.accent} px-6 py-10 text-white md:py-12`}
                >
                  <p className="font-ml text-sm text-white/80">{unit.nameMl}</p>
                  <CardTitle className="mt-2 text-xl text-white md:text-2xl">
                    {unit.name}
                  </CardTitle>
                  <p className="mt-3 text-xs uppercase tracking-wider text-white/75">
                    {site.ui.patronLabel} · {unit.patron}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
