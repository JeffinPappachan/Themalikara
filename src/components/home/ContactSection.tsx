import { motion } from 'framer-motion'
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'

import { site } from '@/data/siteContent'
import { SectionHeading } from '@/components/home/SectionHeading'

export function ContactSection() {
  const c = site.contact

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow={site.sections.contactEyebrow}
          title={c.sectionTitle}
          description={c.sectionDesc}
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 overflow-hidden rounded-3xl shadow-xl"
        >
          <div className="grid lg:grid-cols-5">
            <div className="bg-parish-blue p-8 text-white lg:col-span-2 lg:p-10">
              <h3 className="font-serif text-2xl tracking-wide">{site.ui.contactHeading}</h3>
              <ul className="mt-8 space-y-5 text-sm leading-relaxed">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-gold-light" />
                  <a
                    href={c.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {c.address}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="size-5 shrink-0 text-gold-light" />
                  <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="hover:underline">
                    {c.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="size-5 shrink-0 text-gold-light" />
                  <a href={`mailto:${c.email}`} className="hover:underline">
                    {c.email}
                  </a>
                </li>
              </ul>

              <div className="mt-10 flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                <img
                  src={c.vicarImage}
                  alt=""
                  className="size-20 rounded-xl object-cover ring-2 ring-gold/40"
                />
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold-light">
                    {site.ui.vicar}
                  </p>
                  <p className="font-serif text-lg">{c.vicar}</p>
                  <a href={`tel:${c.vicarPhone}`} className="text-sm text-white/80 hover:underline">
                    {c.vicarPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="relative min-h-[320px] bg-stone-200 lg:col-span-3">
              <iframe
                title={site.parish.name}
                src={c.mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href={c.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-medium text-navy shadow-md transition hover:bg-white"
              >
                {site.ui.openMaps}
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
