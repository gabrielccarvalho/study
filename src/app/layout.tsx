import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'

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
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
