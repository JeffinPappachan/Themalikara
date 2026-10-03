import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'

import { SectionHeading } from '@/components/home/SectionHeading'
import { site } from '@/data/siteContent'

export function Charity() {
  const { charity: c } = site

  return (
    <section id="charity" className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full bg-parish-blue/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow={site.sections.charityEyebrow}
          title={c.sectionTitle}
          description={c.sectionDesc}
          align="center"
          light
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {c.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <HeartHandshake className="size-8 text-gold-light" />
              <h3 className="mt-4 font-serif text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
