import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
// eslint-disable-next-line camelcase
import { Nunito_Sans } from 'next/font/google'
import { ChallengeProvider } from '@/context/challenge-context'
import '@/styles/globals.css'

const NunitoSans = Nunito_Sans({
  weight: ['200', '400', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Study Rats',
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
          <body className={NunitoSans.className}>{children}</body>
        </html>
      </ChallengeProvider>
    </ClerkProvider>
  )
}
