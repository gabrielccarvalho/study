import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
// eslint-disable-next-line camelcase
import { Nunito_Sans } from 'next/font/google'
import { ChallengeProvider } from '@/context/challenge-context'
import '@/styles/globals.css'
import { AddButton } from '@/components/add-button'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

const NunitoSans = Nunito_Sans({
  weight: ['200', '400', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'study',
  description: 'Study with your friends!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ChallengeProvider>
        <html lang="en">
          <body className={NunitoSans.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <AddButton />
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </ChallengeProvider>
    </ClerkProvider>
  )
}
