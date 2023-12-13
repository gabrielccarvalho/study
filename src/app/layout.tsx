import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import { ChallengeProvider } from '@/context/challenge-context'

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
          <body className={GeistSans.className}>{children}</body>
        </html>
      </ChallengeProvider>
    </ClerkProvider>
  )
}
