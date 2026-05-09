import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NetworkCanvas } from '@/components/ui/NetworkCanvas'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dodge | Automation Specialist',
  description:
    'AI-powered automation systems using n8n, Make.com, Zapier, GoHighLevel, and OpenAI. Eliminating manual work and connecting business stacks.',
  openGraph: {
    title: 'Dodge | Automation Specialist',
    description: 'I design and deploy AI-powered automation systems that eliminate manual work.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NetworkCanvas />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
