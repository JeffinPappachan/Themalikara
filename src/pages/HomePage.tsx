import { AboutParish } from '@/components/home/AboutParish'
import { AboutThemalikkara } from '@/components/home/AboutThemalikkara'
import { Charity } from '@/components/home/Charity'
import { ContactSection } from '@/components/home/ContactSection'
import { FamilyUnits } from '@/components/home/FamilyUnits'
import { Festivals } from '@/components/home/Festivals'
import { Hero } from '@/components/home/Hero'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutParish />
        <AboutThemalikkara />
        <FamilyUnits />
        <Festivals />
        <Charity />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
