import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Tools } from '@/components/sections/Tools'
import { Portfolio } from '@/components/sections/Portfolio'
import { Differentiators } from '@/components/sections/Differentiators'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark text-light overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Tools />
      <Portfolio />
      <Differentiators />
    </main>
  )
}
