import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { site } from '@/data/siteContent'

export function Hero() {
  const [slide, setSlide] = useState(0)
  const images = site.hero.images

  useEffect(() => {
    const id = window.setInterval(
      () => setSlide((s) => (s + 1) % images.length),
      6000,
    )
    return () => window.clearInterval(id)
  }, [images.length])

  return (
    <section
      id="home"
      className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-navy"
    >
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === slide ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
          <div className="absolute inset-0 bg-parish-blue/20 mix-blend-multiply" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-4 border-gold/50 bg-gold/10 text-gold-light">
            {site.parish.archdiocese}
          </Badge>
          <p className="font-ml text-lg text-gold-light md:text-xl">
            {site.hero.headlineMl}
          </p>
          <h1 className="mt-2 max-w-3xl font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
            {site.hero.headline}
          </h1>
          <p className="mt-4 max-w-xl text-base text-stone-300 md:text-lg">
            {site.hero.subhead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="gold" size="lg" asChild>
              <a href="#themalikkara">{site.ui.discoverThemalikkara}</a>
            </Button>
          </div>
        </motion.div>

        <div className="mt-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${site.ui.slide} ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? 'w-10 bg-gold' : 'w-4 bg-white/30'
              }`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>

      <a
        href="#parish"
        className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-1 text-xs text-stone-400 transition hover:text-gold"
      >
        {site.ui.scroll}
        <ChevronDown className="size-5 animate-bounce" />
      </a>
    </section>
  )
}
